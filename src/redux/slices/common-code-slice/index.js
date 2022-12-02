import { createSlice } from "@reduxjs/toolkit";

export const commonCodeSlice = createSlice({
    name: "commonCode",
    initialState: {
        commonCodeData: [],
    },
    reducers: {
        setCommonCodeData: (state, action) => {
            state.commonCodeData = action.payload;
        },
    },
});

export const { setCommonCodeData } = commonCodeSlice.actions;

export default commonCodeSlice.reducer;
