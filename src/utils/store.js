import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import tabSlice from "./tabSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    tab: tabSlice,
    search: searchSlice,
    chat: chatSlice,
    auth: authSlice,
  },
});

export default store;
