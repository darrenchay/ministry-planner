import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
    makeStyles,
    Card,
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

const TeamMember = ({ teamMember, teamMapping, role, roleHandler, isEditable, isRoleEditable }) => {
    const [tag, setTag] = useState({})

    // Creates a copy of the role object and deletes the member (and mapping) from the copy and updates the selected role with the copy
    const handleDeleteMember = () => {
        var tempRole = cloneDeep(role);
        var tempTeamMembers = role.teamMember.filter((filteredTeamMember) => filteredTeamMember._id !== teamMember._id);
        var tempTeamMappings = role.teamMapping.filter((filteredTeamMapping) => filteredTeamMapping.memberId !== teamMember._id);
        tempRole.teamMember = tempTeamMembers;
        tempRole.teamMapping = tempTeamMappings;
        roleHandler(tempRole);
    }

    useEffect(() => {
        if (Object.keys(teamMapping).length > 0) {
            var mapping = teamMapping.find(mapping => teamMember._id === mapping.memberId);
            if (mapping !== undefined) {
                setTag(mapping.tag);
            }
        }
    }, [role, teamMember, teamMapping]);

    return (
        <div key={teamMember._id} className={isRoleEditable ? 'team-member-wrapper-no-margin' : 'team-member-wrapper'}>
            <Typography className="team-member">
                {teamMember.firstname}
            </Typography>
            {tag?.length > 0 && <Typography className="tag" color="textSecondary">
                - {tag}
            </Typography>}
            {(isEditable && isRoleEditable) &&
                <IconButton className='clearIcon' onClick={handleDeleteMember}>
                    <CancelIcon />
                </IconButton>
            }
        </div>
    );
}

// The cards for each of the roles (includes handling for additional info as well)
export default function RoleSection({ role, index, isEditable }) {
    const classes = useStyles();
    const [isRoleEditable, toggleRoleEdit] = useState(false);
    const [originalRole, changeOriginalRole] = useState(role);
    const [selectedRole, changeSelectedRole] = useState(role);
    const [newRoleTag, changeNewRoleTag] = useState({ memberId: "", tag: "" });
    const [availableMembers, changeAvailableMembers] = useState([]);

    useEffect(() => {
        if (!isEditable) {
            toggleRoleEdit(false);
            changeSelectedRole(originalRole);
        }
    }, [isEditable, originalRole]);

    useEffect(() => {
        if (selectedRole.roleName !== undefined) {
            UsersAPI.getUserByRole('worship', selectedRole.roleName)
                .then(resp => {
                    changeAvailableMembers(resp)
                })
        }
    }, [selectedRole]);

    const handleChangeRole = (e, type) => {
        var tempRole = cloneDeep(selectedRole);
        if (type === 'addInfo') {
            tempRole.additionalInfo = e.target.value;
        }
        changeSelectedRole(tempRole);
    }

    //Can be refactored to use available members instead of calling users again
    const addRole = () => {
        var tempRole = cloneDeep(selectedRole);
        console.log(tempRole);
        if (newRoleTag.memberId !== null && newRoleTag.memberId !== "") {
            UsersAPI.getUser(newRoleTag.memberId)
                .then(resp => {
                    console.log("successfully retrieved user: " + resp.firstname + " " + resp.lastname);
                    tempRole.teamMapping.push(newRoleTag);
                    tempRole.teamMember.push(resp);
                    changeNewRoleTag({ memberId: "", tag: "" }); //reset add member section
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
            {
                index >= 0 &&
                <Card key={index} className='card-role-section'>
                    {/* <CardHeader
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
                    /> */}
                    <CardContent className='rolename-button-wrapper'>
                        <Typography className='rolename'>
                            {role.roleName}
                        </Typography>
                        {isEditable && <ButtonGroup
                            isEditable={isRoleEditable}
                            toggleEdit={toggleRoleEdit}
                            type={"role"}
                            data={selectedRole}
                            updateData={changeSelectedRole}
                            originalData={originalRole}
                            updateOriginalData={changeOriginalRole}
                        />}
                    </CardContent>
                    <CardContent className='team-members-wrapper'>
                        {selectedRole.teamMember.length > 0 && selectedRole.teamMember.map(user => (
                            <TeamMember
                                teamMember={user}
                                teamMapping={selectedRole.teamMapping}
                                isEditable={isEditable}
                                isRoleEditable={isRoleEditable}
                                role={selectedRole}
                                roleHandler={changeSelectedRole}
                            />
                        ))}

                        {selectedRole.teamMember.length === 0 &&
                            <div>
                                <CardContent className='no-members-text'>
                                    <TextField InputProps={{
                                        classes: {
                                            notchedOutline: classes.noBorder
                                        },
                                    }}
                                        multiline={true}
                                        disabled={true}
                                        color='secondary'
                                        id="outlined-basic"
                                        variant="outlined"
                                        placeholder="No members assigned" />
                                </CardContent>
                            </div>
                        }

                        {(isEditable && isRoleEditable) &&
                            <div className='add-team-member-section'>
                                <FormControl className='add-team-member'>
                                    <InputLabel id="teamMemberSelect">Team Member</InputLabel>
                                    <Select
                                        className='team-member-select'
                                        labelId="teamMemberSelect"
                                        id="teamMemberSelect"
                                        placeholder="Select a member"
                                        value={newRoleTag.memberId}
                                        onChange={(e) => handleAddRole(e, "id")}
                                    >
                                        {availableMembers?.length > 0 &&
                                            availableMembers
                                                .filter(member => {
                                                    //Check if member was already assigned, if yes, remove that member
                                                    var found = true;
                                                    selectedRole.teamMember.forEach(selectedMember => {
                                                        if (selectedMember._id === member._id) {
                                                            found = false;
                                                        }
                                                    })
                                                    return found;
                                                })
                                                .map((member, index) => {
                                                    return <MenuItem value={member._id}>{member.firstname}</MenuItem>
                                                })
                                        }

                                        {/* To refactor */}
                                        {availableMembers.filter(member => {
                                            var found = true;
                                            selectedRole.teamMember.forEach(selectedMember => {
                                                if (selectedMember._id === member._id) {
                                                    found = false;
                                                }
                                            })
                                            return found;
                                        }).length === 0 &&
                                            <MenuItem value={0} disabled={true}>No Members</MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className="add-tag">
                                    <TextField InputProps={{
                                        classes: {
                                            notchedOutline: classes.noBorder
                                        },
                                    }}
                                        multiline={true}
                                        disabled={!isEditable}
                                        id="add-role"
                                        label="Tag"
                                        variant={isRoleEditable ? "standard" : "outlined"}
                                        placeholder="Add a tag"
                                        value={newRoleTag.tag}
                                        onChange={(e) => handleAddRole(e, "tag")} />
                                </FormControl>
                                <IconButton onClick={addRole} aria-label="settings" className='add-button'>
                                    <AddCircleIcon />
                                </IconButton>
                            </div>
                        }
                    </CardContent>
                </Card>
            }
            {
                index < 0 &&
                <Card className='add-info-section'>
                    {/* <CardHeader
                        title='Additional Info'
                        className='rolename'
                        action={
                            <>
                                {isEditable && <ButtonGroup
                                    isEditable={isRoleEditable}
                                    toggleEdit={toggleRoleEdit}
                                    type={"eventDetails"}
                                    data={selectedRole}
                                    updateData={changeSelectedRole}
                                    originalData={originalRole}
                                    updateOriginalData={changeOriginalRole}
                                />}
                            </>
                        }
                    /> */}
                    <CardContent className='rolename-button-wrapper'>
                        <Typography className='rolename'>
                            Additional Info
                        </Typography>
                        {isEditable && <ButtonGroup
                            isEditable={isRoleEditable}
                            toggleEdit={toggleRoleEdit}
                            type={"eventDetails"}
                            data={selectedRole}
                            updateData={changeSelectedRole}
                            originalData={originalRole}
                            updateOriginalData={changeOriginalRole}
                        />}
                    </CardContent>
                    <CardContent className='text-section'>
                        <TextField InputProps={{
                            classes: {
                                notchedOutline: classes.noBorder
                            },
                        }}
                            multiline={true}
                            disabled={!isRoleEditable}
                            id="outlined-basic"
                            variant={isRoleEditable ? "standard" : "outlined"}
                            placeholder="No additional info"
                            value={selectedRole.additionalInfo}
                            onChange={(e) => handleChangeRole(e, 'addInfo')} />
                    </CardContent>
                </Card>
            }
        </>
    );
}