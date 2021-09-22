import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import * as EventsAPI from '../../utils/Services/EventsAPI';
import Modal from '@material-ui/core/Modal';

import cloneDeep from "lodash/cloneDeep";
import { useHistory } from "react-router-dom";
import {
    makeStyles,
    Card,
    CardContent,
    IconButton,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    TextField
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ButtonGroup from './EditButtonGroup';
import RoleSection from './RoleSection';
    
function getModalStyle() {
    const top = 50;
    const left = 50;
    
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
    
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: 450,
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const emptyTeamList = [
    {
        roleName: 'Vocalist',
        teamMember: [],
        teamMapping: []
    },
    {
        roleName: 'Guitarist',
        teamMember: [],
        teamMapping: []
    },
    {
        roleName: 'Piano',
        teamMember: [],
        teamMapping: []
    },
    {
        roleName: 'Bassist',
        teamMember: [],
        teamMapping: []
    },
    {
        roleName: 'Drums',
        teamMember: [],
        teamMapping: []
    }
];

export default function CreateEventModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const handleSave = () => {
        console.log(emptyTeamList);
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Create new event</h2>
            <p>Name: <input/></p>
            <p>Description: <input/></p>
            {emptyTeamList.map((role, index) => (
                <RoleSection
                    arr={emptyTeamList}
                    role={role}
                    index={index}
                    isEditable={true}
                />
            ))}
            <button onClick={handleSave}>Save</button>
        </div>
    )
}
