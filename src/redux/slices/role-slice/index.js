import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
    name: "role",
    initialState: {
        roles: [],
        selectedRole: undefined,
    },
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setSelectedRole: (state, action) => {
            state.selectedRole = action.payload;
        },
    },
});

export const { setRoles, setSelectedRole } = roleSlice.actions;

export default roleSlice.reducer;
