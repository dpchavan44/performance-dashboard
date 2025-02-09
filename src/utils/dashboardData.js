import { createSlice } from "@reduxjs/toolkit";

const dashboardData = createSlice({
    name: "dashboardData",
    initialState: {
        data: [],
    },
    reducers: {
        setDashboardData: (state, action) => {
            state.data = action.payload;
        },
        clearDashboardData: (state) => {
            state.data = [];
        },
        updateComment: (state, action) => { //update the comment in the state for given module and use case, this will helpfull if user updates the comment in the UI which is not at home page(no need to visit home and refresh)
            const { moduleName, scenarioId, newComment,useCaseName } = action.payload;
            const module = state.data[moduleName];
            if (module) {
                const scenario = module.find(row => row[0] === scenarioId && row[2] === useCaseName);
                if (scenario) {
                    scenario[scenario.length - 1] = newComment;
                }
            }
        },
    },
});

export const { setDashboardData, clearDashboardData,updateComment } = dashboardData.actions;

export default dashboardData.reducer;