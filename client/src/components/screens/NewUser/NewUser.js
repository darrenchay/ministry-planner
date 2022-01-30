import React from "react";
import {
    Paper,
    Typography
} from '@material-ui/core';
import "./NewUser.scss"


export default function NewUserPage() {
    return (
        <Paper elevation={0} className="new-user-wrapper">
            <Typography className="title" variant="h2">
                Welcome to Ministry Planner!
            </Typography>
            <Typography className="description" variant="h4">
                You have successfully created an account! An email has been sent to the leader for approval. Please sit tight while you account gets approved!
            </Typography>
        </Paper>
    );
}