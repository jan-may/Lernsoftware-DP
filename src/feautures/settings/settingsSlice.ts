import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  theme: string;
  input: number;
  speed: number;
  sidebarWidth: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  circleRadius: number;
}

const initialState: SettingsState = {
  theme: "dark",
  input: 5,
  speed: 500,
  sidebarWidth: 320,
  verticalSpacing: 52,
  horizontalSpacing: 52,
  circleRadius: 21,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setInput: (state, action: PayloadAction<number>) => {
      state.input = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    setSidebarWidth: (state, action: PayloadAction<number>) => {
      state.sidebarWidth = action.payload;
    },
    setVerticalSpacing: (state, action: PayloadAction<number>) => {
      state.verticalSpacing = action.payload;
    },
    setHorizontalSpacing: (state, action: PayloadAction<number>) => {
      state.horizontalSpacing = action.payload;
    },
    setCircleRadius: (state, action: PayloadAction<number>) => {
      state.circleRadius = action.payload;
    },
  },
});

export const {
  setTheme,
  setInput,
  setSpeed,
  setSidebarWidth,
  setVerticalSpacing,
  setHorizontalSpacing,
  setCircleRadius,
} = settingsSlice.actions;
export default settingsSlice.reducer;
