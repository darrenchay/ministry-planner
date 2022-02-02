import "./CreateEvent.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import cloneDeep from "lodash/cloneDeep";
import * as TemplatesAPI from '../../utils/Services/TemplatesAPI';
import {
    Select,
    MenuItem,
    Button
} from '@material-ui/core';
import * as RolesAPI from '../../utils/Services/RolesAPI';
import ConfirmDelete from '../../utils/Components/ConfirmDelete'

export default function TemplateModal({ setUpdateFlag, setOpen, setIsTemplate, leaders }) {
    const empTemplate = {
        _id: 0
    }
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
                    if (obj.roleName !== "Worship-Leader" && obj.roleName !== "Admin-Worship") {
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
        <>
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
                    <EventCard event={event} setUpdateFlag={null} isCreate={true} isTemplate={true} setEvent={setEvent} leaders={leaders} />
                    <div className='create-button-wrapper'>
                        {selectedTemplate._id !== 0 &&
                            <div>
                                <Button className='create-button' variant="contained" color='primary' size="small"
                                    onClick={handleSave}>Update Team</Button>
                                <Button className='delete-button' variant="contained" color='primary' size="small"
                                    onClick={handleOpen}>Delete Team</Button>
                            </div>
                        }
                        {selectedTemplate._id === 0 &&
                            <div>
                                <Button className='create-button' variant="contained" color='primary' size="small"
                                    onClick={handleSave}>Create Team</Button>
                                    
                            </div>
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
        </>
    )
}
