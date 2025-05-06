import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEditBlogMutation, useGetBlogQuery } from '../api/apiSlice';

const EditBlog = () => {
    const { blogId } = useParams();
    const navigate = useNavigate();

    const { data: blog } = useGetBlogQuery(blogId)
    const [updateBlog, { isLoading }] = useEditBlogMutation()

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        }
    }, [blog]);

    const handleSubmitForm = async () => {
        const editedBlog = {
            id: blogId,
            date: blog.date,
            title,
            content,
            user: blog.user,
            reactions: { ...blog.reactions }
        }
        if (title && content) {
            try {
                await updateBlog({ ...editedBlog }).unwrap();
                toast.success('مقاله با موفقیت ویرایش شد');
                navigate(`/blogs/${blogId}`);
            } catch (err) {
                toast.error('خطایی در ویرایش مقاله پیش آمد', err);
            }
        }
    }

    return (
        <div className='container'>
            <h2>ویرایش مقاله</h2>
            <div className="row justify-content-center my-5">
                <div className="col-xs-12 col-md-6 p-3 border rounded shadow-sm">
                    <form autoComplete='off'>
                        <label className='form-label'>عنوان مقاله:</label>
                        <input
                            type="text"
                            className='form-control mb-3'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className='form-label'>محتوای مقاله:</label>
                        <input
                            type="text"
                            className='form-control'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className='w-100 d-flex justify-content-end'>
                            <button type="button" onClick={handleSubmitForm} className="btn btn-outline-primary my-5" >ویرایش مقاله</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBlog
