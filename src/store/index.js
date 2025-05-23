import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from '../reducers/blogSlice';
import usersReducer, { extendedApiSlice } from '../reducers/userSlice'
import { apiSlice } from "../api/apiSlice"

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        users: usersReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
console.log(extendedApiSlice.endpoints.getUsers)

