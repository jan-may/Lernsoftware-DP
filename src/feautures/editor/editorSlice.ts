import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ioState {
  code: string;
  showCompilerInfo: boolean;
  isLoading: boolean;
}

const initialState: ioState = {
  code: "",
  showCompilerInfo: false,
  isLoading: false,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCode, setShowCompilerInfo, setIsLoading } =
  editorSlice.actions;
export default editorSlice.reducer;
