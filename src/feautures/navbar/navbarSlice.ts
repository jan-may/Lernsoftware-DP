import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface NavbarState {
    active: string
}

const initialState: NavbarState = {
    active: "problem"
};

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setActive : (state, action: PayloadAction<string>) => {
            state.active = action.payload;
        }
    },
});

export const { setActive} = navbarSlice.actions;
export default navbarSlice.reducer;