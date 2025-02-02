import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, or, query, where } from 'firebase/firestore';
import db from './firebase';
import { getCurrentTabUrl, getLoggedInUser } from './utils';
import { setNote } from './notes';
import { send } from 'vite';

const profilesRef = collection(db, 'profiles');

export async function getLinkedInProfile(sendResponse: (response: any) => void) {
  // TODO Index this shit lmao (composite index)

  const { email: adderEmail } = await getLoggedInUser();
  const url = await getCurrentTabUrl();
  if (!adderEmail || !url) {
    console.error('User email not found or url of current tab not found');
    return false;
  }

  const docRef = await getDoc(doc(db, 'users', adderEmail));

  const data = docRef.data();
  if (!data || !data.urlsReceivedShared) {
    console.error('urlsReceivedShared is undefined');
    return false;
  }

  const shareEmailList = data.urlsReceivedShared;
  shareEmailList.push(adderEmail);

  const q = query(
    profilesRef,
    and(
      or(where('adderEmail', 'in', shareEmailList), where('sharedWith', 'array-contains', adderEmail)),
      where('link', '==', url),
    ),
  );

  if (sendResponse) {
    const profile = await getDocs(q);
    sendResponse({ empty: profile.empty });
    return;
  }

  return await getDocs(q);
}

export const setLinkedInProfile = async (sendResponse: (response: any) => void) => {
  const user = await getLoggedInUser();
  const url = await getCurrentTabUrl();
  if (!user || !url) {
    console.error('user or url is undefined');
    sendResponse({ error: 'Something went wrong' });
    return;
  }

  const profileDocResponse = await addDoc(profilesRef, {
    adderEmail: user.email,
    adderImage: user.photoURL,
    link: url,
    sharedWith: [],
  });

  await setNote(url, sendResponse);

  sendResponse({ profileDocResponse });
};

// need to be updated
export const deleteLinkedinProfile = async (sendResponse: (response: any) => void) => {
  const querySnapshotProfiles = await getLinkedInProfile(sendResponse);
  if (!querySnapshotProfiles) {
    sendResponse({ error: 'Something went wrong' });
    return;
  }
  for (const document of querySnapshotProfiles.docs) {
    await deleteDoc(doc(db, 'profiles', document.id));
  }

  // const querySnapshotNotes = await _getLinkedInProfileNotes(data.user.email, url);
  // for (const document of querySnapshotNotes.docs) {
  //     await deleteDoc(doc(db, "notes", document.id));
  // }

  sendResponse({ success: true });
};
