import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';

export default function ConfirmDelete({ onClose, open, handleDelete }) {
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
                <p>Are you sure you want to delete this?</p>
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