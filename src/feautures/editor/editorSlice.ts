import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ioState {
  code: string;
}

const initialState: ioState = {
  code: "",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
});

export const { setCode } = editorSlice.actions;
export default editorSlice.reducer;
