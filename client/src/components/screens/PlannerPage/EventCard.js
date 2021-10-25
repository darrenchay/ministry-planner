import "./EventCard.scss";
import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useHistory } from "react-router-dom";
import { CustomScrollbar } from "../../utils/CustomScrollbar/CustomScrollbar";
import {
    makeStyles,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import SendIcon from '@material-ui/icons/Send';

import ButtonGroup from './EditButtonGroup';
import RoleSection from './RoleSection';

// import convertDate from "../../utils/ConvertDate";
import * as UsersAPI from "../../utils/Services/UsersAPI";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
    resize: {
        fontSize: 22
    }
}));

export default function EventCard({ event, setUpdateFlag, isCreateEvent, setEvent }) {
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(isCreateEvent);
    const [originalEvent, changeOriginalEvent] = useState(cloneDeep(event));
    const [selectedEvent, changeSelectedEvent] = useState(event);
    const [selectedEventDetails, setSelectedEventDetails] = useState(selectedEvent.eventDetails);
    const [worshipLeaders, setWorshipLeaders] = useState();
    const history = useHistory();

    useEffect(() => {
        if (isCreateEvent) {
            setEvent(selectedEvent);
        }
    }, [selectedEvent, isCreateEvent, setEvent])

    let redirectToResources = (event) => {
        history.push("resources");
    };

    useEffect(() => {
        setSelectedEventDetails(selectedEvent.eventDetails);
    // eslint-disable-next-line
    }, [isEditable]);

    useEffect(() => {
        UsersAPI.getUserByRole('worship', "Worship-Leader")
            .then((users) => {
                setWorshipLeaders(users);
            });
    }, [])

    // Updates the event object when the event details section is updated
    useEffect(() => {
        var tempEvent = cloneDeep(selectedEvent);
        tempEvent.eventDetails = selectedEventDetails;
        changeSelectedEvent(tempEvent);
        // eslint-disable-next-line
    }, [selectedEventDetails]);

    const handleChangeEvent = (e, type) => {
        var tempEvent = cloneDeep(selectedEvent);
        if (type.toLowerCase() === 'name') {
            tempEvent.event.name = e.target.value;
        } else if (type.toLowerCase() === 'date') {
            tempEvent.event.timestamp = (e.getTime() / 1000);
        }
        changeSelectedEvent(tempEvent);
    }

    // Update the worship leader
    const handleChangeWorshipLeader = (e) => {
        var tempEventDetails = cloneDeep(selectedEventDetails);
        tempEventDetails.worshipLeader = e.target.value;
        setSelectedEventDetails(tempEventDetails);
    }

    return (
        <Card key={event.event._id} 
            className={
                !isCreateEvent && selectedEvent.event.timestamp < Math.round((new Date()).getTime() / 1000) ?
                'card-past' : 'card'
            }>
            <div>
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
                        {!isCreateEvent &&
                            <ButtonGroup
                                isEditable={isEditable}
                                toggleEdit={toggleEdit}
                                event={selectedEvent}
                                updateSelectedEvent={changeSelectedEvent}
                                originalData={originalEvent}
                                updateOriginalData={changeOriginalEvent}
                                setUpdateFlag={setUpdateFlag}
                            />
                        }
                    </div>
                }
                subheader={
                    <>
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
                    <div className='worship-leader'>
                        <FormControl variant='outlined' size='small'>
                            <InputLabel id="teamMemberSelect">Worship Leader</InputLabel>
                            <Select
                                className='worship-leader-select'
                                labelId="teamMemberSelect"
                                label='Worship Leader'
                                value={selectedEventDetails.worshipLeader}
                                onChange={handleChangeWorshipLeader}
                                disabled={!isEditable}
                            >
                                {worshipLeaders?.length > 0 &&
                                    worshipLeaders
                                        .map((user, index) => {
                                            return <MenuItem value={user._id}>{user.firstname}</MenuItem>
                                        })
                                }

                                {worshipLeaders?.length === 0 &&
                                    <MenuItem value={0} disabled={true}>No Members</MenuItem>
                                }
                            </Select>
                        </FormControl>
                    </div>
                    </>
                }
            />
            <CardContent>
                <CustomScrollbar className='role-section-wrapper' 
                    autoHide autoHideTimeout={500} autoHideDuration={200} color="grey">
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
                </CustomScrollbar>
            </CardContent>
            </div>
            {!isCreateEvent &&
                <CardActions className='card-actions'>
                    <Button className='resources-button' variant="contained"
                        color='primary' size="small" onClick={redirectToResources}>
                        Resources
                    </Button>

                    <Button className='notify-button' variant="contained" startIcon={<SendIcon className="send-icon"/>}
                        color='primary' size="small" onClick={()=> {console.log("Notified")}}>
                        Notify
                    </Button>
                </CardActions>
            }
        </Card>
    );
}
