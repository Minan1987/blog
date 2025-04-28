import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../reducers/userSlice'
import Spinner from './Spinner'

const UsersList = () => {
    const dispatch = useDispatch()

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
                <p key={user.id}>{user.fullname}</p>
            ))
        } else {
            content = <p>نویسندگانی یافت نشدند</p>
        }
    } else if (usersStatus === "failed") {
        content = <div>{error}</div>
    }

    return (
        <div>
            <h3>اسامی نویسندگان:</h3>
            {content}
        </div>
    )
}

export default UsersList
