import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlogFromApi, selectBlogById } from '../reducers/blogSlice';
import ShowDate from './ShowDate';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import ShowAuthor from './ShowAuthor';
import Swal from 'sweetalert2'

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
    Swal.fire({
      title: 'آیا مطمئنی؟',
      text: 'این بلاگ حذف خواهد شد!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'بله، حذف کن!',
      cancelButtonText: 'لغو'
    }).then((result) => {
      if (result.isConfirmed) {
        if (blog) {
          dispatch(deleteBlogFromApi(blog.id));  // حذف بلاگ
          navigate("/");  // هدایت به صفحه اصلی
          Swal.fire(
            'حذف شد!',
            'بلاگ با موفقیت حذف شد.',
            'success'
          );
        }
      }
    })
  }

  return (
    <div key={blog.id} className="col-xs-12 m-3">
      <div key={blog.id} className="col-12 mb-4">
        <div className="card post-card">
          <img src={blog.image} className="card-img-top post-img" alt={blog.title} style={{ width: "100%", height: "400px" }} />
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <h6 className='card-title fs-6'></h6>
            <p className="card-text text-muted">{blog.content}</p>
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
