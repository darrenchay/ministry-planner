import "./EventCard.scss";
import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
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
    FormControl,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';
import SendIcon from '@material-ui/icons/Send';

import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ButtonGroup from './EditButtonGroup';
import RoleSection from './RoleSection';

import * as dateFormatter from "../../utils/ConvertDate";
import * as UsersAPI from "../../utils/Services/UsersAPI";
import * as EmailAPI from "../../utils/Services/EmailAPI";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles({
    noBorder: {
        border: "none"
    },
    resize: {
        fontSize: 22
    },
    popover: {
        '& .MuiMenu-list': {
            padding: '8px 10px 4px !important'
        }
    }
});

// Handles the rehearsal time dropdown items
const RehearsalTime = ({ event, setSelectedEvent, rehearsal, isEditable }) => {
    const handleDelete = () => {
        var tempEvent = cloneDeep(event);
        console.log("delete");
        var idx = tempEvent.eventDetails.rehearsals.indexOf(rehearsal)
        if (idx !== -1) {
            tempEvent.eventDetails.rehearsals.splice(idx, 1);
            setSelectedEvent(tempEvent);
        }
    }

    return (
        <>
            <div className='rehearsal-time'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        variant="inline"
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

export default function EventCard({ event, setUpdateFlag, isCreate, isTemplate, setEvent, leaders }) {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(isCreate);
    const [originalEvent, changeOriginalEvent] = useState(event);
    const [selectedEvent, changeSelectedEvent] = useState(event);
    const [worshipLeaders, setWorshipLeaders] = useState(leaders);
    const [addDateTime, setAddDateTime] = useState(new Date());
    const [anchorEl, setAnchorEl] = useState(false);
    const history = useHistory();
    const serviceTypes = ["-", "sevenAM", "nineAM", "youth", "other"];

    let redirectToResources = () => {
        localStorage.setItem('eventData', JSON.stringify(originalEvent));
        history.push({
            pathname: "resources",
            event: event
        });
    };

    // Getting the list of worship leaders on event card load
    useEffect(() => {
        UsersAPI.getUserByRole('worship', "Worship-Leader")
            .then((users) => {
                setWorshipLeaders(users);
            });
    }, []);

    // updating the event card data based on the selected template 
    useEffect(() => {
        if (isCreate) {
            changeSelectedEvent(event);
        }
    }, [event, isCreate, setEvent])

    //Update event data for template
    useEffect(() => {
        if (isCreate) {
            setEvent(selectedEvent);
        }
    }, [selectedEvent, setEvent, isCreate])

    const handleChangeEvent = (e, type) => {
        var tempEvent = cloneDeep(selectedEvent);
        if (type.toLowerCase() === 'name') {
            tempEvent.event.name = e.target.value;
        } else if (type.toLowerCase() === 'date') {
            tempEvent.event.timestamp = (e.getTime() / 1000);
        } else if (type.toLowerCase() === 'type') {
            tempEvent.event.serviceType = e.target.value;
        }
        changeSelectedEvent(tempEvent);
    }

    const handleChangeWorshipLeader = (e) => {
        var tempEvent = cloneDeep(selectedEvent);
        tempEvent.eventDetails.worshipLeader = e.target.value;
        changeSelectedEvent(tempEvent);
    }

    const handleRehearsals = () => {
        var tempEvent = cloneDeep(selectedEvent);
        tempEvent.eventDetails.rehearsals.push(addDateTime.getTime() / 1000);
        changeSelectedEvent(tempEvent);
        setAddDateTime(new Date());
    }

    const handleRehearsalClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleCloseRehearsals = () => {
        setAnchorEl(null);
    }

    const notifyEmail = () => {
        // Creating list of users
        var userList = []
        event.eventDetails.teamList.forEach(role => {
            role.teamMember.forEach(user => {
                var found = false;
                for (var i = 0; i < userList.length; i++) {
                    if (userList[i].email === user.email) {
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    // var userToAdd = user;
                    // userToAdd.roleId = role._id;
                    userList.push(user);
                }
            })
        })
        var data = {
            users: []
        }

        // Populating data to send emails
        userList.forEach(user => {
            // console.log(user)
            data.users.push({
                eventName: event.event.name,
                eventDate: dateFormatter.getDay(event.event.timestamp),
                recipient: {
                    name: user.firstname,
                    email: user.email,
                    id: user._id
                },
                sender: {
                    name: "Jason - Worship Coordinator",
                    email: "teast"
                },
                eventId: event.eventDetails._id
            })
        })
        EmailAPI.notifyAllUsers(data).then(() => {
            console.log("Notified Users");
        });
    }

    return (
        <Card key={event.event._id}
            className={
                !isCreate && selectedEvent.event.timestamp < Math.round((new Date()).getTime() / 1000) ?
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
                                placeholder={isTemplate ? "No Template" : "No event name"}
                                value={selectedEvent.event.name}
                                onChange={(e) => handleChangeEvent(e, "name")}
                            />
                            {isAdmin && !isCreate &&
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
                        // TO ADD COLOR PICKER FOR TEMPLATE
                    }
                    subheader={
                        <>
                            {!isTemplate &&
                                <div className={isEditable ? 'event-info-wrapper-margin' : 'event-info-wrapper'}>
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
                                    {!isTemplate &&
                                        <div className={isEditable ? 'rehearsals-no-padding' : 'rehearsals'}>
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
                                                PopoverClasses={{
                                                    paper: classes.popover
                                                }}
                                            >
                                                <div className='rehearsal-inner-header'>Rehearsals</div>
                                                {selectedEvent.eventDetails.rehearsals?.length > 0 && selectedEvent.eventDetails.rehearsals.map(rehearsal => (
                                                    <RehearsalTime
                                                        event={selectedEvent}
                                                        setSelectedEvent={changeSelectedEvent}
                                                        rehearsal={rehearsal}
                                                        isEditable={isEditable}
                                                    />
                                                ))}
                                                {selectedEvent.eventDetails.rehearsals?.length === 0 &&
                                                    <div className='no-rehearsal-message'>No Rehearsal Times</div>
                                                }
                                                {isEditable &&
                                                    <>
                                                        <div className='rehearsal-date-picker-wrapper'>
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDateTimePicker
                                                                    variant="inline"
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
                                                        <div className='rehearsal-add-button-wrapper'>
                                                            <Button onClick={handleRehearsals} disabled={!isEditable} aria-label="settings" className='rehearsal-add-button'>
                                                                <div className='add-text'>Add</div><AddCircleIcon />
                                                            </Button>
                                                        </div>
                                                    </>
                                                }
                                            </Menu>
                                        </div>
                                    }
                                </div>
                            }
                            <div className="event-info-wrapper2">
                                <div className='worship-leader'>
                                    <FormControl variant='outlined' size='small'>
                                        <InputLabel id="teamMemberSelect">WS Leader</InputLabel>
                                        <Select
                                            className='worship-leader-select'
                                            labelId="teamMemberSelect"
                                            label='WS Leader'
                                            value={selectedEvent.eventDetails.worshipLeader}
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
                                <div className='service-type'>
                                    <FormControl variant='outlined' size='small'>
                                        <InputLabel id="serviceTypeSelect">Service</InputLabel>
                                        <Select
                                            className='service-type-select'
                                            labelId="serviceTypeSelect"
                                            label='Service'
                                            value={selectedEvent.event.serviceType}
                                            onChange={(e) => handleChangeEvent(e, "type")}
                                            disabled={!isEditable}
                                        >
                                            <MenuItem value={serviceTypes[1]}> Main - 7:30 AM </MenuItem>
                                            <MenuItem value={serviceTypes[2]}> Main - 9:30 AM </MenuItem>
                                            <MenuItem value={serviceTypes[3]}> Youth </MenuItem>
                                            <MenuItem value={serviceTypes[4]}> Other </MenuItem>
                                        </Select>
                                    </FormControl>
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
                                selectedEvent={selectedEvent}
                                setSelectedEvent={changeSelectedEvent}
                            />
                        ))}
                        {!isTemplate &&
                            <RoleSection
                                data={selectedEvent.eventDetails}
                                type={"addInfo"}
                                isEditable={isEditable}
                                selectedEvent={selectedEvent}
                                setSelectedEvent={changeSelectedEvent}
                            />
                        }
                    </CustomScrollbar>
                </CardContent>
            </div>
            {!isCreate &&
                <CardActions className='card-actions'>
                    <Button className='resources-button' variant="contained"
                        color='primary' size="small" onClick={redirectToResources}>
                        Resources
                    </Button>

					
					{isAdmin &&
						<Button className='notify-button' variant="contained" startIcon={<SendIcon className="send-icon" />}
							color='primary' size="small" onClick={notifyEmail}>
							Notify
						</Button>
					}
                </CardActions>
            }
        </Card>
    );
}
