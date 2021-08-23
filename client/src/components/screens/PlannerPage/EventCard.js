import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
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

import ButtonGroup from './EditButtonGroup';
import RoleSection from './RoleSection';
// import convertDate from "../../utils/ConvertDate";
import "./PlannerPage.scss";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

export default function EventCard({ event, index }) {
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(false);
    const [originalEvent, changeOriginalEvent] = useState(event);
    const [selectedEvent, changeSelectedEvent] = useState(event);
    const history = useHistory();

    let redirectToResources = (event) => {
        history.push("resources");
    };

    const handleChangeEvent = (e, type) => {
        var tempEvent = cloneDeep(selectedEvent);
        if (type.toLowerCase() === 'name') {
            tempEvent.event.name = e.target.value;
        } else if (type.toLowerCase() === 'date') {
            tempEvent.event.timestamp = (e.getTime() / 1000);
        }
        changeSelectedEvent(tempEvent);
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
                    placeholder="No event name"
                    value={selectedEvent.event.name}
                    onChange={(e) => handleChangeEvent(e, "name")} />}
                subheader={
                    <>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="pickupDate"
                                disabled={!isEditable}
                                value={new Date(selectedEvent.event.timestamp * 1000)}
                                onChange={(e) => handleChangeEvent(e, "date")}
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
                        type={"event"}
                        data={selectedEvent}
                        updateData={changeSelectedEvent}
                        originalData={originalEvent}
                        updateOriginalData={changeOriginalEvent}
                    />
                }
            />
            <CardContent>
                {selectedEvent.eventDetails.teamList.map((role, index) => (
                    <RoleSection
                        role={role}
                        index={index}
                        isEditable={isEditable}
                    />
                ))}
                <RoleSection
                    role={selectedEvent.eventDetails}
                    index={-1}
                    isEditable={isEditable}
                />
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
