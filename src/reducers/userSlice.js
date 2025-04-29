import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getAllUsers, deleteUser } from "../services";

export const fetchUsers = createAsyncThunk(
    "/users/fetchUsers",
    async () => {
        const response = await getAllUsers();
        return response.data;
    }
)
export const addNewUser = createAsyncThunk(
    "/users/addNewUser",
    async (initialUser) => {
        const response = await createUser(initialUser)
        return response.data
    }
)
export const removeUser = createAsyncThunk(
    "/users/deleteUser",
    async (initialUserId) => {
        await deleteUser(initialUserId)
        return initialUserId
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
                .addCase(addNewUser.fulfilled, (state, action) => {
                    state.users.push(action.payload)
                })
                .addCase(removeUser.fulfilled, (state, action) => {
                    state.users = state.users.filter((user) => user.id !== action.payload)
                })
        }
    }
)

//Selectors
export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === (userId))

export default userSlice.reducer