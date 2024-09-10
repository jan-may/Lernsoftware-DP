import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TravelersInput = {
  array: number[][];
};

type CanSumInput = {
  targetSum: number;
  numbers: number[];
};

export type ActionCreators = {
  input: typeof setInput;
  speed: typeof setSpeed;
  horizontalSpacing: typeof setHorizontalSpacing;
  verticalSpacing: typeof setVerticalSpacing;
  circleRadius: typeof setCircleRadius;
};

export type Problem = "fibonacci" | "gridTraveler" | "canSum" | "";

export type FunctionName =
  | "fib"
  | "fibMemo"
  | "fibTab"
  | "GridTravel"
  | "GridTravelMemo"
  | "TraverlerTab"
  | "CanSumRec"
  | "CanSumMemo"
  | "CanSumTab"
  | "";

export const SPEED = 250;

interface SettingsState {
  selectedProblem: Problem;
  functionName: FunctionName;
  input: number;
  inputText: string;
  travelersInput: TravelersInput;
  canSumInput: CanSumInput;
  speed: number;
  sidebarWidth: number;
  verticalSpacing: number;
  horizontalSpacing: number;
  circleRadius: number;
  bluredCode: boolean;
  fieldSize: number;
  textSize: number;
  targetNumber: number;
  numbers: number[];
}

const initialState: SettingsState = {
  selectedProblem: "",
  functionName: "",
  input: 5,
  travelersInput: {
    array: [
      [1, 3, 1, 3, 2],
      [1, 5, 1, 3, 2],
      [4, 2, 1, 2, 2],
      [4, 2, 1, 2, 2],
      [4, 2, 1, 2, 2],
    ],
  },
  canSumInput: {
    targetSum: 7,
    numbers: [2, 3],
  },
  inputText: "5",
  speed: SPEED,
  sidebarWidth: 320,
  verticalSpacing: 0,
  horizontalSpacing: 0,
  circleRadius: 0,
  bluredCode: true,
  fieldSize: 64,
  textSize: 14,
  targetNumber: 7,
  numbers: [2, 3],
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
    setTravelersInput: (state, action: PayloadAction<TravelersInput>) => {
      state.travelersInput = action.payload;
    },
    setCanSumInput: (state, action: PayloadAction<CanSumInput>) => {
      state.canSumInput = action.payload;
    },
    setFieldSize: (state, action: PayloadAction<number>) => {
      state.fieldSize = action.payload;
    },
    setTextSize: (state, action: PayloadAction<number>) => {
      state.textSize = action.payload;
    },
    setTargetNumber: (state, action: PayloadAction<number>) => {
      state.targetNumber = action.payload;
    },
    setNumbers: (state, action: PayloadAction<number[]>) => {
      state.numbers = action.payload;
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
  setTravelersInput,
  setCanSumInput,
  setFieldSize,
  setTextSize,
  setTargetNumber,
  setNumbers,
} = settingsSlice.actions;
export default settingsSlice.reducer;
