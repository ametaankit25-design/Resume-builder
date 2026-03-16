// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA6W_7RdEnLANkJKoCM8hmRn1_w8r7a9sI",
    authDomain: "resume-builder-9b415.firebaseapp.com",
    projectId: "resume-builder-9b415",
    storageBucket: "resume-builder-9b415.firebasestorage.app",
    messagingSenderId: "58109324672",
    appId: "1:58109324672:web:84cdd337fcd3e537e1e565",
    measurementId: "G-2RM2LDN6PT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

