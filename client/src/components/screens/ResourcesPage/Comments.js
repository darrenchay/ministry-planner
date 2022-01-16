import "./Comments.scss";
import * as dateFormatter from '../../utils/ConvertDate';
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";


export default function Comment({ commentObj }) {

    const [comment, setComment] = useState(commentObj);

    useEffect(() => {
        setComment(commentObj)
        // console.log("TEST: ", commentObj)
        // console.log("commentasdasdasds: ", comments) 
        // console.log("comment length: ", comment.length)
    }, [commentObj])

    return (  //check if object parameters are empty
        <div className="comment">
            <Avatar
                alt={comment.user}
                // src= './/insertprofilepicturehere.png'
                className="comment-image-container"
            />
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author-date">
                        {comment.user} - {dateFormatter.formatDateComment(comment.timestamp)}
                    </div>
                </div>
                <div className="comment-text"> {comment.comment} </div>
            </div>
            {/* <div key={comment.commentId}>   | </div> */}
        </div>
    );
}

