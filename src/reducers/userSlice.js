import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { createUser, getAllUsers, deleteUser } from "../services";


const userAdaptor = createEntityAdapter()
const initialState = userAdaptor.getInitialState({
    status: 'idle',
    error: null
})

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

// const initialState = {
//     users: [],
//     status: 'idle',
//     error: null
// }

const userSlice = createSlice(
    {
        name: 'users',
        initialState: initialState,
        reducers: {},
        extraReducers(builder) {
            builder

                .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
                .addCase(addNewUser.fulfilled, userAdaptor.addOne)
                .addCase(removeUser.fulfilled, userAdaptor.removeOne)

                // .addCase(fetchUsers.fulfilled, (state, action) => {
                //     state.status = "completed"
                //     state.users = action.payload
                // })
                // .addCase(fetchUsers.pending, (state) => {
                //     state.status = "loading"
                // })
                // .addCase(addNewUser.fulfilled, (state, action) => {
                //     state.users.push(action.payload)
                // })
                // .addCase(fetchUsers.rejected, (state, action) => {
                //     state.status = "failed"
                //     state.error = action.error.message
                // })
                // .addCase(removeUser.fulfilled, (state, action) => {
                //     state.users = state.users.filter((user) => user.id !== action.payload)
                // })
        }
    }
)

//Selectors
// export const selectAllUsers = (state) => state.users.users;
// export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === (userId))

//Selectors for Normalized Data
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdaptor.getSelectors(state => state.users)

export default userSlice.reducer