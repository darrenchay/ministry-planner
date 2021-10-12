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

import "./PlannerPage.scss";
import * as UsersAPI from './../../utils/Services/UsersAPI';

// TODO: To find a way to use scss instead of makestyles here
const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
}));

const TeamMember = ({ teamMember, teamMapping, role, roleHandler, isEditable }) => {
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
        <div key={teamMember._id} className={isEditable ? 'team-member-wrapper-no-margin' : 'team-member-wrapper'}>
            <Typography className="team-member">
                {teamMember.firstname}
            </Typography>
            {tag?.length > 0 && <Typography className="tag" color="textSecondary">
                - {tag}
            </Typography>}
            {isEditable &&
                <IconButton className='clearIcon' onClick={handleDeleteMember}>
                    <CancelIcon />
                </IconButton>
            }
        </div>
    );
}

// The cards for each of the roles (includes handling for additional info as well)
export default function RoleSection({ data, index, type, isEditable, selectedEventDetails, setSelectedEventDetails }) {
    const classes = useStyles();
    const [selectedRole, changeSelectedRole] = useState(data);
    const [newRoleTag, changeNewRoleTag] = useState({ memberId: "", tag: "" });
    const [availableMembers, changeAvailableMembers] = useState([]);

    useEffect(() => {
        changeSelectedRole(data);
        // eslint-disable-next-line
    }, [isEditable]);

    useEffect(() => {
        if (index >= 0) {
            //Update that role in the teamList array in event details with the selected role object
            var tempSelectedEventDetails = cloneDeep(selectedEventDetails);
            var roleIdx = tempSelectedEventDetails.teamList.findIndex((role) => role._id === selectedRole._id);
            tempSelectedEventDetails.teamList[roleIdx] = selectedRole;
            setSelectedEventDetails(tempSelectedEventDetails);
        } else {
            var tempEventDetails = cloneDeep(selectedEventDetails);
            tempEventDetails.additionalInfo = selectedRole.additionalInfo;
            setSelectedEventDetails(tempEventDetails);
        }
        // eslint-disable-next-line
    }, [selectedRole]);

    // Updates the list of available members if role was updated (member added or deleted)
    useEffect(() => {
        if (selectedRole.roleName !== undefined) {
            UsersAPI.getUserByRole('worship', selectedRole.roleName)
                .then(resp => {
                    changeAvailableMembers(resp);
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
        // console.log(tempRole);
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
                type === "role" &&
                <Card key={index} className='card-role-section'>
                    <CardContent className='rolename-button-wrapper'>
                        <Typography className='rolename'>
                            {data.roleName}
                        </Typography>
                    </CardContent>
                    <CardContent className='team-members-wrapper'>
                        {selectedRole.teamMember.length > 0 && selectedRole.teamMember.map(user => (
                            <TeamMember
                                teamMember={user}
                                teamMapping={selectedRole.teamMapping}
                                isEditable={isEditable}
                                role={selectedRole}
                                roleHandler={changeSelectedRole}
                                key={user._id}
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

                        {isEditable &&
                            <div className='add-team-member-section'>
                                <FormControl variant="outlined" className='add-team-member' size='small'>
                                    <InputLabel id="teamMemberSelect">Team Member</InputLabel>
                                    <Select
                                        className='team-member-select'
                                        labelId="teamMemberSelect"
                                        label='Team Member'
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
                                    <TextField
                                        multiline={true}
                                        size='small'
                                        id="add-role"
                                        label="Tag"
                                        variant="outlined"
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
                type === "addInfo" &&
                <Card className='add-info-section'>
                    <CardContent className='rolename-button-wrapper'>
                        <Typography className='rolename'>
                            Additional Info
                        </Typography>
                    </CardContent>
                    <CardContent className='text-section'>
                        <TextField InputProps={{
                            classes: {
                                notchedOutline: classes.noBorder
                            },
                        }}
                            multiline={true}
                            disabled={!isEditable}
                            id="outlined-basic"
                            variant={isEditable ? "standard" : "outlined"}
                            placeholder="No additional info"
                            value={selectedRole.additionalInfo}
                            onChange={(e) => handleChangeRole(e, 'addInfo')} />
                    </CardContent>
                </Card>
            }
        </>
    );
}