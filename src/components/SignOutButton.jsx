import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const SignOutButton = ({ className = "" }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Sign-out failed", e);
    }
  };
  return (
    <button
      onClick={handleSignOut}
      className={`border border-gray-400 rounded-full px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;

