import axios from "axios";

const SERVER_URL = "http://localhost:9000";

//@desc Get all users
//@route Get http://localhost:9000/users
export const getAllUsers = () => {
    const url = `${SERVER_URL}/users`
    return axios.get(url)
}


//@desc Get all blogs
//@route Get http://localhost:9000/blogs
export const getAllBlogs = () => {
    const url = `${SERVER_URL}/blogs`
    return axios.get(url)
}


//@desc Get user with user id
//@route Get http://localhost:9000/users/userId
export const getUser = (userId) => {
    const url = `${SERVER_URL}/users/${userId}`
    return axios.get(url)
}


//@desc Get blog with blog id
//@route Get http://localhost:9000/blog/blogId
export const getBlog = (blogId) => {
    const url = `${SERVER_URL}/blogs/${blogId}`
    return axios.get(url)
}


//@desc Create blog
//@route Post http://localhost:9000/blogs
export const createBlog = (blog) => {
    const url = `${SERVER_URL}/blogs`
    return axios.post(url, blog)
}


//@desc Update blog with blod id
//@route Put http://localhost:9000/blog/blogId
export const updateBlog = (blog, blogId) => {
    const url = `${SERVER_URL}/blogs/${blogId}`
    return axios.put(url, blog)
}


//@desc Delete blog with blog id
//@route Delete http://localhost:9000/blog/blogId
export const deleteBlog = (blogId) => {
    const url = `${SERVER_URL}/blogs/${blogId}`
    return axios.delete(url)
}