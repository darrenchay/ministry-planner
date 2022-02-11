import "./Comments.scss";
import * as dateFormatter from '../../utils/ConvertDate';
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button, Menu, MenuItem, IconButton } from '@material-ui/core';
import cloneDeep from "lodash/cloneDeep";
import * as ResourceAPI from '../../utils/Services/ResourcesAPI';
import * as UserAPI from "../../utils/Services/UsersAPI";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

export default function Comment({ comment, resource }) {

    const [userName, setUserName] = useState()
    // const [userPicture, setUserPicture] = useState()
    const loggedinUserData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedinInUser = (loggedinUserData._id === comment.user) ? true : false
    const [show, setShow] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    useEffect(() => {
        UserAPI.getUser(comment.user)
        .then((userData) => {
            setUserName(userData.firstname + " " + userData.lastname)
            // setUserPicture(userData.profileImage)
        })
    }, [])

    const handleDeleteComment = () => {
        var tempResource = cloneDeep(resource);
        var idx = resource.comments.indexOf(comment)
        if (idx !== -1) {
            tempResource.comments.splice(idx, 1);
            //     setSelectedEvent(tempEvent);
        }
        ResourceAPI.updateResource(tempResource, resource._id)
            .then(resp => {
                console.log('Successfully deleted comment', resp);
            })
            .catch(err => {
                console.log("Error while deleting comment", err);
            });
    }

    const handleEditComment = () => {
        console.log("loggedinuser id: ", loggedinUserData._id)
        console.log("comment user id: ", comment)
        
        // var tempResource = cloneDeep(resource);
        // var idx = resource.comments.indexOf(comment)
        // if (idx !== -1) {
        //     tempResource.comments.splice(idx, 1);
        //     //     setSelectedEvent(tempEvent);
        // }
        // ResourceAPI.updateResource(tempResource, resource._id)
        //     .then(resp => {
        //         console.log('Successfully edited comment', resp);
        //     })
        //     .catch(err => {
        //         console.log("Error while edit comment", err);
        //     });
    }

    return (
        <div className="comment">
            <Avatar
                // src={userPicture}
                className="comment-image-container"
            />
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author-date">
                        {userName} - {dateFormatter.formatDateComment(comment.timestamp)}
                    </div>
                    {isLoggedinInUser &&
                        <IconButton
                            className="menu-button"
                            size="small"
                            onClick={handleClick}
                        >
                            <MoreHoriz fontSize="small" />
                        </IconButton>
                    }
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                        <MenuItem onClick={handleEditComment}>Edit</MenuItem>
                    </Menu>
                </div>
                <div className="comment-text"> {comment.comment} </div>
            </div>
        </div>
    );
}

