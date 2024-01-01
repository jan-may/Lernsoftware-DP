import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dimensions } from '../../types/TreeTypes';

interface SettingsState {
    theme: string;
    input: number;
    speed: number;
    memo: boolean;
    sidebarWidth: number;
    dimensions: Dimensions;
}

const initialState: SettingsState = {
    theme: 'dark',
    input: 5,
    speed: 100,
    memo: false,
    sidebarWidth: 320,
    dimensions: {
        verticalSpacing: 50,
        horizontalSpacing: 50,
        circleRadius: 20,
    }
};

export const settingsSlice = createSlice({
    name: 'settings',
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
        setMemo: (state, action: PayloadAction<boolean>) => {
            state.memo = action.payload;
        },
        setSidebarWidth: (state, action: PayloadAction<number>) => {
            state.sidebarWidth = action.payload;
        }
    },
});

export const { setTheme, setInput, setSpeed, setMemo, setSidebarWidth} = settingsSlice.actions;
export default settingsSlice.reducer;