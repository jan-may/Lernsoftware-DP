import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './feautures/settings/settingsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch