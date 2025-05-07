import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectAllUsers, useDeleteuserMutation } from '../reducers/userSlice'
import Swal from 'sweetalert2'
import { LuUserRoundPen } from "react-icons/lu";
import { GoPlusCircle } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

const UsersList = () => {
    const navigate = useNavigate()

    const users = useSelector(selectAllUsers)
    const [deleteUser] = useDeleteuserMutation()


    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'آیا مطمئنی؟',
            text: 'این نویسنده برای همیشه حذف خواهد شد!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'بله، حذف کن!',
            cancelButtonText: 'لغو'
        })
    
        if (result.isConfirmed) {
            try {
                await deleteUser(id)
                Swal.fire('حذف شد!', 'نویسنده با موفقیت حذف شد.', 'success')
            } catch (err) {
                Swal.fire('خطا!', 'مشکلی در حذف پیش آمد.', 'error')
            }
        }
    }
    


    const renderedUsers = users.map((user) => (
        <li key={user.id} className='list-group-item d-flex justify-content-between'>
            <Link to={`/users/${user.id}`}> {user.fullname} </Link>
            <button
                onClick={() => handleDelete(user.id)}
                className='btn btn-danger'>
                <MdDeleteOutline style={{ fontSize: "20px" }} />
            </button>
        </li>
    ))

    return (
        <div className='container text-center'>
            <div className="row justify-content-center mt-5">
                <div className="col-12 text-center">
                    <button onClick={() => navigate("/create-user")} className='btn btn-primary'><GoPlusCircle /> افزودن نویسنده جدید</button>
                </div>
            </div>
            <div className="row justify-content-center">
                <h3 className='my-5'><LuUserRoundPen /> اسامی نویسندگان:</h3>
                <div className="col-12 col-sm-6">
                    <ul className='list-group list-group text-start'>
                        {renderedUsers}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UsersList
