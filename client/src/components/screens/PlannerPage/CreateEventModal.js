import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import * as EventsAPI from '../../utils/Services/EventsAPI';
import {
    makeStyles,
    Button
} from '@material-ui/core';
import * as RolesAPI from './../../utils/Services/RolesAPI';
import * as ResourcesAPI from './../../utils/Services/ResourcesAPI';
    
function getModalStyle() {
    const top = 50;
    const left = 50;
    
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
    
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        height: 450,
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function CreateEventModal({setUpdateFlag, setOpen}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [event, setEvent] = useState();

    useEffect(() => {
        var rolesArr = [];
        RolesAPI.getAllRoles()
            .then(roles => {
                roles.forEach(role => {
                    var obj = {
                        roleId: role._id,
                        roleName: role.name,
                        teamMember: [],
                        teamMapping: []
                    }
                    if (obj.roleName !== "Worship-Leader") {
                        rolesArr.push(obj);
                    }
                });
                var eventObj = {
                    event: {
                        name: "",
                        description: "",
                        eventDetails: [
                            {
                                eventDetailsId: "",
                                eventType: "worship"
                            }
                        ],
                        timestamp: (new Date()/1000).toString()
                    },
                    eventDetails: {
                        eventId: "",
                        teamList: rolesArr,
                        rehearsals: [
                            {
                                timestamp: "",
                                location: ""
                            }
                        ],
                        resourceId: "",
                        additionalInfo: ""
                    }
                };
                setEvent(eventObj);
            });
    }, []);

    const handleSave = () => {
        console.log("eventObj", event);
        EventsAPI.addEvent(event.event)
            .then(eventResp => {
                console.log('eventResp', eventResp);
                event.eventDetails.eventId = eventResp._id;
                var resourceObj = {
                    eventDetailsId: "000"
                };
                ResourcesAPI.addResource(resourceObj)
                    .then(resourceResp => {
                        console.log('resourceResp', resourceResp)
                        event.eventDetails.resourceId = resourceResp._id;
                        console.log(event.eventDetails);
                        EventsAPI.addEventDetails(event.eventDetails)
                            .then(eventDetailsResp => {
                                console.log('eventDetailsResp', eventDetailsResp)
                                eventResp.eventDetails.find(item => item.eventType === "worship")
                                    .eventDetailsId = eventDetailsResp._id;
                                EventsAPI.updateEvent(eventResp, eventResp._id);
                                resourceResp.eventDetailsId = eventDetailsResp._id;
                                ResourcesAPI.updateResource(resourceResp, resourceResp._id).then((resp) => {
                                    console.log('updateResource', resp);
                                    setOpen(false);
                                    setUpdateFlag(false);
                                    setUpdateFlag(true);
                                });
                            }).catch(err => {
                                console.log("eventDetails err", err);
                            });
                    }).catch(err => {
                        console.log("resource err", err);
                    });
            })
            .catch(err => {
                console.log("event err", err);
            });
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Create new event</h2>
            {event &&
                <>
                <EventCard event={event} setUpdateFlag={null} isCreateEvent={true} setEvent={setEvent} />
                <Button className='resources-button' variant="contained" color='primary' size="small"
                    onClick={handleSave}>Create Event</Button>
                </>
            }
        </div>
    )
}