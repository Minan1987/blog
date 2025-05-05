import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../reducers/userSlice';
import { selectUserBlogs } from '../reducers/blogSlice';

const UserPage = () => {
    const { userId } = useParams();

    const user = useSelector(state => selectUserById(state, userId))
    const userBlogs = useSelector(state => selectUserBlogs(state, userId))


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
