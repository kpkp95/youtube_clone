import { createSlice } from "@reduxjs/toolkit";

const queueSlice = createSlice({
  name: "queue",
  initialState: {
    items: [], // array of video IDs
    index: 0, // current position in queue
    autoplay: true,
  },
  reducers: {
    setQueue(state, action) {
      state.items = action.payload || [];
      state.index = 0;
    },
    enqueue(state, action) {
      state.items.push(action.payload);
    },
    dequeue(state) {
      state.items.shift();
      state.index = Math.max(0, state.index - 1);
    },
    next(state) {
      if (state.index < state.items.length - 1) state.index += 1;
    },
    prev(state) {
      if (state.index > 0) state.index -= 1;
    },
    setIndex(state, action) {
      const i = action.payload;
      if (i >= 0 && i < state.items.length) state.index = i;
    },
    setAutoplay(state, action) {
      state.autoplay = Boolean(action.payload);
    },
  },
});

export const { setQueue, enqueue, dequeue, next, prev, setIndex, setAutoplay } = queueSlice.actions;
export default queueSlice.reducer;

