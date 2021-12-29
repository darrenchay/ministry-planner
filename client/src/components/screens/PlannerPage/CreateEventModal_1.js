import "./CreateEventModal.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import * as EventsAPI from '../../utils/Services/EventsAPI';
import {
    Button
} from '@material-ui/core';
import * as RolesAPI from '../../utils/Services/RolesAPI';
import * as ResourcesAPI from '../../utils/Services/ResourcesAPI';

export default function CreateEventModal({setUpdateFlag, setOpen, setIsCreate}) {
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
                        timestamp: Math.round((new Date()).getTime() / 1000)
                    },
                    eventDetails: {
                        eventId: "",
                        teamList: rolesArr,
                        rehearsals: [],
                        resourceId: "",
                        additionalInfo: "",
                        worshipLeader: ""
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
                                    setIsCreate(1);
                                });
                            }).catch(err => {
                                console.log("eventDetails err", err);
                                setIsCreate(2);
                            });
                    }).catch(err => {
                        console.log("resource err", err);
                        setIsCreate(2);
                    });
                })
            .catch(err => {
                console.log("event err", err);
                setIsCreate(2);
            });
    }

    const handleCancel = () => {
        setOpen(false);
        setUpdateFlag(false);
        setUpdateFlag(true);
    }

    return (
        <>
        {event &&
            <div className='create-event-modal'>
                <div className='header'>Create New Event</div>
                <EventCard event={event} setUpdateFlag={null} isCreateEvent={true} setEvent={setEvent} />
                <div className='create-button-wrapper'>
                <div>
                <Button className='create-button' variant="contained" color='primary' size="small"
                    onClick={handleSave}>Create event</Button>
                <Button className='cancel-button' variant="contained" color='primary' size="small"
                    onClick={handleCancel}>Cancel</Button>
                </div>
                </div>
            </div>
        }
        </>
    )
}
