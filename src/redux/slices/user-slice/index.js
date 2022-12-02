import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        selectedUserObjectId: undefined,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setSelectedUserObjectId: (state, action) => {
            state.selectedUserObjectId = action.payload;
        },
    },
});

export const { setUsers, setSelectedUserObjectId } = userSlice.actions;

export default userSlice.reducer;
