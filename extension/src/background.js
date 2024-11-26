import {initializeApp} from "firebase/app"
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
  arrayRemove
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

  return await getAuth()
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
    .finally(closeOffscreenDocument);
}


async function getProfile(email, url) {
  const profilesRef = collection(db, "profiles");
  const q = query(profilesRef, where("adderEmail", "==", email), where("link", "==", url))
  return await getDocs(q);
}

const handleSignIn = async (sendResponse) => {
  const response = await firebaseAuth();
  const user = response.user;
  await chrome.storage.local.set({user});

  await setDoc(doc(db, "users", user.email), {
    email: user.email,
    urlsReceivedShared: []
  }, {merge: true})

  sendResponse({user})
  // todo send a response to content worker to add the button(s) iff they are on a profile page

}

const hadAddedLink = async (url, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "User not signed in"})
      return
    }
    const querySnapshot = await getProfile(data.user.email, url);
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
      link: url,
      sharedWith: []
    });
    sendResponse({newDoc})
  });
}

const removeLinkedinProfile = async (url, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "You are not signed in. "})
      //todo allow for user to sign in if they aren't then add profile in one single click
      return
    }

    const querySnapshot = await getProfile(data.user.email, url);
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, "profiles", document.id));
    }
    sendResponse({success: true})
  })
}

// can we cache this information? doing this everytime for each linkedin page seems inefficient
// i have no experience with caching so i need to figure dat out
const getEmailList = async (sendResponse, url) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "You are not signed in. "})
      return
    }
    const querySnapshot = await getDocs(collection(db, "users"));
    const emailList = querySnapshot.docs.map((doc) => (doc.id));

    const queryProfiles = await getDocs(collection(db, "profiles"));
    const sharedWith = queryProfiles.docs.find(profile => profile.data().link === url).data().sharedWith;

    // removing the currently logged-in user's email
    emailList.splice(emailList.indexOf(data.user.email), 1);

    // marking if the user has been added to the url
    const emailListObject = emailList.map(email => ({
      email,
      hasAdded: sharedWith.includes(email)
    }))
    sendResponse({emailList: emailListObject});
  })
}

const shareProfile = async (url, recipientEmail, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "You are not signed in. "});
      return;
    }

    const querySnapshot = await getProfile(data.user.email, url);

    if (querySnapshot.empty) {
      sendResponse({error: "You have not added this link"})
      return
    }

    const profileId = querySnapshot.docs[0].id
    const profileRef = doc(db, "profiles", profileId);
    await updateDoc(profileRef, {
      sharedWith: arrayUnion(recipientEmail)
    })

    sendResponse({success: true});
  });
}

const removeShareProfile = async (url, recipientEmail, sendResponse) => {
  chrome.storage.local.get("user", async (data) => {
    if (!data.user) {
      sendResponse({error: "You are not signed in. "});
      return;
    }

    const querySnapshot = await getProfile(data.user.email, url);

    if (querySnapshot.empty) {
      sendResponse({error: "You have not added this link"})
      return
    }

    const profileId = querySnapshot.docs[0].id
    const profileRef = doc(db, "profiles", profileId);
    await updateDoc(profileRef, {
      sharedWith: arrayRemove(recipientEmail)
    })

    sendResponse({success: true});
  });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case "signIn":
      handleSignIn(sendResponse); // this is required, we cannot inline or else we can't return data to sender due to async
      break;

    case "hasAddedLink":
      hadAddedLink(request.url, sendResponse);
      break;

    case "linkedinAdd":
      addLinkedinProfile(request.url, sendResponse);
      break;

    case "linkedinRemove":
      removeLinkedinProfile(request.url, sendResponse);
      break;

    case "getEmailList":
      getEmailList(sendResponse, request.url);
      break;

    case "shareProfile":
      shareProfile(request.url, request.email, sendResponse);
      break;

    case "removeShareProfile":
      removeShareProfile(request.url, request.email, sendResponse);
      break;

    default:
      // Handle unknown message type if necessary
      console.warn(`Unknown message type: ${request.message}`);
  }

  return true;
})

chrome.webNavigation.onHistoryStateUpdated.addListener(async function (details) {
  if (details.url.startsWith("https://www.linkedin.com/in/")) {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, {}); // let content worker know that we're on the right page
  }
})