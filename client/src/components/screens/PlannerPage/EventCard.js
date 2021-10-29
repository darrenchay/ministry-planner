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
    Menu,
    MenuItem,
    Select,
    InputLabel,
    FormControl
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

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
    resize: {
        fontSize: 22
    }
}));

const RehearsalTime = ({ eventDetails, setSelectedEventDetails, rehearsal, isEditable }) => {
    const handleDelete = () => {
        var tempEventDetails = cloneDeep(eventDetails);
        console.log("delete")
        var idx = tempEventDetails.rehearsals.indexOf(rehearsal)
        if (idx !== -1) {
            tempEventDetails.rehearsals.splice(idx, 1);
            setSelectedEventDetails(tempEventDetails);
        }
    }

    return (
        <>
            <div className='rehearsal-time'>
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
                {isEditable &&
                    <Button onClick={handleDelete} disabled={!isEditable} aria-label="settings" >
                        <ClearIcon />
                    </Button>
                }
            </div>
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

    let redirectToResources = (event) => {
        history.push("resources");
    };

    useEffect(() => {
        UsersAPI.getUserByRole('worship', "Worship-Leader")
            .then((users) => {
                setWorshipLeaders(users);
            });
    }, []);


    useEffect(() => {
        if (isCreateEvent) {
            setEvent(selectedEvent);
        }
    }, [selectedEvent, isCreateEvent, setEvent])


    useEffect(() => {
        setSelectedEventDetails(selectedEvent.eventDetails);
        // eslint-disable-next-line
    }, [isEditable]);


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
            // tempEvent.event.timestamp = e.timestamp;
        }
        changeSelectedEvent(tempEvent);
    }

    const handleChangeSelectedEventDetails = (e, type) => {
        var tempEventDetails = cloneDeep(selectedEventDetails);
        if (type === "worshipLeader") {
            tempEventDetails.worshipLeader = e.target.value;
        } else if (type === "rehearsals") {
            tempEventDetails.rehearsals.push(addDateTime.getTime() / 1000);
            setAddDateTime(new Date());
        }
        setSelectedEventDetails(tempEventDetails);
    }

    const handleRehearsalClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseRehearsals = () => {
        setAnchorEl(null);
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
                            <div className="event-info-wrapper">
                                <div className='worship-leader'>
                                    <FormControl variant='outlined' size='small'>
                                        <InputLabel id="teamMemberSelect">Worship Leader</InputLabel>
                                        <Select
                                            className='worship-leader-select'
                                            labelId="teamMemberSelect"
                                            label='Worship Leader'
                                            value={selectedEventDetails.worshipLeader}
                                            onChange={(e) => handleChangeSelectedEventDetails(e, "worshipLeader")}
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
                                        {selectedEventDetails.rehearsals?.length > 0 && selectedEventDetails.rehearsals.map(rehearsal => (
                                            <RehearsalTime
                                                eventDetails={selectedEventDetails}
                                                setSelectedEventDetails={setSelectedEventDetails}
                                                rehearsal={rehearsal}
                                                isEditable={isEditable}
                                            />
                                        ))}
                                        {isEditable &&
                                            <>
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
                                                            value={addDateTime}
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
                                                </div>
                                                <Button onClick={(e) => handleChangeSelectedEventDetails(e, "rehearsals")} disabled={!isEditable} aria-label="settings" className='add-button'>
                                                    Add <AddCircleIcon />
                                                </Button>
                                            </>
                                        }
                                    </Menu>
                                </div>
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

                    <Button className='notify-button' variant="contained" startIcon={<SendIcon className="send-icon" />}
                        color='primary' size="small" onClick={() => { console.log("Notified") }}>
                        Notify
                    </Button>
                </CardActions>
            }
        </Card>
    );
}
