import { doc, setDoc } from "firebase/firestore";
import {
    getEmailList,
    removeShareProfile,
    setShareProfile,
} from "./backgroundTasks/shareUsers";
import {
    setLinkedInProfile,
    deleteLinkedinProfile,
    getLinkedInProfile,
} from "./backgroundTasks/profiles";
import {
    getNotesProfileList,
    setNote,
    removeNote,
    newNote,
} from "./backgroundTasks/notes";
import db from "./firebase";

const OFFSCREEN_DOCUMENT_PATH = "./offscreen.html";

// A global promise to avoid concurrency issues
let creating;

// Chrome only allows for a single offscreenDocument. This is a helper function
// that returns a boolean indicating if a document is already active.
async function hasDocument() {
    // Check all windows controlled by the service worker to see if one
    // of them is the offscreen document with the given path
    const matchedClients = await clients.matchAll();
    return matchedClients.some(
        (c) => c.url === chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH),
    );
}

async function setupOffscreenDocument(path) {
    // If we do not have a document, we are already setup and can skip
    if (!(await hasDocument())) {
        // create offscreen document
        if (creating) {
            await creating;
        } else {
            creating = chrome.offscreen.createDocument({
                url: path,
                reasons: [chrome.offscreen.Reason.DOM_SCRAPING],
                justification: "authentication",
            });
            await creating;
            creating = null;
        }
    }
}

async function closeOffscreenDocument() {
    if (!(await hasDocument())) {
        return;
    }
    await chrome.offscreen.closeDocument();
}

function getAuth() {
    return new Promise(async (resolve, reject) => {
        const auth = await chrome.runtime.sendMessage({
            type: "firebase-auth",
            target: "offscreen",
        });
        auth?.name !== "FirebaseError" ? resolve(auth) : reject(auth);
    });
}

async function firebaseAuth() {
    await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);

    return await getAuth()
        .then((auth) => {
            console.log("User Authenticated", auth);
            return auth;
        })
        .catch((err) => {
            if (err.code === "auth/operation-not-allowed") {
                console.error(
                    "You must enable an OAuth provider in the Firebase" +
                        " console in order to use signInWithPopup. This sample" +
                        " uses Google by default.",
                );
            } else {
                console.error(err);
                return err;
            }
        })
        .finally(closeOffscreenDocument);
}

const handleSignIn = async (sendResponse) => {
    const response = await firebaseAuth();
    const user = response.user;
    await chrome.storage.local.set({ user });

    await setDoc(
        doc(db, "users", user.email),
        {
            email: user.email,
            photoURL: user.photoURL,
            accountsSharedWith: [], // users shouldn't be able to write to their own, only delete and read
            displayName: user.displayName,
        },
        { merge: true },
    );

    sendResponse({ user });
    // todo send a response to content worker to add the button(s) iff they are on a profile page
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.message) {
        case "signIn":
            handleSignIn(sendResponse); // this is required, we cannot inline or else we can't return data to sender due to async
            break;
        case "hasAddedLink":
            getLinkedInProfile(sendResponse);
            break;
        case "linkedinAdd":
            setLinkedInProfile(sendResponse);
            break;
        case "linkedinRemove":
            deleteLinkedinProfile(sendResponse);
            break;
        case "getEmailList":
            getEmailList(sendResponse);
            break;
        case "shareProfile":
            setShareProfile(request.email, sendResponse);
            break;
        case "removeShareProfile":
            removeShareProfile(request.email, sendResponse);
            break;
        case "getNoteList":
            getNotesProfileList(sendResponse);
            break;
        case "removeNote":
            removeNote(request.noteID, sendResponse);
            break;
        case "setNote":
            setNote(request.noteContent, sendResponse);
            break;
        case "newNote":
            newNote(request.noteText, sendResponse);
            break;
        case "getNotesList":

        default:
            // Handle unknown message type if necessary
            console.warn(`Unknown message type: ${request.message}`);
    }

    return true;
});

// extra checks to assure this event does not send a request twice
// prettier-ignore
chrome.webNavigation.onHistoryStateUpdated.addListener(
    async function (details) {
        if (details.frameId === 0) {
            chrome.tabs.get(details.tabId, async function(tab) {
                if (details.url.startsWith("https://www.linkedin.com/in/") && tab.url === details.url)
                    await chrome.tabs.sendMessage(tab.id, {}); // let content worker know that we're on the right page
            });
        }
    },
);
