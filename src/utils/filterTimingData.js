import { createSlice } from "@reduxjs/toolkit";

const filterTimingData = createSlice({
    name: "filterTimingData",
    initialState: {
        filterData: [],
    },
    reducers: {
        setFilterTimingData: (state, action) => {
            state.filterData = action.payload;
        },
        clearFilterTimingData: (state) => {
            state.filterData = [];
        },
    },
});

export const { setFilterTimingData, clearFilterTimingData} = filterTimingData.actions;
export default filterTimingData.reducer;