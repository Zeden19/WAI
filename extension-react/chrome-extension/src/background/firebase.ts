import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_Q1OWjnniKrFvFnPcsgfQLkpiYe2lOPE',
  authDomain: 'wai-finance.firebaseapp.com',
  projectId: 'wai-finance',
  storageBucket: 'wai-finance.appspot.com',
  messagingSenderId: '220165137666',
  appId: '1:220165137666:web:410e82afcf46152c194e1b',
  measurementId: 'G-0M62Y2VN4G',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
