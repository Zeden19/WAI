import { initializeApp } from "firebase/app";
import firebaseConfig from "@/fireBaseConfig.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

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

