import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import tabSlice from "./tabSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import authSlice from "./authSlice";
import queueSlice from "./queueSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    tab: tabSlice,
    search: searchSlice,
    chat: chatSlice,
    auth: authSlice,
    queue: queueSlice,
  },
});

export default store;
