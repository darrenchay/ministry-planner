import React from "react";
import cloneDeep from "lodash/cloneDeep";
import {
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import * as EventsAPI from './../../utils/Services/EventsAPI'

// Handles the toggling of the edit/save/cancel buttons
// On click edit, save a local version of the event
// Then when click update, take the copy of the event and send that as body, update original event to be the copy
// Then when click cancel, revert to original version of event
export default function ButtonGroup({ isEditable, toggleEdit, type, data, updateData, originalData, updateOriginalData }) {
    const handleEdit = () => {
        toggleEdit(!isEditable);
    }

    const handleSave = () => {
        if (type.toLowerCase() === "event") {
            EventsAPI.updateEvent(data, data._id)
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " event(s)");
                })
                .catch(err => {
                    console.log(err);
                    // Add error handler and do not make editable false, instead show an alert which says an error occured
                });
        } else if (type.toLowerCase() === "role") {
            EventsAPI.updateEventDetails(data, 'worship', 'role')
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " role(s)");
                })
                .catch(err => {
                    console.log(err);
                })
        } else if (type === "eventDetails") {
            var tempData = cloneDeep(data);
            delete tempData.teamList;
            delete tempData.teamMapping;
            EventsAPI.updateEventDetails(tempData, 'worship', 'eventDetails', data._id)
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " role(s)");
                })
                .catch(err => {
                    console.log(err);
                })
        }
        toggleEdit(false);
        updateOriginalData(data);
    }

    // If you cancel, reverts the changes you made back to original data
    const handleCancel = () => {
        updateData(originalData);
        toggleEdit(false);
    }
    return (
        <>
            {!isEditable && 
            <IconButton onClick={handleEdit} aria-label="settings" >
                <EditIcon />
            </IconButton>
            // To add a delete icon next to it as well (and delete only appears for event not role), for role its minimize instead of delete
            }
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