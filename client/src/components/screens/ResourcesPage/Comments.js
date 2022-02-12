import "./Comments.scss";
import * as dateFormatter from '../../utils/ConvertDate';
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button, TextField, Menu, MenuItem, IconButton } from '@material-ui/core';
import cloneDeep from "lodash/cloneDeep";
import * as ResourceAPI from '../../utils/Services/ResourcesAPI';
import * as UserAPI from "../../utils/Services/UsersAPI";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

export default function Comment({ comment, resource }) {

    const [userName, setUserName] = useState()
    // const [userPicture, setUserPicture] = useState()
    const [isEditable, setIsEditable] = useState(false);
    const loggedinUserData = JSON.parse(localStorage.getItem('userData'));
    const [anchorEl, setAnchorEl] = React.useState(null);
    var isLoggedinInUser = (loggedinUserData._id === comment.user) ? true : false
    const [editedComment, setEditedComment] = useState(cloneDeep(comment.comment));

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
    }, )

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
        setIsEditable(true);
    }

    const handleConfirm = () => {
        var tempResource = cloneDeep(resource);
        var idx = resource.comments.indexOf(comment)
        if (editedComment?.length > 0) {
            if (idx !== -1) {
                tempResource.comments[idx].comment = editedComment;
                tempResource.comments[idx].edited = true;
            }
            ResourceAPI.updateResource(tempResource, resource._id)
                .then(resp => {
                    console.log('Successfully edited comment', resp);
                })
                .catch(err => {
                    console.log("Error while editing comment", err);
                });
            setIsEditable(false)
            setAnchorEl(false)
        }
    }

    const handleCancel = () => {
        setIsEditable(false);
        setAnchorEl(false)  //had to put this because for some reason pressing cancel open menu
    }

    return (
        <div className="comment">
            <Avatar
                // src={userPicture}
                className="comment-image-container"
            />
            {!isEditable &&
                <div className="comment-right-part">
                    <div className="comment-header">
                        <div className="comment-author-date">
                            {userName} - {dateFormatter.formatDateComment(comment.timestamp)} {(comment.edited) ? "(edited)" : ""}
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
            }
            {isEditable &&
                <div className="comment-editable-right-part">
                    <div className="comment-text-post">
                        <TextField
                            className="comment-editable-text"
                            multiline
                            rows={1}
                            maxRows={5}
                            InputProps={{
                                disableUnderline: true,
                                style: { fontSize: 14, fontWeight: "bold" },
                            }}
                            onChange={(e) => setEditedComment(e.target.value)}
                            value={editedComment}
                        />
                        <Button className="post-button" onClick={handleConfirm}>Post</Button>
                    </div>
                    <div>
                        <Button className="cancel-button" onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            }
        </div>
    );
}

