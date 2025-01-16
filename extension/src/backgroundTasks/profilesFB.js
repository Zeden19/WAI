import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    addDoc,
    where,
    or,
    and,
} from "firebase/firestore";
import db from "../firebase";
import { getLoggedInUser, getProfileSlug } from "./utils";

const profilesRef = collection(db, "profiles");
const notesRef = collection(db, "notes");

//todo rename this
export async function _getLinkedInProfile(adderEmail, url) {
    // TODO Index this shit lmao (composite index)

    // Check Who Shares
    const docRef = await getDoc(doc(db, "users", adderEmail));
    const shareEmailList = docRef.data().accountsSharedWith;

    //

    shareEmailList.push(adderEmail);

    const q = query(
        profilesRef,
        and(
            or(
                where("adderEmail", "in", shareEmailList),
                where("sharedWith", "array-contains", adderEmail),
            ),
            where("link", "==", url),
        ),
    );

    return await getDocs(q);
}

// GET, SET AND DELETE
export const getLinkedInProfile = async (url, sendResponse) => {
    const data = await getLoggedInUser(sendResponse);
    if (!data) return;

    const querySnapshot = await _getLinkedInProfile(data.user.email, url);
    sendResponse({ exists: !querySnapshot.empty });
};

export const setLinkedInProfile = async (url, sendResponse) => {
    const data = await getLoggedInUser(sendResponse);
    if (!data) return;

    const profilesDocRef = collection(db, "profiles");
    const profileDocId = profilesDocRef.id;
    const profileDocResponse = await addDoc(profilesDocRef, {
        adderEmail: data.user.email,
        adderImage: data.user.photoURL,
        link: url,
        sharedWith: [],
    });

    const noteDocRef = doc(db, "notes", `${profileDocId}-note`);
    await addDoc(noteDocRef, {
        profileRef: profilesDocRef.path, // Reference to the 'profiles' document
        timestamp: new Date(),
    });

    // const notesSubCollection = collection(noteDocRef, "sharedWith")
    // await addDoc(notesSubCollection, "stats", {
    //     numberOfNotes: 0,
    // });

    sendResponse({ profileDocResponse });
};

// need to be updated
export const deleteLinkedinProfile = async (url, sendResponse) => {
    const data = await getLoggedInUser(sendResponse);
    if (!data) return;

    const querySnapshotProfiles = await _getLinkedInProfile(
        data.user.email,
        url,
    );
    for (const document of querySnapshotProfiles.docs) {
        await deleteDoc(doc(db, "profiles", document.id));
    }

    // const querySnapshotNotes = await _getLinkedInProfileNotes(data.user.email, url);
    // for (const document of querySnapshotNotes.docs) {
    //     await deleteDoc(doc(db, "notes", document.id));
    // }

    sendResponse({ success: true });
};
