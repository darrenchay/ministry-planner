import React, { useState } from "react";
import {
    Snackbar,
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
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ConfirmDelete = ({ onClose, open, handleDelete }) => {
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

export default function ButtonGroup({ isEditable, toggleEdit, event,
                                    updateSelectedEvent, originalData, updateOriginalData, setDeleteFlag }) {
    const [openSuccessUpdateEvent, setOpenSuccessUpdateEvent] = React.useState(false);
    const [openErrorUpdateEvent, setOpenErrorUpdateEvent] = React.useState(false);
    const [openSuccessUpdateRole, setOpenSuccessUpdateRole] = React.useState(false);
    const [openErrorUpdateRole, setOpenErrorUpdateRole] = React.useState(false);
    const [open, setOpen] = useState(false);
    const handleEdit = () => {
        toggleEdit(!isEditable);
    };

    const handleCloseSnack = () => {
        setOpenSuccessUpdateEvent(false);
        setOpenErrorUpdateEvent(false);
        setOpenSuccessUpdateRole(false);
        setOpenErrorUpdateRole(false);
    };

    const handleSave = () => {
        // saving the event
        EventsAPI.updateEvent(event.event, event.event._id)
            .then(resp => {
                console.log("successfully updated " + resp.nModified + " event(s)");
                handleCloseSnack();
                setOpenSuccessUpdateEvent(true);
            })
            .catch(err => {
                setOpenErrorUpdateEvent(true)
                console.log(err);
                // Add error handler and do not make editable false, instead show an alert which says an error occured
            });

        // saving the eventDetails
        EventsAPI.updateEventDetails(event.eventDetails, 'worship', 'eventDetails', event.eventDetails._id)
            .then(resp => {
                console.log("successfully updated " + resp.nModified + " role(s)");
            })
            .catch(err => {
                setOpenErrorUpdateRole(true)
                console.log(err);
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
                    <IconButton onClick={handleOpen} aria-label="settings" >
                        <DeleteIcon className="delete-icon" />
                    </IconButton>
                </>
            }
            {isEditable && <>
                <IconButton onClick={handleSave} aria-label="settings">
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleCancel} aria-label="settings">
                    <ClearIcon />
                </IconButton>
            </>}

            {/* Status update toast notifications */}
            <Snackbar open={openSuccessUpdateEvent} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Event successfully updated!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorUpdateEvent} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    An error occured when updating the event.
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessUpdateRole} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Role successfully updated!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorUpdateRole} autoHideDuration={5000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error">
                    An error occured when updating the role.
                </Alert>
            </Snackbar>
            <ConfirmDelete
                keepMounted
                open={open}
                onClose={handleClose}
                handleDelete={handleDelete}
            />
        </div>
    );
}