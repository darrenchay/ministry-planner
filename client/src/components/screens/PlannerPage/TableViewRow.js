import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
// import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {
    makeStyles,
    CardActions,
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import SendIcon from "@material-ui/icons/Send";

import ClearIcon from "@material-ui/icons/Clear";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import ButtonGroup from "./EditButtonGroup";
import RoleSection from "./RoleSection";

// import convertDate from "../../utils/ConvertDate";

const useStyles = makeStyles({
    noBorder: {
        border: "none",
    },
    resize: {
        fontSize: 22,
    },
    popover: {
        "& .MuiMenu-list": {
            padding: "8px 10px 4px !important",
        },
    },
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

export default function TableViewRow({
    event,
    setUpdateFlag,
    isCreateEvent,
    setEvent,
    leaders
}) {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(isCreateEvent);
    const [originalEvent, changeOriginalEvent] = useState(event);
    const [selectedEvent, changeSelectedEvent] = useState(event);
    // eslint-disable-next-line
    const [worshipLeaders, setWorshipLeaders] = useState(leaders);
    const [addDateTime, setAddDateTime] = useState(new Date());
    const history = useHistory();
    
    let redirectToResources = () => {
        history.push({
            pathname: "resources", 
            event: event});
    };
    
    useEffect(() => {
        console.log("admin: ", isAdmin);
        if (isAdmin === true) {
            toggleEdit(false);
        }
    }, [isAdmin])

    useEffect(() => {
        if (isCreateEvent) {
            setEvent(selectedEvent);
        }
    }, [selectedEvent, isCreateEvent, setEvent]);

    const handleChangeEvent = (e, type) => {
        var tempEvent = cloneDeep(selectedEvent);
        if (type.toLowerCase() === "name") {
            tempEvent.event.name = e.target.value;
        } else if (type.toLowerCase() === "date") {
            tempEvent.event.timestamp = e.getTime() / 1000;
        }
        changeSelectedEvent(tempEvent);
    };

    const handleChangeWorshipLeader = (e) => {
        var tempEvent = cloneDeep(selectedEvent);
        tempEvent.eventDetails.worshipLeader = e.target.value;
        changeSelectedEvent(tempEvent);
    };

    const handleRehearsals = () => {
        var tempEvent = cloneDeep(selectedEvent);
        tempEvent.eventDetails.rehearsals.push(addDateTime.getTime() / 1000);
        changeSelectedEvent(tempEvent);
        setAddDateTime(new Date());
    };

    return (
        <tr>
            {isAdmin &&
                <td className="edit-col">
                    {!isCreateEvent && (
                        <ButtonGroup
                            isEditable={isEditable}
                            toggleEdit={toggleEdit}
                            event={selectedEvent}
                            updateSelectedEvent={changeSelectedEvent}
                            originalData={originalEvent}
                            updateOriginalData={changeOriginalEvent}
                            setUpdateFlag={setUpdateFlag}
                        />
                    )}
                </td>
            }
            <td>
                <TextField
                    InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize,
                        },
                        disableUnderline: !isEditable,
                    }}
                    className="title"
                    multiline={true}
                    disabled={!isEditable}
                    id="outlined-basic"
                    variant={isEditable ? "outlined" : "standard"}
                    placeholder="No event name"
                    value={selectedEvent.event.name}
                    onChange={(e) => handleChangeEvent(e, "name")}
                />
            </td>
            <td className={isEditable ? "larger-col" : ""}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                        variant="inline"
                        margin="normal"
                        id="pickupDate"
                        inputVariant={isEditable ? "outlined" : "standard"}
                        format="d MMM yyyy - HH:mm"
                        ampm={false}
                        disabled={!isEditable}
                        value={new Date(event.event.timestamp * 1000)}
                        onChange={() => { }}
                        InputProps={{
                            disableUnderline: !isEditable,
                        }}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                            style: { display: isEditable ? "inline-flex" : "none" },
                        }}
                    />
                </MuiPickersUtilsProvider>
            </td>
            <td className="worshipLeader-col">
                <div className="worship-leader">
                    <FormControl variant="outlined" size="small">
                        {/* <InputLabel id="teamMemberSelect">Worship Leader</InputLabel> */}
                        <Select
                            className="worship-leader-select"
                            labelId="teamMemberSelect"
                            value={selectedEvent.eventDetails.worshipLeader}
                            onChange={handleChangeWorshipLeader}
                            disabled={!isEditable}
                        >
                            {worshipLeaders?.length > 0 &&
                                worshipLeaders.map((user, index) => {
                                    return <MenuItem value={user._id}>{user.firstname}</MenuItem>;
                                })}
                            {worshipLeaders?.length === 0 && (
                                <MenuItem value={0} disabled={true}>
                                    No Members
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
            </td>
            <td className={isEditable ? "larger-col" : ""}>
                <div className="rehearsals">
                    {selectedEvent.eventDetails.rehearsals?.length > 0 &&
                        selectedEvent.eventDetails.rehearsals.map((rehearsal) => (
                            <RehearsalTime
                                event={selectedEvent}
                                setSelectedEvent={changeSelectedEvent}
                                rehearsal={rehearsal}
                                isEditable={isEditable}
                            />
                        ))}
                    {selectedEvent.eventDetails.rehearsals?.length === 0 && (
                        <div className="no-rehearsal-message">No Rehearsal Times</div>
                    )}
                    {isEditable && (
                        <>
                            <div className="rehearsal-date-picker-wrapper">
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
                                            disableUnderline: !isEditable,
                                        }}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                            style: { display: isEditable ? "inline-flex" : "none" },
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="rehearsal-add-button-wrapper">
                                <Button
                                    onClick={handleRehearsals}
                                    disabled={!isEditable}
                                    aria-label="settings"
                                    className="rehearsal-add-button"
                                >
                                    <div className="add-text">Add</div>
                                    <AddCircleIcon />
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </td>
            {selectedEvent.eventDetails.teamList.map((role, index) => {
                return (
                    <td className={isEditable ? "larger-col" : ""}>
                        <RoleSection
                            data={role}
                            index={index}
                            type={"role"}
                            isEditable={isEditable}
                            key={role._id}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={changeSelectedEvent}
                        />
                    </td>
                );
            })}
            <td>
                <RoleSection
                    data={selectedEvent.eventDetails}
                    index={-1}
                    type={"addInfo"}
                    isEditable={isEditable}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={changeSelectedEvent}
                />
            </td>
            <td>
                {!isCreateEvent && (
                    <CardActions className="card-actions">
                        <Button
                            className="resources-button"
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={redirectToResources}
                        >
                            Resources
                        </Button>
                        <Button
                            className="notify-button"
                            variant="contained"
                            startIcon={<SendIcon className="send-icon" />}
                            color="primary"
                            size="small"
                            onClick={() => {
                                console.log("Notified");
                            }}
                        >
                            Notify
                        </Button>
                    </CardActions>
                )}
            </td>
        </tr>
    );
}
