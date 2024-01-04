import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './feautures/settings/settingsSlice';
import navbarSlice from './feautures/navbar/navbarSlice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    navbar: navbarSlice
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch