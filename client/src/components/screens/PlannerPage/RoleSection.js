import React, { useState } from "react";
import {
    makeStyles,
    Card,
    CardHeader,
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

import ButtonGroup from './../../utils/EditButtonGroup'
import "./PlannerPage.scss";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

// The cards for each of the roles (includes handling for additional info as well)
export default function RoleSection ({ role, index, isEditable }) {
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