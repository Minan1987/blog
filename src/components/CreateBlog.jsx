import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewBlog } from '../reducers/blogSlice';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [requestStatus, setRequestStatus] = useState('idle');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const users = useSelector(state => state.users)

    const onSelectAuthor = e => setUserId(e.target.value)
    const canSubmit = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const handleSubmitForm = async () => {
        if (canSubmit) {
            try {
                setRequestStatus('pending')
                await dispatch(addNewBlog({
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title,
                    content,
                    user: userId,
                    reactions: {
                        like: 0,
                        favorite: 0,
                        view: 0
                    },

                }))
                setTitle("");
                setContent("");
                setUserId("");
                navigate("/");
            } catch (err) {
                console.error("Failed to save the blog", err);

            } finally {
                setRequestStatus('idle')
            }
        }
    }

    return (
        <div className='container'>
            <div className="row justify-content-center my-5">
                <div className="col-xs-12 col-md-6 p-3 border rounded shadow-sm">
                    <form autoComplete='off'>
                        <div className="w-100">
                            <label className='form-label'>عنوان مقاله:</label>
                            <input
                                type="text"
                                className='form-control mb-3'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="w-100">

                            <label htmlFor='authorName'>نویسنده:</label>
                            <select id='authorName'
                                className='form-control mb-3'
                                value={userId}
                                onChange={onSelectAuthor}
                            >
                                <option value="">انتخاب نام نویسنده:</option>
                                {
                                    users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.fullname}
                                        </option>
                                    ))
                                }

                            </select>
                        </div>
                        <div className="w-100">
                            <label className='form-label'>محتوای مقاله:</label>
                            <input
                                type="text"
                                className='form-control'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className='w-100 d-flex justify-content-end'>
                            <button
                                type="button"
                                onClick={handleSubmitForm}
                                className="btn btn-outline-primary my-5"
                                disabled={!canSubmit}
                            >
                                ایجاد مقاله
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default CreateBlog
