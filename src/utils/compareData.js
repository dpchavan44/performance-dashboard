import { createSlice } from "@reduxjs/toolkit";


const compareData = createSlice({
    name: "compareData",
    initialState: {
        data: [],
        filterOption :[]
    },
    reducers: {
        setCompareData: (state, action) => {
            state.data = action.payload;
        },
        clearCompareData: (state) => {
            state.data = [];
        },
        addFilterOption: (state, action) => {
            state.filterOption.push(action.payload);
        },
        setFilterOption: (state, action) => {
            state.filterOption = [];
            state.filterOption = action.payload;
        },
        clearFilterOption: (state) => {
            state.filterOption = [];
        },
        //add action to delete one object from the filterOption array which matches the key value pair
        deleteFilterOption: (state, action) => {
            state.filterOption = state.filterOption.filter((option) => option[action.payload.key] !== action.payload.value);
        }
    },
});

export const { setCompareData, clearCompareData, setFilterOption, clearFilterOption,addFilterOption } = compareData.actions;
export default compareData.reducer;