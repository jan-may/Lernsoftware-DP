import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  selectedProblem: string;
  input: number;
  speed: number;
  sidebarWidth: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  circleRadius: number;
  bluredCode: boolean;
}

const initialState: SettingsState = {
  selectedProblem: "",
  input: 5,
  speed: 500,
  sidebarWidth: 320,
  verticalSpacing: 52,
  horizontalSpacing: 52,
  circleRadius: 21,
  bluredCode: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
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
    setSelectedProblem: (state, action: PayloadAction<string>) => {
      state.selectedProblem = action.payload;
    },
    setBluredCode: (state, action: PayloadAction<boolean>) => {
      state.bluredCode = action.payload;
    },
  },
});

export const {
  setInput,
  setSpeed,
  setSidebarWidth,
  setVerticalSpacing,
  setHorizontalSpacing,
  setCircleRadius,
  setSelectedProblem,
  setBluredCode,
} = settingsSlice.actions;
export default settingsSlice.reducer;
