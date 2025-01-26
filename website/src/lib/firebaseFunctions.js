// this file may potentially become enormously large. Splitting up into
// files for users, profiles, signin/signout may be needed later on
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/fireBaseConfig.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, getDoc, getFirestore, query, where, doc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export async function signIn() {
    const result = await signInWithPopup(auth, provider);
    if (!result) {
        console.error("Could not log in: ", result);
        return null;
    }
    // The signed-in user info.
    localStorage.setItem("user", JSON.stringify(result.user));
    return result.user;
}

export function signOut() {
    localStorage.removeItem("user");
}

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export async function getUserProfiles(user) {
    if (!user) {
        console.error("user not defined", user);
        return null;
    }
    const q = query(collection(db, "profiles"), where("adderEmail", "==", user.email));
    return (await getDocs(q)).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getSharedProfiles(user) {
    if (!user) {
        console.error("User not defined", user);
        return null;
    }
    const q = query(collection(db, "profiles"), where("sharedWith", "array-contains", user.email));
    return (await getDocs(q)).docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getUserFromId(id) {
    if (!id) {
        console.error("id not defined", id);
        return;
    }

    const docRef = doc(db, "users", id);
    if (!docRef) {
        console.error("Could not find user");
        return;
    }

    return (await getDoc(docRef)).data();
}

export async function getProfileFromId(id) {
    if (!id) {
        console.error("id not defined", id);
        return;
    }

    const docRef = doc(db, "profiles", id);
    if (!docRef) {
        console.error("Could not find profile");
        return;
    }

    return (await getDoc(docRef)).data();
}