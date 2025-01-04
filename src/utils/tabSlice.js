import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tab",
  initialState: {
    selectedTab: null, // No tab selected initially
  },
  reducers: {
    setTab: (state, action) => {
      state.selectedTab = action.payload; // Update the selectedTab with the clicked tab
    },
  },
});

export const { setTab } = tabSlice.actions; // Export the action creator
export default tabSlice.reducer; // Export the reducer
