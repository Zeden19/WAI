import { initializeApp } from "firebase/app";
import firebaseConfig from "@/fireBaseConfig.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

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
    if (!user.email) {
        console.error("user not defined", user);
        return null;
    }
    const q = query(collection(db, "profiles"), where("adderEmail", "==", user.email));
    return (await getDocs(q)).docs.map((doc) => doc.data());
}

export async function getSharedProfiles(user) {
    if (!user.email) {
        console.error("User not defined", user);
        return null;
    }
    const q = query(collection(db, "profiles"), where("sharedWith", "array-contains", user.email));
    return (await getDocs(q)).docs.map((doc) => doc.data());
}
