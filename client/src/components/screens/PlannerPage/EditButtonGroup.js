import './EditButtonGroup.scss';
import React, { useState } from "react";
import {
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import * as EventsAPI from './../../utils/Services/EventsAPI'

import ConfirmDelete from '../../utils/Components/ConfirmDelete';
import SnackBar from '../../utils/SnackBar';


// Handles the toggling of the edit/save/cancel buttons
// On click edit, save a local version of the event
// Then when click update, take the copy of the event and send that as body, update original event to be the copy
// Then when click cancel, revert to original version of event

export default function ButtonGroup({ isEditable, toggleEdit, event,
                                    updateSelectedEvent, originalData, updateOriginalData, setUpdateFlag }) {
    const [open, setOpen] = useState(false);
    const [snackBarData, setSnackBarData] = useState({});

    const handleEdit = () => {
        toggleEdit(!isEditable);
    };

    const handleSave = () => {
        // saving the event
        EventsAPI.updateEvent(event.event, event.event._id)
            .then(resp => {
                console.log("successfully updated " + resp.nModified + " event(s)");
                setSnackBarData({object:'event',action:'update',status:'success'});
            })
            .catch(err => {
                setSnackBarData({object:'event',action:'update',status:'error'});
                // Add error handler and do not make editable false, instead show an alert which says an error occured
            });

        // saving the eventDetails
        EventsAPI.updateEventDetails(event.eventDetails, 'worship', 'eventDetails', event.eventDetails._id)
            .then(resp => {
                console.log("successfully updated " + resp.nModified + " role(s)");
            })
            .catch(err => {
                console.log(err);
                setSnackBarData({object:'role',action:'update',status:'error'});
            })

        // saving the event's roles
        event.eventDetails.teamList.forEach(roleElem => {
            EventsAPI.updateEventDetails(roleElem, 'worship', 'role')
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " role(s)");
                })
                .catch(err => {
                    console.log(err);
                })
        });
        updateOriginalData(event);
        toggleEdit(false);
    }

    // If you cancel, reverts the changes you made back to original data
    const handleCancel = () => {
        updateSelectedEvent(originalData);
        toggleEdit(false);
    }

    const handleDelete = () => {
        EventsAPI.deleteFullEvent(originalData.event._id, originalData.eventDetails._id)
            .then(() => {
                setOpen(false);
                setUpdateFlag(false);
                setUpdateFlag(true);
                setSnackBarData({object:'event',action:'delete',status:'success'});
                // Trigger a better watcher of useEffect to update list of events
            })
            .catch(err => {
                setSnackBarData({object:'event',action:'delete',status:'error'});
                console.log(err);
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div className='edit-button-section'>
            {!isEditable &&
                <>
                    <IconButton onClick={handleEdit} aria-label="settings" >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleOpen} aria-label="settings" >
                        <DeleteIcon className="delete-icon" />
                    </IconButton>
                </>
            }
            {isEditable && 
                <>
                    <IconButton className='save-button' onClick={handleSave} aria-label="settings">
                        <DoneIcon />
                    </IconButton>
                    <IconButton className='cancel-button' onClick={handleCancel} aria-label="settings">
                        <ClearIcon />
                    </IconButton>
                </>
            }

            {/* Status update toast notifications */}
            <SnackBar data={snackBarData}></SnackBar>
            <ConfirmDelete
                keepMounted
                open={open}
                onClose={handleClose}
                handleDelete={handleDelete}
            />
        </div>
    );
}