import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
    name: 'config',
    initialState: {
        isSideBarView: false,
    },
    reducers: {
        toggleSideBar: (state,action) => {
            state.isSideBarView = !action.payload;
        },
    },
});

export const { toggleSideBar } = configSlice.actions;
export default configSlice.reducer;