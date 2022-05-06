import React, { useEffect, useState } from "react";
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar({data}) {
    /**
     * data has to be an object in the form of {object, action, status}
     * where action is either 'create', 'update' or 'delete' and status is 
     * either 'success' or 'error'. In the parent component calling the 
     * SnackBar, the 'data' state object has to be initialized to {} when the 
     * fields are not set yet.
     */

    const [openStatus, setOpenStatus] = useState(false);
    const [message, setMessage] = useState('');

    const handleCloseSnack = () => {
        setOpenStatus(false);
    };

    useEffect(() => {
        if (data.object && data.action && data.status) {
            setOpenStatus(true);
            if (data.status === "success" && data.action === "create")
                setMessage(`${data.object} successfully created.`)
            else if (data.status === "success" && data.action === "update")
                setMessage(`${data.object} successfully updated.`)
            else if (data.status === "success" && data.action === "delete")
                setMessage(`${data.object} successfully deleted.`)
            else if (data.status === "error" && data.action === "create")
                setMessage(`An error occured while creating the ${data.object}.`)
            else if (data.status === "error" && data.action === "update")
                setMessage(`An error occured while updating the ${data.object}.`)
            else if (data.status === "error" && data.action === "delete")
                setMessage(`An error occured while deleting the ${data.object}.`)
        }
    }, [data])

    return (
        <Snackbar open={openStatus} autoHideDuration={4000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success">
                {message !== '' && 
                    <>{message}</>
                }
            </Alert>
        </Snackbar>
    )
}