import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    makeStyles,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button,
    TextField
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import ButtonGroup from './../../utils/EditButtonGroup';
import RoleSection from './RoleSection';
import convertDate from "../../utils/ConvertDate";
import * as EventsAPI from './../../utils/Services/EventsAPI'
import "./PlannerPage.scss";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

// On click edit, save a local version of the event
// Then when click update, take the copy of the event and send that as body, update original event to be the copy
// Then when click cancel, revert to original version of event

export default function EventCard({ event, index }) {
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(false);
    const [selectedDate, changeSelectedDate] = useState(new Date(event.event.time * 1000));
    const [eventName, changeEventName] = useState(event.event.name);
    const eventId = event._id;
    const history = useHistory();

    let redirectToResources = (event) => {
        history.push("resources");
    };

    const handleChangeEventName = (e) => {
        changeEventName(e.target.value);
    }

    const updateEvent = () => {

        EventsAPI.updateEvent(data, eventId)
        .then(resp=> {
            console.log("successfully updated " + resp.nModified + " event");
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <Card key={index} className='card'>
            <CardHeader
                className='card-header'
                title={<TextField InputProps={{
                    classes: {
                        notchedOutline: classes.noBorder
                    },
                }}
                    multiline={true}
                    disabled={!isEditable}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="no additional info"
                    value={eventName}
                    onChange={handleChangeEventName} />}
                subheader={
                    <>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="pickupDate"
                                disabled={!isEditable}
                                value={selectedDate}
                                onChange={changeSelectedDate}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </>
                }
                action={
                    <ButtonGroup
                        isEditable={isEditable}
                        toggleEdit={toggleEdit}
                    />
                }
            />
            <CardContent>
                {event.eventDetails.teamList.map((role, index) => (
                    <RoleSection
                        role={role}
                        index={index}
                        isEditable={isEditable}
                    />
                ))}
                {event.eventDetails.additionalInfo &&
                    <RoleSection
                        role={event.eventDetails}
                        index={-1}
                        isEditable={isEditable}
                    />}
            </CardContent>
            <CardActions className='card-actions'>
                <Button className='resources-button' variant="contained"
                    color='primary' size="small" onClick={redirectToResources}>
                    Resources
                </Button>
            </CardActions>
        </Card>
    );
}
