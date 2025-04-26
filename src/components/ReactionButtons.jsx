import React from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../reducers/blogSlice';
const reactionIcons = {
    like: <AiOutlineLike />,
    favorite: <MdFavoriteBorder />,
    view: <FaRegEye />
}

const ReactionButtons = ({ blog }) => {
    const dispatch = useDispatch();
    const reactionButtons = Object.entries(reactionIcons).map(([emojiName, emoji]) => {
        return (
            <button className='border-0 bg-transparent text-primary'
                key={emojiName}
                onClick={() => dispatch(reactionAdded({ blogId: blog.id, reaction: emojiName }))}>
                {emoji} {blog.reactions[emojiName]}
            </button>
        )
    })
    return (
        <div>
            {reactionButtons}
        </div>
    )
}

export default ReactionButtons
