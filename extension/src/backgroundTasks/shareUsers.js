import {arrayRemove, arrayUnion, collection, doc, getDocs, updateDoc} from "firebase/firestore";
import db from "../background";

/* Sharing Feature */
// can we cache this information? doing this everytime for each linkedin page seems inefficient
// i have no experience with caching so i need to figure dat out
export const getEmailList = async (sendResponse, url) => {
    chrome.storage.local.get("user", async (data) => {
        if (!data.user) {
            sendResponse({error: "You are not signed in. "})
            return
        }
        const querySnapshot = await getDocs(collection(db, "users"));
        const emailList = querySnapshot.docs.map((doc) => (doc.id));

        const queryProfiles = await getDocs(collection(db, "profiles"));
        const sharedWith = queryProfiles.docs.find(profile => profile.data().link === url).data().sharedWith;

        // removing the currently logged-in user's email
        emailList.splice(emailList.indexOf(data.user.email), 1);

        // marking if the user has been added to the url
        const emailListObject = emailList.map(email => ({
            email,
            hasAdded: sharedWith.includes(email)
        }))

        console.log(emailListObject)
        sendResponse({emailList: emailListObject});
    })
}



export const setShareProfile = async (url, recipientEmail, sendResponse) => {
    chrome.storage.local.get("user", async (data) => {
        if (!data.user) {
            sendResponse({error: "You are not signed in. "});
            return;
        }

        const querySnapshot = await getLinkedInProfile(data.user.email, url);

        if (querySnapshot.empty) {
            sendResponse({error: "You have not added this link"})
            return
        }

        const profileId = querySnapshot.docs[0].id
        const profileRef = doc(db, "profiles", profileId);
        await updateDoc(profileRef, {
            sharedWith: arrayUnion(recipientEmail)
        })

        sendResponse({success: true});
    });
}

export const removeShareProfile = async (url, recipientEmail, sendResponse) => {
    chrome.storage.local.get("user", async (data) => {
        if (!data.user) {
            sendResponse({error: "You are not signed in. "});
            return;
        }

        const querySnapshot = await getLinkedInProfile(data.user.email, url);

        if (querySnapshot.empty) {
            sendResponse({error: "You have not added this link"})
            return
        }

        const profileId = querySnapshot.docs[0].id
        const profileRef = doc(db, "profiles", profileId);
        await updateDoc(profileRef, {
            sharedWith: arrayRemove(recipientEmail)
        })

        sendResponse({success: true});
    });
}