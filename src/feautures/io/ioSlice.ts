import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ioState {
  isTourCompleted: boolean;
  isQuizCompleted: boolean;
  loading: boolean;
}

const initialState: ioState = {
  isTourCompleted: false,
  isQuizCompleted: false,
  loading: false,
};

export const ioSlice = createSlice({
  name: "io",
  initialState,
  reducers: {
    setIsTourCompleted: (state, action: PayloadAction<boolean>) => {
      state.isTourCompleted = action.payload;
    },
    setIsQuizCompleted: (state, action: PayloadAction<boolean>) => {
      state.isQuizCompleted = action.payload;
    },
  },
});

export const { setIsTourCompleted, setIsQuizCompleted } = ioSlice.actions;
export default ioSlice.reducer;
