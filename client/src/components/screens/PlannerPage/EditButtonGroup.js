import React from "react";
import {
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import * as EventsAPI from './../../utils/Services/EventsAPI'

//TO ADD: add a parameter which takes in the appropriate save function required for that section
// Handles the toggling of the edit/save/cancel buttons
export default function ButtonGroup({ isEditable, toggleEdit, type, data, updateData, originalData, updateOriginalData }) {
    const handleEdit = () => {
        toggleEdit(!isEditable);
    }

    const handleSave = () => {
        if (type.toLowerCase() === "event") {
            EventsAPI.updateEvent(data, data._id)
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " event");
                })
                .catch(err => {
                    console.log(err)
                });
        }
        toggleEdit(false);
        // Updating original data and selected data
        updateOriginalData(data);
    }

    // If you cancel, reverts the changes you made back to original data
    const handleCancel = () => {
        console.log(originalData);
        console.log('cached Data');
        console.log(data);
        updateData(originalData);
        toggleEdit(false);
    }
    return (
        <>
            {!isEditable && <IconButton onClick={handleEdit} aria-label="settings" >
                <EditIcon />
            </IconButton>}
            {isEditable && <>
                <IconButton onClick={handleSave} aria-label="settings">
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleCancel} aria-label="settings">
                    <ClearIcon />
                </IconButton>
            </>}
        </>
    );
}