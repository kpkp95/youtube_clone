import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_OFFSET } from "./constant";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      // Add the new message
      state.messages.push(action.payload);
      // Keep only the last LIVE_CHAT_OFFSET messages
      if (state.messages.length > LIVE_CHAT_OFFSET) {
        state.messages.splice(0, state.messages.length - LIVE_CHAT_OFFSET);
      }
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
