import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { doc, setDoc } from 'firebase/firestore';
import { getEmailList, removeShareProfile, setShareProfile } from '../resources/shareUsers';
import { setLinkedInProfile, deleteLinkedinProfile, getLinkedInProfile } from '../resources/profiles';
import { getNotesProfileList, setNote, deleteNote, newNote, updateNote } from '../resources/notes';
import db from '../firebase';

const OFFSCREEN_DOCUMENT_PATH: string = '/offscreen.html';

let creating: Promise<void> | null = null;

async function hasDocument() {
  // @ts-ignore dont touch this undefined thing lmao
  const matchedClients = await clients.matchAll();
  return matchedClients.some((c: any) => c.url === chrome.runtime.getURL('offscreen.html'));
}

async function setupOffscreenDocument(path: string): Promise<void> {
  if (!(await hasDocument())) {
    if (creating) {
      await creating;
    } else {
      creating = chrome.offscreen.createDocument({
        url: path,
        reasons: [chrome.offscreen.Reason.DOM_SCRAPING],
        justification: 'authentication',
      });
      await creating;
      creating = null;
    }
  }
}

async function closeOffscreenDocument(): Promise<void> {
  if (!(await hasDocument())) {
    return;
  }
  await chrome.offscreen.closeDocument();
}

function getAuth(): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const auth = await chrome.runtime.sendMessage({
      type: 'firebase-auth',
      target: 'offscreen',
    });
    auth?.name !== 'FirebaseError' ? resolve(auth) : reject(auth);
  });
}

async function firebaseAuth(): Promise<any> {
  await setupOffscreenDocument(OFFSCREEN_DOCUMENT_PATH);

  return await getAuth()
    .then(auth => {
      console.log('User Authenticated', auth);
      return auth;
    })
    .catch(err => {
      if (err.code === 'auth/operation-not-allowed') {
        console.error(
          'You must enable an OAuth provider in the Firebase' +
            ' console in order to use signInWithPopup. This sample' +
            ' uses Google by default.',
        );
      } else {
        console.error(err);
        return err;
      }
    })
    .finally(closeOffscreenDocument);
}

const handleSignIn = async (sendResponse: (response: any) => void): Promise<void> => {
  try {
    const response = await firebaseAuth();
    if (!response || !response.user) {
      console.error('Authentication failed or user data is missing.');
      sendResponse({ error: 'Authentication failed' });
      return;
    }

    const user = response.user;
    await chrome.storage.local.set({ user });

    await setDoc(
      doc(db, 'users', user.email),
      {
        email: user.email,
        photoURL: user.photoURL,
        accountsSharedWith: [],
        displayName: user.displayName,
      },
      { merge: true },
    );

    console.log('User data saved successfully.');
    sendResponse({ user });
  } catch (error) {
    console.error('Error during sign-in process:', error);
    sendResponse({ error: 'Sign-in process failed' });
  }
};

chrome.runtime.onMessage.addListener(
  (request: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
    switch (request.message) {
      case 'signIn':
        handleSignIn(sendResponse);
        break;
      case 'hasAddedLink':
        getLinkedInProfile(sendResponse);
        break;
      case 'linkedinAdd':
        setLinkedInProfile(sendResponse);
        break;
      case 'linkedinRemove':
        deleteLinkedinProfile(sendResponse);
        break;
      case 'getEmailList':
        getEmailList(sendResponse);
        break;
      case 'shareProfile':
        setShareProfile(request.email, sendResponse);
        break;
      case 'removeShareProfile':
        removeShareProfile(request.email, sendResponse);
        break;
      case 'getNoteList':
        getNotesProfileList(sendResponse);
        break;
      case 'deleteNote':
        deleteNote(request.noteId, sendResponse);
        break;
      case 'setNote':
        setNote(request.noteContent, sendResponse);
        break;
      case 'newNote':
        newNote(request.noteTitle, request.noteDescription, sendResponse);
        break;
      case 'updateNote':
        updateNote(request.noteId, request.noteTitle, request.noteDescription, sendResponse);
        break;
      default:
        console.warn(`Unknown message type: ${request.message}`);
    }

    return true;
  },
);

chrome.webNavigation.onHistoryStateUpdated.addListener(async function (
  details: chrome.webNavigation.WebNavigationTransitionCallbackDetails,
) {
  if (details.frameId === 0) {
    chrome.tabs.get(details.tabId, async function (tab) {
      if (tab.id !== undefined && details.url.startsWith('https://www.linkedin.com/in/') && tab.url === details.url) {
        chrome.tabs.sendMessage(tab.id, {});
      } else {
        chrome.tabs.sendMessage(0, {});
      }
    });
  }
});
