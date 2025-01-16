import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import db from "../firebase";
import { getCurrentTabUrl, getLoggedInUser } from "./utils";
import { _getLinkedInProfile } from "./profiles";

const profilesRef = collection(db, "profiles");

async function getNote(email, url) {
    // Change
    const q = query(
        profilesRef,
        where("adderEmail", "==", email),
        where("link", "==", url),
    );
    return await getDocs(q);
}

export const getNotesUserList = async (email) => {
    return await profilesRef.where("adderEmail", "==", email).get();
};

export const getNotesProfileList = async (linkedInProfile, sendResponse) => {
    const email = getLoggedInUser(sendResponse);
    if (email === false) {
        return;
    }

    // Check Perms
};

export const setNote = async (profile) => {
    // create note sub-collection within new profile
    const notesSubCollection = collection(db, "profiles", profile.id, "notes");

    // we have to add a doc to the new collection
    await addDoc(notesSubCollection, {
        lastUpdated: null,
        text: null,
        created: null,
    });
};

export const newNote = async (noteText, sendResponse) => {
    // getting all info
    const { user } = await getLoggedInUser();
    const url = await getCurrentTabUrl();
    const profile = await _getLinkedInProfile(user.email, url);

    if (!user || !url || !profile) {
        console.error(`user: ${user}, url: ${url}, profile: ${profile}`);
        sendResponse({ error: "Something went wrong. Please try again." });
    }
    const profileId = profile.docs[0].id;

    // adding to sub collection
    const notesSubCollection = collection(db, "profiles", profileId, "notes");
    const newNote = await addDoc(notesSubCollection, {
        lastUpdated: new Date(),
        text: noteText,
        created: new Date(),
    });

    sendResponse({ success: true, id: newNote.id });
};

export const updateNotes = () => {};

export const removeNote = async (noteId, sendResponse) => {
    const { user } = await getLoggedInUser();
    const url = await getCurrentTabUrl();
    const profile = await _getLinkedInProfile(user.email, url);

    if (!user || !url || !profile) {
        console.error(`user: ${user}, url: ${url}, profile: ${profile}`);
        sendResponse({ error: "Something went wrong. Please try again." });
    }
    const profileId = profile.docs[0].id;

    // removing from collection
    const noteDoc = doc(db, "profiles", profileId, "notes", noteId);

    try {
        await deleteDoc(noteDoc);
        sendResponse({ success: true });
    } catch (e) {
        sendResponse({ error: "Something went wrong. Please try again." });
    }
};
