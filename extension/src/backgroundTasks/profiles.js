import {
    addDoc,
    and,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    or,
    query,
    where,
} from "firebase/firestore";
import db from "../firebase";
import { getCurrentTabUrl, getLoggedInUser } from "./utils";
import { setNote } from "./notes";

const profilesRef = collection(db, "profiles");

//todo rename this
export async function _getLinkedInProfile() {
    // TODO Index this shit lmao (composite index)

    // Check Who Shares
    const { email: adderEmail } = await getLoggedInUser();
    const url = await getCurrentTabUrl();
    if (!adderEmail || !url) {
        console.error("User email not found or url of current tab not found");
        return false;
    }
    const docRef = await getDoc(doc(db, "users", adderEmail));
    const shareEmailList = docRef.data().urlsReceivedShared;

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
export const getLinkedInProfile = async (sendResponse) => {
    const user = await getLoggedInUser(sendResponse);
    const url = await getCurrentTabUrl();
    if (!user || !url) {
        console.error("user or url is undefined");
        sendResponse({ error: "Something went wrong" });
        return;
    }

    const querySnapshot = await _getLinkedInProfile();
    sendResponse({ exists: !querySnapshot.empty });
};

export const setLinkedInProfile = async (sendResponse) => {
    const user = await getLoggedInUser(sendResponse);
    const url = await getCurrentTabUrl();
    if (!user || !url) {
        console.error("user or url is undefined");
        sendResponse({ error: "Something went wrong" });
        return;
    }

    const profileDocResponse = await addDoc(profilesRef, {
        adderEmail: user.email,
        adderImage: user.photoURL,
        link: url,
        sharedWith: [],
    });

    await setNote(profileDocResponse);

    sendResponse({ profileDocResponse });
};

// need to be updated
export const deleteLinkedinProfile = async (sendResponse) => {
    const user = await getLoggedInUser(sendResponse);
    const url = await getCurrentTabUrl();
    if (!user || !url) {
        console.error("user is undefined");
        sendResponse({ error: "Something went wrong" });
        return;
    }

    const querySnapshotProfiles = await _getLinkedInProfile(url);
    for (const document of querySnapshotProfiles.docs) {
        await deleteDoc(doc(db, "profiles", document.id));
    }

    // const querySnapshotNotes = await _getLinkedInProfileNotes(data.user.email, url);
    // for (const document of querySnapshotNotes.docs) {
    //     await deleteDoc(doc(db, "notes", document.id));
    // }

    sendResponse({ success: true });
};
