import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewUser } from '../reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

const CreateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState("")

    const canSubmit = Boolean(user)
    const handleSubmitForm = async () => {
        if (canSubmit) {
            try {
               await dispatch(addNewUser({
                 id: nanoid(), 
                 fullname: user
                 }))
                navigate("/users")
            } catch (err) {
                console.error("Failed to save the user", err);
            }

        }
    }
    return (
        <div className='container'>
            <div className="row justify-content-center my-5">
                <div className="col-xs-12 col-md-6 p-3 border rounded shadow-sm">
                    <form autoComplete='off'>
                        <div className="w-100">
                            <label htmlFor='user' className='form-label'>نام نویسنده:</label>
                            <input
                                type="text"
                                id='user'
                                name="user"
                                className='form-control mb-3'
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div className='w-100 d-flex justify-content-end'>
                            <button
                                type="button"
                                onClick={handleSubmitForm}
                                className="btn btn-outline-primary my-5"
                                disabled={!canSubmit}
                            >
                                افزودن نویسنده
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser
