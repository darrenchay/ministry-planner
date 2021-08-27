import React from "react";
import cloneDeep from "lodash/cloneDeep";
import {
    Snackbar,
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import * as EventsAPI from './../../utils/Services/EventsAPI'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Handles the toggling of the edit/save/cancel buttons
// On click edit, save a local version of the event
// Then when click update, take the copy of the event and send that as body, update original event to be the copy
// Then when click cancel, revert to original version of event
export default function ButtonGroup({ isEditable, toggleEdit, type, data, updateData, originalData, updateOriginalData }) {
    
    const [openSuccessUpdateEvent, setOpenSuccessUpdateEvent] = React.useState(false);
    const [openErrorUpdateEvent, setOpenErrorUpdateEvent] = React.useState(false);
    const [openSuccessUpdateRole, setOpenSuccessUpdateRole] = React.useState(false);
    const [openErrorUpdateRole, setOpenErrorUpdateRole] = React.useState(false);
    
    const handleEdit = () => {
        toggleEdit(!isEditable);
    };

    const handleClose = () => {
        setOpenSuccessUpdateEvent(false);
        setOpenErrorUpdateEvent(false);
        setOpenSuccessUpdateRole(false);
        setOpenErrorUpdateRole(false);
    };

    const handleSave = () => {
        if (type.toLowerCase() === "event") {
            EventsAPI.updateEvent(data, data.event._id)
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " event(s)");
                    handleClose();
                    setOpenSuccessUpdateEvent(true);
                })
                .catch(err => {
                    setOpenErrorUpdateEvent(true)
                    console.log(err);
                    // Add error handler and do not make editable false, instead show an alert which says an error occured
                });
        } else if (type.toLowerCase() === "role") {
            EventsAPI.updateEventDetails(data, 'worship', 'role')
                .then(resp => {
                    console.log("successfully updated " + resp.nModified + " role(s)");
                    handleClose();
                    setOpenSuccessUpdateRole(true);
                })
                .catch(err => {
                    setOpenErrorUpdateRole(true)
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

            {/* Status update toast notifications */}
            <Snackbar open={openSuccessUpdateEvent} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Event successfully updated!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorUpdateEvent} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    An error occured when updating the event.
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccessUpdateRole} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Role successfully updated!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorUpdateRole} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    An error occured when updating the role.
                </Alert>
            </Snackbar>
        </>
    );
}