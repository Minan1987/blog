import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { createBlog, getAllBlogs } from "../services";

const initialState = {
    blogs: [],
    status: "idle",
    error: null
}

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
    const response = await getAllBlogs()
    return response.data
})
export const addNewBlog = createAsyncThunk("/blogs/addNewBlog", async (initialBlog) => {
    const response = await createBlog(initialBlog);
    return response.data;
})

const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer(state, action) {
                state.blogs.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            like: 0,
                            favorite: 0,
                            view: 0
                        }
                    }
                }
            }
        },
        blogEdited: {
            reducer(state, action) {
                const { id, title, content } = action.payload;
                const existingBlog = state.blogs.find((blog) => blog.id === id);
                if (existingBlog) {
                    existingBlog.title = title;
                    existingBlog.content = content;
                }
            }
        },

        blogDeleted: {
            reducer(state, action) {
                const { id } = action.payload;
                state.blogs = state.blogs.filter(blog => blog.id !== id)
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const { blogId, reaction } = action.payload;
                const existingBlog = state.blogs.find(blog => blog.id === blogId)
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
                console.log("Fetched Blogs:", action.payload);
                state.status = "completed"
                state.blogs = action.payload
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload)
            })
    }
})

//Selectors
export const selectAllBlogs = (state) => state.blogs.blogs
export const selectBlogById = (state, blogId) => state.blogs.blogs.find((blog) => blog.id === blogId)

//actions
export const { blogAdded, blogEdited, blogDeleted, reactionAdded } = blogSlice.actions;

export default blogSlice.reducer