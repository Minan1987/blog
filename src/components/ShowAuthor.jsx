import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from '../reducers/userSlice';

const ShowAuthor = ({ userId }) => {
    const author = useSelector(state => selectUserById(state, userId));
    return (
        <span>
            نویسنده : {author ? author.fullname : "نویسنده ناشناس"}
        </span>
    )
}

export default ShowAuthor
