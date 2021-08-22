import React, { useState } from "react";
import cloneDeep from "lodash/cloneDeep";
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
import * as UsersAPI from './../../utils/Services/UsersAPI'

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
    const [newRoleTag, changeNewRoleTag] = useState({ memberId: "", tag: "" });

    const handleChangeRole = (e, type) => {
        var tempRole = cloneDeep(selectedRole);
        if (type === 'addInfo') {
            tempRole.additionalInfo = e.target.value;
        }
        changeSelectedRole(tempRole);
    }

    const addRole = () => {
        var tempRole = cloneDeep(selectedRole);
        console.log(tempRole);
        if (newRoleTag.memberId !== null && newRoleTag.memberId !== "" ) {
            UsersAPI.getUser(newRoleTag.memberId)
                .then(resp => {
                    console.log("successfully retrieved user: " + resp.firstname + " " + resp.lastname);
                    tempRole.teamMapping.push(newRoleTag);
                    tempRole.teamMember.push(resp);
                    console.log(tempRole);
                    changeNewRoleTag({ memberId: "", tag: "" });
                    console.log(newRoleTag);
                    changeSelectedRole(tempRole);
                })
                .catch(err => {
                    console.log(err);
                    // Add error handler and do not make editable false, instead show an alert which says an error occured
                });
        } else {
            // Validation handling
        }
    }

    const handleAddRole = (e, type) => {
        var tempData = Object.assign({}, newRoleTag);
        if (type === 'id') {
            tempData.memberId = e.target.value;
        } else if (type === 'tag') {
            tempData.tag = e.target.value;
        }
        changeNewRoleTag(tempData);
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
                        {selectedRole.teamMember.length > 0 && selectedRole.teamMember.map(teamMember => (
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
                                        <CancelIcon />
                                    </IconButton>
                                }
                            </div>
                        ))}

                        {/* To Change to a textfield which onclick role becomes editable */}
                        {selectedRole.teamMember.length === 0 &&
                            <div>
                                <Typography component={'span'} color="textSecondary" gutterBottom>
                                    No members assigned
                                </Typography>
                            </div>}


                        {(isEditable && isRoleEditable) &&
                            <form className='add-team-member'>
                                <FormControl>
                                    <InputLabel shrink id="teamMemberSelect">Team Member</InputLabel>
                                    <Select
                                        labelId="teamMemberSelect"
                                        id="teamMemberSelect"
                                        value={newRoleTag.memberId}
                                        onChange={(e) => handleAddRole(e, "id")}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'6116f049194bf42a0254963d'}>Yoann</MenuItem>
                                        <MenuItem value={'6116f026194bf42a02549639'}>Darren</MenuItem>
                                        <MenuItem value={'6116f036194bf42a0254963b'}>Emile</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <TextField InputProps={{
                                        classes: {
                                            notchedOutline: classes.noBorder
                                        },
                                    }}
                                        multiline={true}
                                        disabled={!isEditable}
                                        id="add-role"
                                        label="Tag"
                                        variant="outlined"
                                        placeholder="Add a tag"
                                        value={newRoleTag.tag}
                                        onChange={(e) => handleAddRole(e, "tag")} />
                                </FormControl>
                                <IconButton onClick={addRole} aria-label="settings">
                                    <AddCircleIcon />
                                </IconButton>
                            </form>}
                    </CardContent>
                </Card>}
            {
                index < 0 &&
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
                </Card>
            }
        </>
    );
}