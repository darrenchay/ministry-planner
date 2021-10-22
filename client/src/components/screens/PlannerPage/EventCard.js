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
    TextField,
    Menu,
    MenuItem,
    Select,
    InputLabel,
    IconButton
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';
import SendIcon from '@material-ui/icons/Send';

import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ButtonGroup from './EditButtonGroup';
import RoleSection from './RoleSection';

// import convertDate from "../../utils/ConvertDate";
import * as UsersAPI from "../../utils/Services/UsersAPI";
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

const RehearsalTime = ({ rehearsals, rehearsal, isEditable }) => {
    const handleDelete = () => {
        var idx = rehearsals.indexOf(rehearsal)
        if (idx !== -1) {
            rehearsals.splice(idx, 1);
        }
    }
    useEffect(() => {
        // console.log("rehearsals", rehearsals);
        // console.log("rehearsal", rehearsal);
    }, [rehearsals])
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                    variant="inline"
                    margin="normal"
                    id="pickupDate"
                    inputVariant={"standard"}
                    format="d MMM yyyy - HH:mm"
                    ampm={false}
                    disabled={true}
                    value={new Date(rehearsal * 1000)}
                    InputProps={{
                        disableUnderline: true
                    }}
                    KeyboardButtonProps={{
                        "aria-label": "change date",
                        style: { display: 'none' }
                    }}
                />
            </MuiPickersUtilsProvider>
            <IconButton onClick={handleDelete} aria-label="settings" >
                <ClearIcon />
            </IconButton>
        </>
    )

}

export default function EventCard({ event, setUpdateFlag, isCreateEvent, setEvent }) {
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(isCreateEvent);
    const [originalEvent, changeOriginalEvent] = useState(cloneDeep(event));
    const [selectedEvent, changeSelectedEvent] = useState(event);
    const [selectedEventDetails, setSelectedEventDetails] = useState(selectedEvent.eventDetails);
    const [worshipLeaders, setWorshipLeaders] = useState();
    const [addDateTime, setAddDateTime] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState(false);
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
        console.log(selectedEventDetails.rehearsals)
        // eslint-disable-next-line
    }, [selectedEventDetails]);

    const handleChangeEvent = (e, type) => {
        var tempEvent = cloneDeep(selectedEvent);
        if (type.toLowerCase() === 'name') {
            tempEvent.event.name = e.target.value;
        } else if (type.toLowerCase() === 'date') {
            console.log(e);
            tempEvent.event.timestamp = (e.getTime() / 1000);
            // tempEvent.event.timestamp = e.timestamp;
        }
        changeSelectedEvent(tempEvent);
    }

    // Update the worship leader
    const handleChangeWorshipLeader = (e) => {
        var tempEventDetails = cloneDeep(selectedEventDetails);
        tempEventDetails.worshipLeader = e.target.value;
        setSelectedEventDetails(tempEventDetails);
    }

    const handleRehearsalClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseRehearsals = () => {
        setAnchorEl(null);
    }

    const addRehearsal = () => {
        selectedEventDetails.rehearsals.push(addDateTime.getTime() / 1000);
        setAddDateTime(new Date())
        console.log(selectedEventDetails.rehearsals);
    }

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
                    <div className={isEditable ? 'date-picker-wrapper' : 'date-picker-wrapper-no-margin'}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                margin="normal"
                                id="pickupDate"
                                inputVariant={isEditable ? "outlined" : "standard"}
                                format="d MMM yyyy - HH:mm"
                                ampm={false}
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
                <div className='event-info'>

                    <div className='worship-leader'>
                        <InputLabel id="teamMemberSelect">Worship Leader</InputLabel>
                        <Select
                            className='team-member-select'
                            labelId="teamMemberSelect"
                            label='Team Member'
                            id="teamMemberSelect"
                            placeholder="Select a member"
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
                    </div>
                    <div className="rehearsals">
                        {/* <InputLabel id="rehearsal">Rehearsals</InputLabel> */}
                        <Button onClick={handleRehearsalClick}>
                            Rehearsals <KeyboardArrowDownIcon />
                        </Button>
                        <Menu
                            className='rehearsal-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseRehearsals}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value={0} disabled={true}>Rehearsals</MenuItem>
                            {selectedEventDetails.rehearsal?.length > 0 && selectedEventDetails.rehearsal.map(rehearsal => (
                                <MenuItem value={0} disabled={true}>
                                    <RehearsalTime
                                        rehearsals={selectedEventDetails.rehearsal}
                                        rehearsal={rehearsal}
                                        isEditable={isEditable}
                                    />
                                </MenuItem>
                            ))}
                            <div>
                                <div className={isEditable ? 'date-picker-wrapper' : 'date-picker-wrapper-no-margin'}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDateTimePicker
                                            variant="inline"
                                            margin="normal"
                                            id="pickupDate"
                                            inputVariant={isEditable ? "outlined" : "standard"}
                                            format="d MMM yyyy - HH:mm"
                                            ampm={false}
                                            disabled={!isEditable}
                                            value={new Date()}
                                            onChange={setAddDateTime}
                                            InputProps={{
                                                disableUnderline: !isEditable
                                            }}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                                style: { display: isEditable ? 'inline-flex' : 'none' }
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <Button onClick={addRehearsal} disabled={!isEditable} aria-label="settings" className='add-button'>
                                        Add <AddCircleIcon />
                                    </Button>
                                </div>
                            </div>
                        </Menu>
                    </div>
                </div>
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
            {!isCreateEvent &&
                <CardActions className='card-actions'>
                    <Button className='resources-button' variant="contained"
                        color='primary' size="small" onClick={redirectToResources}>
                        Resources
                    </Button>

                    <Button className='notify-button' variant="contained" startIcon={<SendIcon className="send-icon" />}
                        color='primary' size="small" onClick={() => { console.log("Notified") }}>
                        Notify
                    </Button>
                </CardActions>
            }
        </Card>
    );
}
