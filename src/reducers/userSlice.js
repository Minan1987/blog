import { createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { createUser, getAllUsers, deleteUser } from "../services";
import { apiSlice } from "../api/apiSlice";

//Useing createEntityAdaptor Api for Normalized Data
const userAdapter = createEntityAdapter()
const initialState = userAdapter.getInitialState({
    status: 'idle',
    error: null
})

//RTK Query
export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            transformResponse: (responseData) => {
                return userAdapter.setAll(initialState, responseData)
            },
            providesTags: ["USER"]
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`
            }),
            providesTags: ["USER"]
        }),
        addNewUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["USER"]
        }),
        deleteuser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["USER"]
        })
    })
})

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()




// export const fetchUsers = createAsyncThunk(
//     "/users/fetchUsers",
//     async () => {
//         const response = await getAllUsers();
//         return response.data;
//     }
// )
// export const addNewUser = createAsyncThunk(
//     "/users/addNewUser",
//     async (initialUser) => {
//         const response = await createUser(initialUser)
//         return response.data
//     }
// )
// export const removeUser = createAsyncThunk(
//     "/users/deleteUser",
//     async (initialUserId) => {
//         await deleteUser(initialUserId)
//         return initialUserId
//     }
// )

// const initialState = {
//     users: [],
//     status: 'idle',
//     error: null
// }
const emptyUsers = []

const userSlice = createSlice(
    {
        name: 'users',
        initialState: [],
        reducers: {},
        // extraReducers(builder) {
        //     builder

        //         .addCase(fetchUsers.fulfilled, userAdapter.setAll)
        //         .addCase(addNewUser.fulfilled, userAdapter.addOne)
        //         .addCase(removeUser.fulfilled, userAdapter.removeOne)

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
        //         // })
        // }
    }
)

//Selectors
// export const selectAllUsers = (state) => state.users.users;
// export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === (userId))


//Getting normalized data from cash:
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResult) => usersResult.data
)
//Selectors for Normalized Data
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)

//Selectors by RTK QUERY
// export const selectAllUsers = createSelector(
//     selectUsersResult,
//     userResult => userResult?.data ?? emptyUsers
// )
// export const selectUserById = createSelector(
//     selectAllUsers, (state, userId) => userId,
//     (users, userId) => users.find(user => user.id === userId)
// )


export const { useGetUsersQuery, useGetUserQuery, useAddNewUserMutation, useDeleteuserMutation } = extendedApiSlice
export default userSlice.reducer