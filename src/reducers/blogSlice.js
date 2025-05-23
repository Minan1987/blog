import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../services";

//Create Normalized Data
const blogAdaptor = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = blogAdaptor.getInitialState({
    // blogs: [],
    status: "idle",
    error: null
})
console.log(initialState)
//Now state is: {id:[], entities:{}, status:"idle", error:null}

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
    const response = await getAllBlogs()
    return response.data
})
export const addNewBlog = createAsyncThunk("/blogs/addNewBlog", async (initialBlog) => {
    const response = await createBlog(initialBlog)
    return response.data
})
export const deleteBlogFromApi = createAsyncThunk("/blogs/deleteBlogFromapi", async (initialBlogId) => {
    await deleteBlog(initialBlogId)
    return initialBlogId
})
export const updateBlogApi = createAsyncThunk("/blogs/updateBlogApi", async (initialBlog) => {
    const response = await updateBlog(initialBlog, initialBlog.id)
    return response.data
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
        // blogAdded: {
        //     reducer(state, action) {
        //         state.blogs.push(action.payload)
        //     },
        //     prepare(title, content, userId) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 date: new Date().toISOString(),
        //                 title,
        //                 content,
        //                 user: userId,
        //                 reactions: {
        //                     like: 0,
        //                     favorite: 0,
        //                     view: 0
        //                 }
        //             }
        //         }
        //     }
        // },
        // blogEdited: {
        //     reducer(state, action) {
        //         const { id, title, content } = action.payload;
        //         const existingBlog = state.blogs.find((blog) => blog.id === id);
        //         if (existingBlog) {
        //             existingBlog.title = title;
        //             existingBlog.content = content;
        //         }
        //     }
        // },

        // blogDeleted: {
        //     reducer(state, action) {
        //         const { id } = action.payload;
        //         state.blogs = state.blogs.filter(blog => blog.id !== id)
        //     }
        // },
        reactionAdded: {
            reducer(state, action) {
                const { blogId, reaction } = action.payload;
                const existingBlog = state.entities[blogId]
                if (existingBlog) {
                    existingBlog.reactions[reaction]++;
                }
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed"
                // state.blogs = action.payload
                blogAdaptor.upsertMany(state, action.payload)
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

            // .addCase(addNewBlog.fulfilled, (state, action) => {
            //      state.blogs.push(action.payload)
            // })
            .addCase(addNewBlog.fulfilled, blogAdaptor.addOne)

            // .addCase(deleteBlogFromApi.fulfilled, (state, action) => {
            //     state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
            // })
            .addCase(deleteBlogFromApi.fulfilled, blogAdaptor.removeOne)

            // .addCase(updateBlogApi.fulfilled, (state, action) => {
            //      const updatedBlogIndex = state.blogs.findIndex((blog) => blog.id === action.payload.id)
            //      state.blogs[updatedBlogIndex] = action.payload
            // })
            .addCase(updateBlogApi.fulfilled, blogAdaptor.updateOne)
    }
})

//Selectors
// export const selectAllBlogs = (state) => state.blogs.blogs
// export const selectBlogById = (state, blogId) => state.blogs.blogs.find((blog) => blog.id === (blogId))


//Selectors for normalized data:
export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogById,
    selectIds: selectBlogsIds
} = blogAdaptor.getSelectors((state) => state.blogs)

export const selectUserBlogs = createSelector(
    [selectAllBlogs, (_, userId) => userId],
    (blogs, userId) => blogs.filter((blog) => blog.user === userId)
);

//actions
export const { blogAdded, blogEdited, blogDeleted, reactionAdded } = blogSlice.actions;

export default blogSlice.reducer