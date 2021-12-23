import "./CreateTemplate.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import cloneDeep from "lodash/cloneDeep";
import * as TemplatesAPI from '../../utils/Services/TemplatesAPI';
import {
    makeStyles,
    Select,
    MenuItem,
    Button
} from '@material-ui/core';
import * as RolesAPI from '../../utils/Services/RolesAPI';

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
        height: 600,
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TemplateModal({ setUpdateFlag, setOpen, setIsTemplate }) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [event, setEvent] = useState();
    const [selectedTemplate, setSelectedTemplate] = useState({ _id: 0 });
    const [templates, setTemplates] = useState();
    const empTemplate = {
        _id: 0
    }

    useEffect(() => {
        TemplatesAPI.getTemplates()
            .then(template => {
                setTemplates(template)
                // console.log(template)
            })
    }, [])

    // Loading Event Card Data
    useEffect(() => {
        var rolesArr = [];
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
                teamList: [],
                rehearsals: [],
                resourceId: "",
                additionalInfo: "",
                worshipLeader: ""
            }
        };
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
                eventObj.eventDetails.teamList = rolesArr;
                if (selectedTemplate._id !== 0) {
                    var temp = eventObj
                    temp.eventDetails.teamList = selectedTemplate.teamList
                    temp.eventDetails.worshipLeader = selectedTemplate.worshipLeader
                }
                setEvent(eventObj);
            });
    }, [selectedTemplate]);

    useEffect(() => {
        console.log("change in event: ",event)
    }, [event])

    const handleChangeTemplate = (e) => {
        if (e.target.value !== 0) {
            var tempTemplate = cloneDeep(templates.find(template => template._id === e.target.value))
            setSelectedTemplate(tempTemplate);
        }
        else {
            setSelectedTemplate(empTemplate)
        }
    }

    const handleSave = () => {
        console.log("eventObj", event);
        // EventsAPI.addEvent(event.event)
        //     .then(eventResp => {
        //         console.log('eventResp', eventResp);
        //         event.eventDetails.eventId = eventResp._id;
        //         var resourceObj = {
        //             eventDetailsId: "000"
        //         };
        //         ResourcesAPI.addResource(resourceObj)
        //             .then(resourceResp => {
        //                 console.log('resourceResp', resourceResp)
        //                 event.eventDetails.resourceId = resourceResp._id;
        //                 console.log(event.eventDetails);
        //                 EventsAPI.addEventDetails(event.eventDetails)
        //                     .then(eventDetailsResp => {
        //                         console.log('eventDetailsResp', eventDetailsResp)
        //                         eventResp.eventDetails.find(item => item.eventType === "worship")
        //                             .eventDetailsId = eventDetailsResp._id;
        //                         EventsAPI.updateEvent(eventResp, eventResp._id);
        //                         resourceResp.eventDetailsId = eventDetailsResp._id;
        //                         ResourcesAPI.updateResource(resourceResp, resourceResp._id).then((resp) => {
        //                             console.log('updateResource', resp);
        //                             setOpen(false);
        //                             setUpdateFlag(false);
        //                             setUpdateFlag(true);
        //                             setIsCreate(1);
        //                         });
        //                     }).catch(err => {
        //                         console.log("eventDetails err", err);
        //                         setIsCreate(2);
        //                     });
        //             }).catch(err => {
        //                 console.log("resource err", err);
        //                 setIsCreate(2);
        //             });
        //         })
        // .catch(err => {
        //     console.log("event err", err);
        //     setIsCreate(2);
        // });
    }

    return (
        <div style={modalStyle} className={classes.paper}>
            {event &&
                <div className='create-event-modal'>
                    <div className='header'>Team:
                        <Select
                            className='template-select'
                            labelId="templateSelect"
                            value={selectedTemplate._id}
                            onChange={handleChangeTemplate}
                        >
                            <MenuItem value={0}>New Team</MenuItem>
                            {templates?.length > 0 &&
                                templates
                                    .map((template, index) => {
                                        return <MenuItem value={template._id}>{template.teamName}</MenuItem>
                                    })
                            }
                        </Select>
                    </div>
                    <EventCard event={event} setUpdateFlag={null} isTemplate={true} setEvent={setEvent} />
                    <div className='create-button-wrapper'>
                        <Button className='create-button' variant="contained" color='primary' size="small"
                            onClick={handleSave}>Create Team</Button>
                        <Button className='delete-button' variant="contained" color='primary' size="small"
                            onClick={handleSave}>Delete Team</Button>
                    </div>
                </div>
            }
        </div>
    )
}
