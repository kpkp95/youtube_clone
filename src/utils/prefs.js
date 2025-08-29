import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const KEY_RIGHT_TAB = "rightRailTab"; // "chat" | "related"

export const saveRightTabLocal = (tab) => {
  try {
    localStorage.setItem(KEY_RIGHT_TAB, tab);
  } catch {}
};

export const getRightTabLocal = () => {
  try {
    return localStorage.getItem(KEY_RIGHT_TAB);
  } catch {
    return null;
  }
};

export const persistRightTab = async (uid, tab) => {
  if (!uid) return;
  try {
    await setDoc(
      doc(db, "users", uid),
      { prefs: { rightRailTab: tab }, updatedAt: Date.now() },
      { merge: true }
    );
  } catch {}
};

export const fetchRightTab = async (uid) => {
  if (!uid) return null;
  try {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data()?.prefs?.rightRailTab || null : null;
  } catch {
    return null;
  }
};

