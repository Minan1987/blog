import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../reducers/userSlice';
import { createSelector } from '@reduxjs/toolkit';
import { useGetBlogsQuery } from '../api/apiSlice';
// import { selectUserBlogs } from '../reducers/blogSlice';

const UserPage = () => {
    const { userId } = useParams();

    const user = useSelector(state => selectUserById(state, userId))
    // const userBlogs = useSelector(state => selectUserBlogs(state, userId))

    //Select from memoized result
    const selectUserBlogs = useMemo(() => {
        const emptyArray = []
        return createSelector(
            (res) => res.data, (res, userId) => userId,
            (data, userId) => data?.filter((blog) => blog.user === userId) ?? emptyArray
        )
    })
  
    const { userBlogs } = useGetBlogsQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            userBlogs: selectUserBlogs(result, userId)
        })
    })
    

    if (!user) {
        return <div>کاربر یافت نشد یا اطلاعات هنوز بارگذاری نشده است.</div>
    }

    return (
        <div className='container'>
            <h3>لیست مقالات {user.fullname} </h3>
            <ul className='list-group m-5'>
                {
                    userBlogs.length > 0 ? (
                        userBlogs.map((blog) => (
                            <Link key={blog.id} to={`/blogs/${blog.id}`}>
                                <li className='list-group-item'> {blog.title} </li>
                            </Link>
                        ))
                    )
                        :
                        (
                            <div>تا کنون پستی از این نویسنده منتشر نشده.</div>
                        )
                }
            </ul >
        </div>
    )
}

export default UserPage
