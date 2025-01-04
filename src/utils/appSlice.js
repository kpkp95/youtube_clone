import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    setMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload; // Explicitly set the menu state
    },
  },
});

export const { toggleMenu, closeMenu, setMenuOpen } = appSlice.actions;
export default appSlice.reducer;
