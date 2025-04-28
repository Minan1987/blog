import React from 'react';
import { useSelector } from 'react-redux';

const ShowAuthor = ({ userId }) => {
    const author = useSelector(state => state.users.users.find(user => user.id === userId))
    return (
        <span>
            نویسنده : {author ? author.fullname : "نویسنده ناشناس"}
        </span>
    )
}

export default ShowAuthor
