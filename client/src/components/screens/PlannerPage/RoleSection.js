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

import ButtonGroup from './EditButtonGroup'
import "./PlannerPage.scss";

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

// The cards for each of the roles (includes handling for additional info as well)
export default function RoleSection({ role, index, isEditable }) {
    const classes = useStyles();
    const [isRoleEditable, toggleRoleEdit] = useState(false);
    const [originalRole, changeOriginalRole] = useState(role);
    const [selectedRole, changeSelectedRole] = useState(role);
    const [selectedMember, changeSelectedMember] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState(role.additionalInfo);

    const handleChangeSelected = (event) => {
        changeSelectedMember(event.target.value)
    }

    const handleChangeRole = (e, type) => {
        var tempRole = Object.assign({}, selectedRole);
        if(type === 'addInfo') {
            tempRole.additionalInfo = e.target.value;
        } 
        changeSelectedRole(tempRole);
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
                                    type={"role"}
                                    data={selectedRole}
                                    updateData={changeSelectedRole}
                                    originalData={originalRole}
                                    updateOriginalData={changeOriginalRole}
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
                                    type={"role"}
                                    data={selectedRole}
                                    updateData={changeSelectedRole}
                                    originalData={originalRole}
                                    updateOriginalData={changeOriginalRole}
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
                            value={selectedRole.additionalInfo}
                            onChange={(e) => handleChangeRole(e, 'addInfo')} />
                    </CardContent>
                </Card>}
        </>
    );
}