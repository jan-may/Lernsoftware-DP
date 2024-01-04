import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ActivButton {
    "problem",
    "recursiveTree",
    "topDownMemo",
    "bottomUp",
}


    
    

interface NavbarState {
    activeButton: ActivButton
}

const initialState: NavbarState = {
    activeButton: ActivButton.problem,
};

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setActive : (state, action: PayloadAction<ActivButton>) => {
            state.activeButton = action.payload;
        }
    },
});

export const { setActive} = navbarSlice.actions;
export default navbarSlice.reducer;