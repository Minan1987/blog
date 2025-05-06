import React, { useMemo } from 'react';
import { useGetBlogsQuery } from '../api/apiSlice'
import { Link, useNavigate } from 'react-router-dom';
import ShowDate from './ShowDate';
import ShowAuthor from './ShowAuthor';
import ReactionButtons from './ReactionButtons';

import Spinner from './Spinner';

const BlogsList = () => {
    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBlogsQuery()

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        sortedBlogs.sort((a, b) => b.date.localeCompare(a.date))
        return sortedBlogs
    })

    const navigate = useNavigate()

    let orderedBlogs;
    if (isLoading) {
        orderedBlogs = <Spinner />
    } else if (isSuccess) {

        orderedBlogs = sortedBlogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card post-card">
                    <img src={blog.image} className="card-img-top post-img" alt={blog.title} style={{ width: "100%", height: "400px" }} />
                    <div className="card-body">
                        <h5 className="title card-title">{blog.title}</h5>
                        <p className="content card-text text-muted">{blog.content.substring(0, 100)}</p>
                        <div className="d-flex">
                            <div className="w-50 text-start">
                                <h6 style={{ color: "#777", fontSize: "12px", marginLeft: "20px" }}><ShowDate timestamp={blog.date} /></h6>
                                <h6 style={{ color: "#777", fontSize: "12px" }}><ShowAuthor userId={blog.user} /></h6>
                            </div>
                            <div className="w-50 text-end">
                                <ReactionButtons blog={blog} />
                            </div>
                        </div>
                        <div className="w-100 d-flex justify-content-end my-3">
                            <Link to={`/blogs/${blog.id}`} className="btn btn-outline-primary btn-sm">ادامه مطلب</Link>
                        </div>
                    </div>
                </div>
            </div>
        ))

    } else if (isError) {
        orderedBlogs = <div>{error}</div>
    }

    return (
        <div className='blogs container'>
            <div className="row my-5 justify-content-center">
                <button onClick={() => navigate("/create-blog")} className='btn btn-primary w-25'>ایجاد مقاله</button>
            </div>
            <h2 className='m-5 text-center'>نمایش تمامی پست ها:</h2>
            <div className="row d-flex justify-content-start align-items-center">
                {orderedBlogs}
            </div>
        </div>
    )
}

export default BlogsList
