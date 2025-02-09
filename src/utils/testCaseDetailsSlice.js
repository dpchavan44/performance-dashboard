import { createSlice } from "@reduxjs/toolkit";


const testCaseDetailsSlice = createSlice({
    name: "testCaseDetails",
    initialState: {
        testDetails: [],
    },
    reducers: {
        setTestCaseDetails: (state, action) => {
            state.testDetails = action.payload;
        },
        clearTestCaseDetails: (state) => {
            state.testDetails = [];
        },
    },
});

export const { setTestCaseDetails, clearTestCaseDetails } = testCaseDetailsSlice.actions;

export default testCaseDetailsSlice.reducer;