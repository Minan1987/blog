import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUsers } from '../reducers/userSlice'
import Spinner from './Spinner'
import { LuUserRoundPen } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";

const UsersList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const users = useSelector((state) => state.users.users)
    const usersStatus = useSelector((state) => state.users.status)
    const error = useSelector((state) => state.users.error)

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])

    let content;
    if (usersStatus === "loading") {
        content = <Spinner />
    } else if (usersStatus === "completed") {
        if (users.length > 0) {
            content = users.map((user) => (
                <li key={user.id} className='list-group-item'>
                    <Link to={`/users/${user.id}`}> {user.fullname} </Link>
                </li>
            ))
        } else {
            content = <p>نویسندگانی یافت نشدند</p>
        }
    } else if (usersStatus === "failed") {
        content = <div>{error}</div>
    }

    return (
        <div className='container text-center'>
            <div className="row justify-content-center mt-5">
                <div className="col-12 text-center">
                    <button onClick={()=> navigate("/create-user")} className='btn btn-primary'><GoPlusCircle /> افزودن نویسنده جدید</button>
                </div>
            </div>
            
            <div className="row justify-content-center">
            <h3 className='my-5'><LuUserRoundPen /> اسامی نویسندگان:</h3>
                <div className="col-12 col-sm-6">
                    <ul className='list-group list-group text-start'>
                        {content}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default UsersList
