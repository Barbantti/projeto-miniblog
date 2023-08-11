import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Pnhm5mLezzvV5DUI-Mwr0taCKBn0DaY",
  authDomain: "miniblog-5fa85.firebaseapp.com",
  projectId: "miniblog-5fa85",
  storageBucket: "miniblog-5fa85.appspot.com",
  messagingSenderId: "777399107184",
  appId: "1:777399107184:web:051e0316e7fbcfda813eb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
