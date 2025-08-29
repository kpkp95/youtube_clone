import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import {
  applyThemeClass,
  loadThemeLocal,
  fetchUserTheme,
  persistUserTheme,
  saveThemeLocal,
} from "../utils/theme";
import { setUser, clearUser } from "../utils/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
        // Load theme preference for user or fall back to local setting
        const userTheme = await fetchUserTheme(uid);
        const localTheme = loadThemeLocal();
        const theme = userTheme || localTheme || (document.body.classList.contains("dark") ? "dark" : "light");
        applyThemeClass(theme);
        // Sync to both
        saveThemeLocal(theme);
        persistUserTheme(uid, theme);
      } else {
        dispatch(clearUser());
        // Apply local preference for signed-out user
        const localTheme = loadThemeLocal();
        if (localTheme) applyThemeClass(localTheme);
      }
    });
    return () => unsub();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
