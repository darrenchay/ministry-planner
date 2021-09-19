import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import * as EventsAPI from './../../utils/Services/EventsAPI'

function ConfirmDelete(props) {
    const { onClose, open, handleDelete } = props;

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        handleDelete();
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
        >
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogContent dividers>
                <p>Are you sure you want to delete this event?</p>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleOk}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}

// Handles the toggling of the edit/save/cancel buttons
// On click edit, save a local version of the event
// Then when click update, take the copy of the event and send that as body, update original event to be the copy
// Then when click cancel, revert to original version of event
export default function ButtonGroup({ isEditable, toggleEdit, type, data, updateData, originalData, updateOriginalData, setDeleteFlag }) {
    const [open, setOpen] = useState(false);
    const handleEdit = () => {
        toggleEdit(!isEditable);
    }

    const handleSave = () => {
        if (type.toLowerCase() === "event") {
            EventsAPI.updateEvent(data.event, data.event._id)
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

    const handleDelete = () => {
        EventsAPI.deleteFullEvent(originalData.event._id, originalData.eventDetails._id)
            .then(() => {
                setOpen(false);
                setDeleteFlag(false);
                setDeleteFlag(true);
                // Trigger a better watcher of useEffect to update list of events
                // TODO: Add a toast animation when it is successfully deleted
            })
            .catch(err => {
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
        <div className='edit-button'>
            {!isEditable &&
                <>
                    <IconButton onClick={handleEdit} aria-label="settings" >
                        <EditIcon />
                    </IconButton>
                    {type === "event" &&
                        <IconButton onClick={handleOpen} aria-label="settings" >
                            <DeleteIcon className="delete-icon" />
                        </IconButton>}
                </>
            }
            {isEditable &&
                <>
                    <IconButton onClick={handleSave} aria-label="settings">
                        <DoneIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel} aria-label="settings">
                        <ClearIcon />
                    </IconButton>
                </>}
            <ConfirmDelete
                keepMounted
                open={open}
                onClose={handleClose}
                handleDelete={handleDelete}
            />
        </div>
    );
}