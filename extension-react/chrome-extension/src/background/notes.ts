import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore';
import db from './firebase';
import { getLinkedInProfile } from './profiles';

const profilesRef = collection(db, 'profiles');

async function getNote(email: string, url: string): Promise<QuerySnapshot<DocumentData>> {
  const q = query(profilesRef, where('adderEmail', '==', email), where('link', '==', url));
  return await getDocs(q);
}

export const getNotesUserList = async (
  email: string,
  sendResponse: (response: { success: boolean; notes?: any[]; error?: string }) => void,
): Promise<void> => {
  const q = query(profilesRef, where('adderEmail', '==', email));
  const querySnapshot = await getDocs(q);
  const notes: any[] = [];
  querySnapshot.forEach(doc => notes.push({ ...doc.data(), id: doc.id }));
  sendResponse({ success: true, notes });
};

export const getNotesProfileList = async (
  sendResponse: (response: { success: boolean; notes?: any[]; error?: string }) => void,
): Promise<void> => {
  const linkedinProfile = await getLinkedInProfile(sendResponse);

  if (!linkedinProfile) {
    sendResponse({ success: false, error: 'Something went wrong' });
    return;
  }

  const collectionRef = collection(db, 'profiles', linkedinProfile.docs[0].id, 'notes');
  const querySnapshot = await getDocs(collectionRef);
  const notes: any[] = [];
  querySnapshot.forEach(doc => notes.push({ ...doc.data(), id: doc.id }));
  sendResponse({ success: true, notes });
};

export const setNote = async (
  profile: string,
  sendResponse: (response: { success: boolean; notes?: any[]; error?: string }) => void,
): Promise<void> => {
  const notesSubCollection = collection(db, 'profiles', profile, 'notes');

  await addDoc(notesSubCollection, {
    lastUpdated: new Date(),
    title: 'Your new Note',
    description: 'Note Description',
    created: new Date(),
  });

  sendResponse({ success: true });
};

export const newNote = async (
  noteTitle: string,
  noteDescription: string,
  sendResponse: (response: { success: boolean; newNote?: any; error?: string }) => void,
): Promise<void> => {
  const profile = await getLinkedInProfile(sendResponse);

  if (!profile) {
    console.error(`profile: ${profile} not defined`);
    sendResponse({ success: false, error: 'Something went wrong. Please try again.' });
    return;
  }
  const profileId = profile.docs[0].id;

  const notesSubCollection = collection(db, 'profiles', profileId, 'notes');
  const newNoteRef = await addDoc(notesSubCollection, {
    lastUpdated: new Date(),
    title: noteTitle,
    description: noteDescription,
    created: new Date(),
  });

  const newNoteDoc = await getDoc(newNoteRef);
  const newNote = { ...newNoteDoc.data(), id: newNoteDoc.id };

  sendResponse({ success: true, newNote });
};

export const updateNote = async (
  id: string,
  title: string,
  description: string,
  sendResponse: (response: { success: boolean; error?: string }) => void,
): Promise<void> => {
  const profile = await getLinkedInProfile(sendResponse);

  if (!profile) {
    console.error(`profile: ${profile} not defined`);
    sendResponse({ success: false, error: 'Something went wrong. Please try again.' });
    return;
  }
  const profileId = profile.docs[0].id;

  const noteRef = doc(db, 'profiles', profileId, 'notes', id);
  try {
    await updateDoc(noteRef, {
      lastUpdated: new Date(),
      title,
      description,
    });
    sendResponse({ success: true });
  } catch (e) {
    console.error(e);
    sendResponse({ success: false, error: 'Something went wrong.' });
  }
};

export const deleteNote = async (
  noteId: string,
  sendResponse: (response: { success: boolean; error?: string }) => void,
): Promise<void> => {
  const profile = await getLinkedInProfile(sendResponse);

  if (!profile) {
    console.error(`profile: ${profile} not defined`);
    sendResponse({ success: false, error: 'Something went wrong. Please try again.' });
    return;
  }

  if (!noteId) {
    console.error('note id not defined');
    sendResponse({ success: false, error: 'Something went wrong. Please try again.' });
    return;
  }
  const profileId = profile.docs[0].id;

  const noteDoc = doc(db, 'profiles', profileId, 'notes', noteId);

  try {
    await deleteDoc(noteDoc);
    sendResponse({ success: true });
  } catch (e) {
    sendResponse({ success: false, error: 'Something went wrong. Please try again.' });
  }
};
