// Utilities to apply and persist theme (light/dark)
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const applyThemeClass = (theme) => {
  const body = document.body;
  if (theme === "dark") body.classList.add("dark");
  else body.classList.remove("dark");
};

export const saveThemeLocal = (theme) => {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
};

export const loadThemeLocal = () => {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
};

export const persistUserTheme = async (uid, theme) => {
  if (!uid) return;
  try {
    await setDoc(
      doc(db, "users", uid),
      { prefs: { theme }, updatedAt: Date.now() },
      { merge: true }
    );
  } catch {}
};

export const fetchUserTheme = async (uid) => {
  if (!uid) return null;
  try {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data()?.prefs?.theme || null : null;
  } catch {
    return null;
  }
};

