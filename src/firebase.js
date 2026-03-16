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

// Initialize Firebase with error handling
let app;
let auth;
let googleProvider;
let db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    
    // Configure Google Provider
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    });
    
    db = getFirestore(app);
    
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
    // Provide fallback or user-friendly error message
    throw new Error('Failed to initialize Firebase. Please check your internet connection and try again.');
}

export { auth, googleProvider, db };