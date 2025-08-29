import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

const SignInButton = ({ className = "" }) => {
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Sign-in failed", e);
    }
  };
  return (
    <button
      onClick={handleSignIn}
      className={`border border-gray-400 rounded-full px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
    >
      Sign in
    </button>
  );
};

export default SignInButton;

