import { collection, doc, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import { getLoggedInUser } from "./utils";

const profilesRef = collection(db, "profiles");
const notesRef = collection(db, "notes");

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

export const setNote = () => {};

export const updateNotes = () => {};

export const removeNote = () => {};
