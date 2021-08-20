import React, { useState } from "react";
import {
    makeStyles,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button,
    IconButton,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'

import convertDate from "../../utils/ConvertDate";
import "./PlannerPage.scss";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

// Handles the toggling of the edit/save/cancel buttons
const ButtonGroup = ({ isEditable, toggleEdit }) => {
    const handleEdit = () => {
        toggleEdit(!isEditable);
        // console.log("editing is " + isEditable);
    }
    return (
        <>
            {!isEditable && <IconButton onClick={handleEdit} aria-label="settings" >
                <EditIcon />
            </IconButton>}
            {isEditable && <>
                <IconButton onClick={handleEdit} aria-label="settings">
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleEdit} aria-label="settings">
                    <ClearIcon />
                </IconButton>
            </>}
        </>
    );
}

// The cards for each of the roles (includes handling for additional info as well)
const RoleSection = ({ role, index, isEditable }) => {
    const classes = useStyles();
    const [isRoleEditable, toggleRoleEdit] = useState(false);
    const [selectedMember, changeSelectedMember] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState(role.additionalInfo);

    const handleChangeSelected = (event) => {
        changeSelectedMember(event.target.value)
    }

    const handleTextFieldAddInfo = (event) => {
        setAdditionalInfo(event.target.value);
    }

    return (
        <>
            {index >= 0 &&
                <Card key={index} className='card-role-section'>
                    <CardHeader
                        title={role.roleName}
                        className='rolename'
                        action={
                            <>
                                {isEditable && <ButtonGroup
                                    isEditable={isRoleEditable}
                                    toggleEdit={toggleRoleEdit}
                                />}
                            </>
                        }
                    />
                    <CardContent>
                        {role.teamMember.length > 0 && role.teamMember.map(teamMember => (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                position: 'relative'
                            }} key={teamMember._id}>
                                <Typography color="textSecondary">
                                    {teamMember.firstname}
                                </Typography>
                                {(isEditable && isRoleEditable) &&
                                    <IconButton className='clearIcon'>
                                        <CancelIcon color='default' />
                                    </IconButton>
                                }
                            </div>
                        ))}

                        {/* To Change to a textfield which onclick role becomes editable */}
                        {role.teamMember.length === 0 &&
                            <div>
                                <Typography component={'span'} color="textSecondary" gutterBottom>
                                    No members assigned
                                </Typography>
                            </div>}


                        {(isEditable && isRoleEditable) &&
                            <FormControl className='formControl' display="inline">
                                <InputLabel shrink id="teamMemberSelect">Team Member</InputLabel>
                                <Select
                                    labelId="teamMemberSelect"
                                    id="teamMemberSelect"
                                    value={selectedMember}
                                    onChange={handleChangeSelected}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'id1'}>Yoann</MenuItem>
                                    <MenuItem value={'id1'}>Darren</MenuItem>
                                    <MenuItem value={'id1'}>Emile</MenuItem>
                                </Select>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                <IconButton onClick={handleChangeSelected} aria-label="settings">
                                    <AddCircleIcon />
                                </IconButton>
                            </FormControl>}
                    </CardContent>
                </Card>}
            {index < 0 &&
                <Card className='roleCard'>
                    <CardHeader
                        title='Additional Info'
                        action={
                            <>
                                {isEditable && <ButtonGroup
                                    isEditable={isRoleEditable}
                                    toggleEdit={toggleRoleEdit}
                                />}
                            </>
                        }
                    />
                    <CardContent>
                        <TextField InputProps={{
                            classes: {
                                notchedOutline: classes.noBorder
                            },
                        }}
                            multiline={true}
                            disabled={!isRoleEditable}
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="no additional info"
                            value={additionalInfo}
                            onChange={handleTextFieldAddInfo} />
                    </CardContent>
                </Card>}
        </>
    );
}

export default function EventCard({ event, index }) {
    const classes = useStyles();
    const [isEditable, toggleEdit] = useState(false);
    const [selectedDate, changeSelectedDate] = useState(new Date(event.event.time * 1000));
    const [eventName, changeEventName] = useState(event.event.name);

    const handleChangeEventName = (e) => {
        changeEventName(e.target.value);
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
                    color='primary' size="small">
                    Resources
                </Button>
            </CardActions>
        </Card>
    );
}