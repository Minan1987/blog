import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlogFromApi, selectBlogById } from '../reducers/blogSlice';
import ShowDate from './ShowDate';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import ShowAuthor from './ShowAuthor';

const SingleBlog = () => {
  const { blogId } = useParams();

  const blog = useSelector((state) => selectBlogById(state, blogId));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!blog) {
    return (
      <section>
        <h2>پستی که دنبالش میگردی وجود نداره دوست من 🤗</h2>
      </section>
    );
  }

  const handleDelete = () => {
    if (blog) {
      dispatch(deleteBlogFromApi(blog.id))
      navigate("/");
    }
  }

  return (
    <div key={blog.id} className="col-xs-12 m-3">
      <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
        <div className="card post-card">
          <img src="https://www.horizonplant.com/wp-content/uploads/2017/05/placeholder-400x400.png" className="card-img-top post-img" alt={blog.title} />
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <h6 className='card-title fs-6'></h6>
            <p className="card-text text-muted">{blog.content.substring(0, 100)}</p>
            <div className="post-meta d-flex">
              <h6 style={{ color: "#777", fontSize: "12px", marginLeft: "20px" }}><ShowDate timestamp={blog.date} /></h6>
              <h6 style={{ color: "#777", fontSize: "12px" }}><ShowAuthor userId={blog.user} /></h6>
            </div>
            <div className="row justify-content-start aling-items-center">
              <div className="col-12">
                <button
                  onClick={() => navigate(`/edit-blog/${blogId}`)}
                  className='btn btn-warning'>
                  <MdOutlineEdit style={{ fontSize: "20px" }} />
                </button>
                <button
                  onClick={handleDelete}
                  className='btn btn-danger mx-3'>
                  <MdDeleteOutline style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBlog
