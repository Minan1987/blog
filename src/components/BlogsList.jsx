import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ShowDate from './ShowDate';
import ShowAuthor from './ShowAuthor';
import ReactionButtons from './ReactionButtons';
import { fetchBlogs, selectAllBlogs } from '../reducers/blogSlice';
import Spinner from './Spinner';

const BlogsList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const blogs = useSelector(selectAllBlogs);
    const blogStatus = useSelector((state) => state.blogs.status)
    const error = useSelector((state) => state.blogs.error)

    useEffect(() => {
        if (blogStatus === 'idle') {
            dispatch(fetchBlogs())
        }
    }, [blogStatus, dispatch])

    let content;
    if (blogStatus === 'loading') {
        content = <Spinner />
    } else if (blogStatus === "completed") {
        const sortedBlogs = (blogs || [])
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));

        content = sortedBlogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card post-card">
                    <img src="https://www.horizonplant.com/wp-content/uploads/2017/05/placeholder-400x400.png" className="card-img-top post-img" alt={blog.title} />
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

    } else if (blogStatus === 'failed') {
        content = <div>{error}</div>
    }

    return (
        <div className='blogs container'>
            <div className="row my-5 justify-content-center">
                <button onClick={() => navigate("/blogs/create-blog")} className='btn btn-primary w-25'>ایجاد مقاله</button>
            </div>
            <h2 className='m-5 text-center'>نمایش تمامی پست ها:</h2>
            <div className="row d-flex justify-content-start align-items-center">
                {content}
            </div>
        </div>
    )
}

export default BlogsList
