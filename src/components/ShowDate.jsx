import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns-jalali';

const ShowDate = ({ timestamp }) => {
    let timeAgo = "";
    if(timestamp){
        const date = parseISO(timestamp);
        const time = formatDistanceToNow(date);
        timeAgo = `${time} پیش`
    }
  return (
        <span>
            <i>{timeAgo}</i>
        </span>
    )
}

export default ShowDate
