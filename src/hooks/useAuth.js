// src/hooks/useAuth.js
import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import emailjs from "emailjs-com";
import { auth, googleProvider } from "../firebase";

const EMAILJS_SERVICE_ID = "service_xkajwad";
const EMAILJS_TEMPLATE_ID = "template_lgaf479";
const EMAILJS_PUBLIC_KEY = "barenH6VgMtFo51tb";

const sendWelcomeEmail = (name, email) => {
    return emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { to_name: name, to_email: email },
        EMAILJS_PUBLIC_KEY
    );
};

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ── Sign Up
    const signUp = async (name, email, password) => {
        setLoading(true); setError(null);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: name });
            await sendWelcomeEmail(name, email);      // 🎉 send welcome email
            return user;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ── Login
    const login = async (email, password) => {
        setLoading(true); setError(null);
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            return user;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ── Google Sign In
    const loginWithGoogle = async () => {
        setLoading(true); setError(null);
        try {
            const { user, additionalUserInfo } = await signInWithPopup(auth, googleProvider);
            // Send welcome email only on first Google sign-in
            if (additionalUserInfo?.isNewUser) {
                await sendWelcomeEmail(user.displayName, user.email);
            }
            return user;
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { signUp, login, loginWithGoogle, loading, error };
};