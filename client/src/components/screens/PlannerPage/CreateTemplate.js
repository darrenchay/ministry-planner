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
import ConfirmDelete from '../../utils/ConfirmDelete'

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
    const empTemplate = {
        _id: 0
    }
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [event, setEvent] = useState();
    const [selectedTemplate, setSelectedTemplate] = useState(empTemplate);
    const [templates, setTemplates] = useState();
    const [open, setOpenDelete] = useState(false);

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
                    var temp = eventObj;
                    temp.eventDetails.teamList = selectedTemplate.teamList;
                    temp.eventDetails.worshipLeader = selectedTemplate.worshipLeader;
                    temp.event.name = selectedTemplate.teamName;
                }
                setEvent(eventObj);
            });
    }, [selectedTemplate]);

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
        // console.log(event)
        var templateObj = {
            teamName: event.event.name,
            worshipLeader: event.eventDetails.worshipLeader,
            teamList: event.eventDetails.teamList
        }
        // console.log("template: ", templateObj);
        if (selectedTemplate._id === 0) {
            TemplatesAPI.addTemplate(templateObj)
                .then(resp => {
                    console.log('Add Template Resp: ', resp);
                    setOpen(false);
                    setUpdateFlag(false);
                    setUpdateFlag(true);
                    setIsTemplate(1);
                })
                .catch(err => {
                    console.log("add template err", err);
                    setIsTemplate(2);
                });
        } else {
            TemplatesAPI.updateTemplate(templateObj, selectedTemplate._id)
                .then(resp => {
                    console.log('Update Template Resp: ', resp);
                    setOpen(false);
                    setUpdateFlag(false);
                    setUpdateFlag(true);
                    setIsTemplate(1);
                })
                .catch(err => {
                    console.log("Update template err", err);
                    setIsTemplate(2);
                });
        }

        // DO NOT DELETE UNTIL NEW CREATE EVENT IS DONE
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

    const handleDelete = () => {
        TemplatesAPI.deleteTemplate(selectedTemplate._id)
        .then(() => {
            handleClose();
            setOpen(false);
            setIsTemplate(3);
        })
        .catch(err => {
            setIsTemplate(4);
            console.log(err);
        })
    }

    const handleClose = () => {
        setOpenDelete(false);
    };

    const handleOpen = () => {
        setOpenDelete(true);
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
                        {selectedTemplate._id !== 0 &&
                            <>
                                <Button className='create-button' variant="contained" color='primary' size="small"
                                    onClick={handleSave}>Update Team</Button>
                                <Button className='delete-button' variant="contained" color='primary' size="small"
                                    onClick={handleOpen}>Delete Team</Button>
                            </>
                        }
                        {selectedTemplate._id === 0 &&
                            <>
                                <Button className='create-button' variant="contained" color='primary' size="small"
                                    onClick={handleSave}>Create Team</Button>
                            </>
                        }
                    </div>
                </div>
            }
            <ConfirmDelete
                keepMounted
                open={open}
                onClose={handleClose}
                handleDelete={handleDelete}
            />
        </div>
    )
}
