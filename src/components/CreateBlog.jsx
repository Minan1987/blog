import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { selectAllUsers } from '../reducers/userSlice';
import { useAddNewBlogMutation } from '../api/apiSlice';

const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [userId, setUserId] = useState("");

    const [addNewBlog, { isLoading }] = useAddNewBlogMutation()

    const navigate = useNavigate();

    const users = useSelector(state => selectAllUsers(state))

    const onSelectAuthor = e => setUserId(e.target.value)

    const canSubmit = [title, content, userId].every(Boolean) && !isLoading;

    //افزودن تصویر به دیتا هنگام ارسال فرم
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const handleSubmitForm = async () => {
        if (canSubmit) {
            try {
                let imageBase64 = "";
                if (image) {
                    imageBase64 = await convertToBase64(image);
                }

                await addNewBlog({
                    id: nanoid(),
                    date: new Date().toISOString(),
                    title,
                    content,
                    user: userId,
                    image: imageBase64,
                    reactions: {
                        like: 0,
                        favorite: 0,
                        view: 0
                    },

                }).unwrap()
                setTitle("");
                setContent("");
                setImage(null)
                setUserId("");
                navigate("/");
            } catch (err) {
                console.error("Failed to save the blog", err);

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
                            <label className='form-label'>تصویر مقاله:</label>
                            <input
                                type="file"
                                className='form-control mb-3'
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
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
