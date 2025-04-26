import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../services";


export const fetchUsers = createAsyncThunk(
    "/users/fetchUsers",
    async () => {
        const response = await getAllUsers();
        return response.data;
    }
)

const userSlice = createSlice(
    {
        name: 'users',
        initialState: [],
        reducers: {},
        extraReducers(builder) {
            builder.addCase(fetchUsers.fulfilled, (state, action)=>{
                return action.payload
            })

        }
    }
)

export default userSlice.reducer