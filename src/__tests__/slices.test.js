import appReducer, { toggleMenu, setMenuOpen } from "../utils/appSlice";
import chatReducer, { addMessage } from "../utils/chatSlice";
import authReducer, { setUser, clearUser } from "../utils/authSlice";

describe("appSlice", () => {
  test("toggleMenu flips boolean", () => {
    const state = { isMenuOpen: true };
    const next = appReducer(state, toggleMenu());
    expect(next.isMenuOpen).toBe(false);
  });
  test("setMenuOpen sets explicit value", () => {
    const state = { isMenuOpen: false };
    const next = appReducer(state, setMenuOpen(true));
    expect(next.isMenuOpen).toBe(true);
  });
});

describe("chatSlice", () => {
  test("addMessage appends and trims to LIVE_CHAT_OFFSET", () => {
    const initial = { messages: [] };
    let state = initial;
    for (let i = 0; i < 105; i++) {
      state = chatReducer(state, addMessage({ name: "n", message: String(i), timestamp: "t" }));
    }
    expect(state.messages.length).toBeLessThanOrEqual(100);
    expect(state.messages[state.messages.length - 1].message).toBe("104");
  });
});

describe("authSlice", () => {
  test("set/clear user", () => {
    let state = { user: null };
    state = authReducer(state, setUser({ uid: "1", displayName: "Test" }));
    expect(state.user).toBeTruthy();
    state = authReducer(state, clearUser());
    expect(state.user).toBeNull();
  });
});

