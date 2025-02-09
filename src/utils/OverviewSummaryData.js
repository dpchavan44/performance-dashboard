import { createSlice } from "@reduxjs/toolkit";

const overviewSummaryData = createSlice({
    name: "overviewSummaryData",
    initialState: {
        data: [],
    },
    reducers: {
        setOverviewSummaryData: (state, action) => {
            state.data = action.payload;
        },
        clearOverviewSummaryData: (state) => {
            state.data = [];
        }
    }
});

export const { setOverviewSummaryData, clearOverviewSummaryData } = overviewSummaryData.actions;
export default overviewSummaryData.reducer;