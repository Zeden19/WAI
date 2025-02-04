import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import db from "../firebase";
import { getCurrentTabUrl, getLoggedInUser } from "./utils";
import { getLinkedInProfile } from "./profiles";

/* Sharing Feature */
// can we cache this information? doing this everytime for each linkedin page seems inefficient
// i have no experience with caching so i need to figure dat out
export const getEmailList = async (sendResponse) => {
    const url = await getCurrentTabUrl();
    const user = await getLoggedInUser(sendResponse);
    if (!user) {
        sendResponse({ error: "Something went wrong" });
        console.error("user undefined");
        return;
    }

    const querySnapshot = await getDocs(collection(db, "users"));
    const emailList = querySnapshot.docs.map((doc) => doc.id);

    const queryProfiles = await getDocs(collection(db, "profiles"));
    const sharedWith = queryProfiles.docs
        .find((profile) => profile.data().link === url)
        .data().sharedWith;

    // removing the currently logged-in user's email
    emailList.splice(emailList.indexOf(user.email), 1);

    // marking if the user has been added to the url
    const emailListObject = emailList.map((email) => ({
        email,
        hasAdded: sharedWith.includes(email),
    }));

    sendResponse({ emailList: emailListObject });
};

export const setShareProfile = async (recipientEmail, sendResponse) => {
    const querySnapshot = await getLinkedInProfile();

    if (querySnapshot.empty) {
        console.error("User has not added link");
        sendResponse({ error: "You have not added this link" });
        return;
    }
    const profileId = querySnapshot.docs[0].id;
    const profileRef = doc(db, "profiles", profileId);
    await updateDoc(profileRef, {
        sharedWith: arrayUnion(recipientEmail),
    });
    sendResponse({ success: true });
};

export const removeShareProfile = async (recipientEmail, sendResponse) => {
    const querySnapshot = await getLinkedInProfile();
    console.log(querySnapshot);

    if (querySnapshot.empty) {
        console.error("User has not added link");
        sendResponse({ error: "You have not added this link" });
        return;
    }
    const profileId = querySnapshot.docs[0].id;
    const profileRef = doc(db, "profiles", profileId);
    await updateDoc(profileRef, {
        sharedWith: arrayRemove(recipientEmail),
    });

    sendResponse({ success: true });
};
