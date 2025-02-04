import { initializeApp } from "firebase/app";
import firebaseConfig from "@/fireBaseConfig.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function FirebaseOffscreen() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    // This code runs inside of an iframe in the extension's offscreen document.
    // This gives you a reference to the parent frame, i.e. the offscreen document.
    // You will need this to assign the targetOrigin for postMessage.
    const PARENT_FRAME = document.location.ancestorOrigins[0];

    const PROVIDER = new GoogleAuthProvider();

    function sendResponse(result) {
        globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME);
    }

    globalThis.addEventListener("message", function({ data }) {
        if (data.initAuth) {
            // Opens the Google sign-in page in a popup, inside of an iframe in the
            // extension's offscreen document.
            // To centralize logic, all responses are forwarded to the parent frame,
            // which goes on to forward them to the extension's service worker.
            signInWithPopup(auth, PROVIDER)
              .then(sendResponse)
              .catch(sendResponse);
        }
    });
}

export default FirebaseOffscreen;