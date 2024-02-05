import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./feautures/settings/settingsSlice";
import navbarSlice from "./feautures/navbar/navbarSlice";
import ioSlice from "./feautures/io/ioSlice";
import editorSlice from "./feautures/editor/editorSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    navbar: navbarSlice,
    io: ioSlice,
    editor: editorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
