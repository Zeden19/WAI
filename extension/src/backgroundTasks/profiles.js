import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where,
    arrayRemove
} from "firebase/firestore"
import db from "../background"
import {getProfileSlug, getLoggedInUser} from "./utils";

const profilesRef = db.collection("profiles");
const notesRef = db.collection("notes");

async function _getLinkedInProfile(adderEmail, url) {
    // TODO Index this shit lmao (composite index)
    const query = profilesRef
                    .where("adderEmail", "==", adderEmail)
                    .where("link", "==", url)
                    .limit(1);
    return await query.get();
}
 




// GET, SET AND DELETE
export const getLinkedInProfile = async (url, sendResponse) => {
    const data = getLoggedInUser(sendResponse); if (!data) return;

    const querySnapshot = await _getLinkedInProfile(data.user.email, url);
    sendResponse({exists: !querySnapshot.empty});
}


export const setLinkedInProfile = async (url, sendResponse) => {
    const data = getLoggedInUser(sendResponse); if (!data) return;

    // Removes the weird /?originalSubdomain crap that sometimes happen for urls
    url = url.replace('/?originalSubdomain', '');
    url = url.replace('%2F%3ForiginalSubdomain%3', '')

    const profilesDocRef = doc(db, "profiles", `${data.user.email}-${getProfileSlug(url)}`);
    const profileDocResponse = await setDoc(profilesDocRef, {
        adderEmail: data.user.email,
        adderImage: data.user.photoURL,
        link: url,
        notes: [],
        sharedWith: []
    });


    const noteDocRef = doc(db, "notes", `${data.user.email}-${getProfileSlug(url)}-note`);
    await setDoc(noteDocRef, {
        profileRef: profilesDocRef.path, // Reference to the 'profiles' document
        timestamp: new Date(),
        notesCollection: []
    });


    sendResponse({profileDocResponse})
}


// need to be updated
export const removeLinkedinProfile = async (url, sendResponse) => {
    const data = getLoggedInUser(sendResponse); if (!data) return;

    const querySnapshotProfiles = await _getLinkedInProfile(data.user.email, url);
    for (const document of querySnapshotProfiles.docs) {
        await deleteDoc(doc(db, "profiles", document.id));
    }

    const querySnapshotNotes = await _getLinkedInProfileNotes(data.user.email, url);
    for (const document of querySnapshotNotes.docs) {
        await deleteDoc(doc(db, "notes", document.id));
    }

    sendResponse({success: true})    
}
