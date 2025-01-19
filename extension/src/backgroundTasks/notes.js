import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import db from "../firebase";
import { getLinkedInProfile } from "./profiles";

const profilesRef = collection(db, "profiles");

// this won't work we need note id
async function getNote(email, url) {
    // Change
    const q = query(
        profilesRef,
        where("adderEmail", "==", email),
        where("link", "==", url),
    );
    return await getDocs(q);
}

// im tired as shit what the fuck is this?????
export const getNotesUserList = async (email) => {
    return await profilesRef.where("adderEmail", "==", email).get();
};

// Gets all notes from a specific profile
export const getNotesProfileList = async (sendResponse) => {
    const linkedinProfile = await getLinkedInProfile();

    if (!linkedinProfile) {
        sendResponse({ error: "Something went wrong" });
        return;
    }

    const collectionRef = collection(
        db,
        "profiles",
        linkedinProfile.docs[0].id,
        "notes",
    );
    const querySnapshot = await getDocs(collectionRef);
    const notes = [];
    querySnapshot.forEach((doc) => notes.push(doc.data()));
    sendResponse({ success: true, notes });
};

export const setNote = async (profile) => {
    // create note sub-collection within new profile
    const notesSubCollection = collection(db, "profiles", profile.id, "notes");

    // we have to add a doc to the new collection
    await addDoc(notesSubCollection, {
        lastUpdated: new Date(),
        title: "Your new Note",
        text: "Note Description",
        created: new Date(),
    });
};

export const newNote = async (noteTitle, noteDescription , sendResponse) => {
    // getting all info
    const profile = await getLinkedInProfile();

    if (!profile) {
        console.error(`profile: ${profile} not defined`);
        sendResponse({ error: "Something went wrong. Please try again." });
    }
    const profileId = profile.docs[0].id;

    // adding to sub collection
    const notesSubCollection = collection(db, "profiles", profileId, "notes");
    const newNoteRef = await addDoc(notesSubCollection, {
        lastUpdated: new Date(),
        title: noteTitle,
        description: noteDescription,
        created: new Date(),
    });

    const newNoteDoc = await getDoc(newNoteRef);
    const newNote = newNoteDoc.data();

    sendResponse({ success: true, newNote });
};

export const updateNotes = () => {};

export const removeNote = async (noteId, sendResponse) => {
    const profile = await getLinkedInProfile();

    if (!profile) {
        console.error(`profile: ${profile} not defined`);
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
