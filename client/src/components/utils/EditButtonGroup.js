import React from "react";
import {
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

//TO ADD: add a parameter which takes in the appropriate save function required for that section
// Handles the toggling of the edit/save/cancel buttons
export default function ButtonGroup ({ isEditable, toggleEdit }) {
    const handleEdit = () => {
        toggleEdit(!isEditable);
        // console.log("editing is " + isEditable);
    }
    return (
        <>
            {!isEditable && <IconButton onClick={handleEdit} aria-label="settings" >
                <EditIcon />
            </IconButton>}
            {isEditable && <>
                <IconButton onClick={handleEdit} aria-label="settings">
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleEdit} aria-label="settings">
                    <ClearIcon />
                </IconButton>
            </>}
        </>
    );
}