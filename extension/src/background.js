import {initializeApp} from "firebase/app"
import {
  getFirestore, addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB_Q1OWjnniKrFvFnPcsgfQLkpiYe2lOPE",
  authDomain: "wai-finance.firebaseapp.com",
  projectId: "wai-finance",
  storageBucket: "wai-finance.appspot.com",
  messagingSenderId: "220165137666",
  appId: "1:220165137666:web:410e82afcf46152c194e1b",
  measurementId: "G-0M62Y2VN4G",
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const OFFSCREEN_DOCUMENT_PATH = '/offscreen.html';

// A global promise to avoid concurrency issues
let creating;

// Chrome only allows for a single offscreenDocument. This is a helper function
// that returns a boolean indicating if a document is already active.
async function hasDocument() {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  const matchedClients = await clients.matchAll();
  return matchedClients.some(
    (c) => c.url === chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)
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
        reasons: [
          chrome.offscreen.Reason.DOM_SCRAPING
        ],
        justification: 'authentication'
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
      type: 'firebase-auth',
      target: 'offscreen'
    });
    auth?.name !== 'FirebaseError' ? resolve(auth) : reject(auth);
  })
}

async function firebaseAuth() {
  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);

  const auth = await getAuth()
    .then((auth) => {
      console.log('User Authenticated', auth);
      return auth;
    })
    .catch(err => {
      if (err.code === 'auth/operation-not-allowed') {
        console.error('You must enable an OAuth provider in the Firebase' +
          ' console in order to use signInWithPopup. This sample' +
          ' uses Google by default.');
      } else {
        console.error(err);
        return err;
      }
    })
    .finally(closeOffscreenDocument)

  return auth;
}

const handleSignIn = async (sendResponse) => {
  const response = await firebaseAuth();
  const user = response.user;
  await chrome.storage.local.set({user});

  await setDoc(doc(db, "users", user.email), {
    email: user.email,
    profiles: []
  }, {merge: true})

  sendResponse({user})
  // todo send a response to content worker to add the button iff they are on a profile page

}

const hadAddedLink = async (url, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "User not signed in"})
      return
    }
    const profilesRef = collection(db, "profiles");
    const q = query(profilesRef, where("adderEmail", "==", data.user.email), where("link", "==", url))
    const querySnapshot = await getDocs(q);
    sendResponse({exists: !querySnapshot.empty});
  })
}

const addLinkedinProfile = async (url, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "You are not signed in. "})
      //todo allow for user to sign in if they aren't then add profile in one single click
      return
    }

    const newDoc = await addDoc(collection(db, "profiles"), {
      adderEmail: data.user.email,
      link: url
    })
    sendResponse({newDoc})
  })
}

const removeLinkedinProfile = async (url, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "You are not signed in. "})
      //todo allow for user to sign in if they aren't then add profile in one single click
      return
    }

    // we probably want some better way to do this...
    const q = query(collection(db, "profiles"), where("link", "==", url), where("adderEmail", "==", data.user.email));
    const querySnapshot = await getDocs(q);
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, "profiles", document.id));
    }
    sendResponse({success: true})


  })
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "signIn") {
    handleSignIn(sendResponse); // this is required, we cannot inline or else we can't return data to sender due to async
  }

  if (request.message === "hasAddedLink") {
    hadAddedLink(request.url, sendResponse);
  }

  if (request.message === "linkedinAdd") {
    addLinkedinProfile(request.url, sendResponse)
  }

  if (request.message === "linkedinRemove") {
    removeLinkedinProfile(request.url, sendResponse)
  }
  return true;
})

chrome.webNavigation.onHistoryStateUpdated.addListener(async function (details) {
  if (details.url.startsWith("https://www.linkedin.com/in/")) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, {}); // let content worker know that we're on the right page
  }
})