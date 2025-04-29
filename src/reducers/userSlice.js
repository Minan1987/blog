import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services";

export const fetchUsers = createAsyncThunk(
    "/users/fetchUsers",
    async () => {
        const response = await getAllUsers();
        return response.data;
    }
)

const initialState = {
    users: [],
    status: 'idle',
    error: null
}
const userSlice = createSlice(
    {
        name: 'users',
        initialState: initialState,
        reducers: {},
        extraReducers(builder) {
            builder
                .addCase(fetchUsers.pending, (state) => {
                    state.status = "loading"
                })
                .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.status = "completed"
                    state.users = action.payload
                })
                .addCase(fetchUsers.rejected, (state, action) => {
                    state.status = "failed"
                    state.error = action.error.message
                })

        }
    }
)

//Selectors
export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === (userId))

export default userSlice.reducer