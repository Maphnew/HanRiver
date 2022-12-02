import { createSlice } from "@reduxjs/toolkit";

export const metaClassSlice = createSlice({
    name: "metaClass",
    initialState: {
        classes: [],
        properties: [],
        selectedClass: undefined,
    },
    reducers: {
        setClasses: (state, action) => {
            state.classes = action.payload;
        },
        setProperties: (state, action) => {
            state.properties = action.payload;
        },
        setSelectedClass: (state, action) => {
            state.selectedClass = action.payload;
        },
    },
});

export const { setClasses, setProperties, setSelectedClass } = metaClassSlice.actions;

export default metaClassSlice.reducer;
