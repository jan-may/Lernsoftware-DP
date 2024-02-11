import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ActionCreators = {
  input: typeof setInput;
  speed: typeof setSpeed;
  horizontalSpacing: typeof setHorizontalSpacing;
  verticalSpacing: typeof setVerticalSpacing;
  circleRadius: typeof setCircleRadius;
};

export type Problem =
  | "fibonacci"
  | "gridTraveler"
  | "canSum"
  | "levenshtein"
  | "";
export type FunctionName = "fib" | "fibMemo" | "fibTab" | "";

export const SPEED = 300;

interface SettingsState {
  selectedProblem: Problem;
  functionName: FunctionName;
  input: number;
  inputText: string;
  speed: number;
  sidebarWidth: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  circleRadius: number;
  bluredCode: boolean;
}

const initialState: SettingsState = {
  selectedProblem: "",
  functionName: "",
  input: 5,
  inputText: "5",
  speed: SPEED,
  sidebarWidth: 320,
  verticalSpacing: 0,
  horizontalSpacing: 0,
  circleRadius: 0,
  bluredCode: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<number>) => {
      state.input = action.payload;
    },
    setInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
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
    setSelectedProblem: (state, action: PayloadAction<Problem>) => {
      state.selectedProblem = action.payload;
    },
    setBluredCode: (state, action: PayloadAction<boolean>) => {
      state.bluredCode = action.payload;
    },
    setFunctionName: (state, action: PayloadAction<FunctionName>) => {
      state.functionName = action.payload;
    },
  },
});

export const {
  setInput,
  setInputText,
  setSpeed,
  setSidebarWidth,
  setVerticalSpacing,
  setHorizontalSpacing,
  setCircleRadius,
  setSelectedProblem,
  setBluredCode,
  setFunctionName,
} = settingsSlice.actions;
export default settingsSlice.reducer;
