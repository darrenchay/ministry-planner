import React, { useEffect, useState } from "react";
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
    resize: {
        fontSize: 22
    }
}));

export default function EventCard({ event, setDeleteFlag }) {
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(false);
    const [originalEvent, changeOriginalEvent] = useState(cloneDeep(event));
    const [selectedEvent, changeSelectedEvent] = useState(event);
    const [selectedEventDetails, setSelectedEventDetails] = useState(selectedEvent.eventDetails);
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

    // Updates the event object when the event details section is updated
    useEffect(() => {
        var tempEvent = cloneDeep(selectedEvent);
        tempEvent.eventDetails = selectedEventDetails;
        changeSelectedEvent(tempEvent);
        // eslint-disable-next-line
    }, [selectedEventDetails])

    return (
        <Card key={event.event._id} className='card'>
            <CardHeader
                className='card-header'
                title={
                    <div className={isEditable ? 'title-button-wrapper-edit' : 'title-button-wrapper'}>
                        <TextField InputProps={{
                            classes: {
                                // notchedOutline: classes.noBorder,
                                input: classes.resize
                            },
                            disableUnderline: !isEditable
                        }}
                            className='title'
                            multiline={true}
                            disabled={!isEditable}
                            id="outlined-basic"
                            variant={isEditable ? "outlined" : "standard"}
                            placeholder="No event name"
                            value={selectedEvent.event.name}
                            onChange={(e) => handleChangeEvent(e, "name")} />
                        <ButtonGroup
                            isEditable={isEditable}
                            toggleEdit={toggleEdit}
                            event={selectedEvent}
                            updateSelectedEvent={changeSelectedEvent}
                            originalData={originalEvent}
                            updateOriginalData={changeOriginalEvent}
                            setDeleteFlag={setDeleteFlag}
                        />
                    </div>
                }
                subheader={
                    <div className={isEditable ? 'date-picker-wrapper' : 'date-picker-wrapper-no-margin'}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                inputVariant={isEditable ? "outlined" : "standard"}
                                format="d MMM yyyy"
                                margin="normal"
                                id="pickupDate"
                                disabled={!isEditable}
                                value={new Date(selectedEvent.event.timestamp * 1000)}
                                onChange={(e) => handleChangeEvent(e, "date")}
                                InputProps={{
                                    disableUnderline: !isEditable
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                    style: { display: isEditable ? 'inline-flex' : 'none' }
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                }
            />
            <CardContent>
                {selectedEvent.eventDetails.teamList.map((role, index) => (
                    <RoleSection
                        data={role}
                        index={index}
                        type={"role"}
                        isEditable={isEditable}
                        key={role._id}
                        selectedEventDetails={selectedEventDetails}
                        setSelectedEventDetails={setSelectedEventDetails}
                    />
                ))}
                <RoleSection
                    data={selectedEvent.eventDetails}
                    type={"addInfo"}
                    isEditable={isEditable}
                    selectedEventDetails={selectedEventDetails}
                    setSelectedEventDetails={setSelectedEventDetails}
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
