import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button,
    IconButton,
    Typography
} from '@material-ui/core';
import convertDate from "../../utils/ConvertDate";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

// Handles the toggling of the edit/save/cancel buttons
const ButtonGroup = ({ isEditable, toggleEdit }) => {
    const handleEdit = () => {
        toggleEdit(!isEditable);
        console.log("editing is " + isEditable);
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

// The cards for each of the roles
const RoleSection = ({ role, index, isEditable }) => {
    const [isRoleEditable, toggleRoleEdit] = useState(false);

    return (
        <>
            {index >= 0 &&
                <Card key={index} className='card2'>
                    <CardHeader
                        title={role.roleName}
                        classes='roleName'
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
                        <Typography color="textSecondary" gutterBottom>
                            {role.teamMember.length > 0 && role.teamMember.map((teamMember, index2) => (
                                <div key={index2}>{teamMember.firstname}</div>
                            ))}
                            {role.teamMember.length === 0 && <div>
                                No members assigned</div>}
                        </Typography>
                    </CardContent>
                </Card>}
            {index < 0 &&
                <Card className='card2'>
                    <CardHeader
                        title='Additional Info'
                        classes='roleName'
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
                        <Typography color="textSecondary" gutterBottom>
                            {role.additionalInfo}
                        </Typography>
                    </CardContent>
                </Card>}
        </>
    );
}

export default function EventCard({ event, index }) {
    const [isEditable, toggleEdit] = useState(false);

    useEffect(() => {
        console.log("Event Card click");
    }, [isEditable]);

    return (
        <Card className='card'>
            <CardHeader
                title={event.event.name}
                subheader={convertDate(parseInt(event.event.timestamp))}
                classes='roleName'
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
            <CardActions className='cardActions'>
                <Button className='resourcesButton' variant="contained"
                    color='primary' size="small">
                    Resources
                </Button>
            </CardActions>
        </Card>
    );
}
