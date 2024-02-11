import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TourState {
  accordionOpen: string[];
  isTourRunning: boolean;
}

const initialState: TourState = {
  accordionOpen: [""],
  isTourRunning: false,
};

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setAccordionOpen: (state, action: PayloadAction<string[]>) => {
      state.accordionOpen = action.payload;
    },
    setIsTourRunning: (state, action: PayloadAction<boolean>) => {
      state.isTourRunning = action.payload;
    },
  },
});

export const { setAccordionOpen, setIsTourRunning } = tourSlice.actions;
export default tourSlice.reducer;
