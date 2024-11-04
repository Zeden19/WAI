import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "linkedinAdd") {
    chrome.action.setPopup({ popup: "src/popups/addProfile/addProfile.html" });
    chrome.action.openPopup(); // Triggers the popup
  }
});


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyB_Q1OWjnniKrFvFnPcsgfQLkpiYe2lOPE",
  authDomain: "wai-finance.firebaseapp.com",
  projectId: "wai-finance",
  storageBucket: "wai-finance.appspot.com",
  messagingSenderId: "220165137666",
  appId: "1:220165137666:web:410e82afcf46152c194e1b",
  measurementId: "G-0M62Y2VN4G",
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// if (firebaseApp) console.log("🫙 Firebase App initiated", firebaseApp);
