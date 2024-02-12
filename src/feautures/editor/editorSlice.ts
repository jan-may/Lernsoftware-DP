import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ioState {
  code: string;
  showCompilerInfo: boolean;
}

const initialState: ioState = {
  code: "",
  showCompilerInfo: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setShowCompilerInfo: (state, action: PayloadAction<boolean>) => {
      state.showCompilerInfo = action.payload;
    },
  },
});

export const { setCode, setShowCompilerInfo } = editorSlice.actions;
export default editorSlice.reducer;
