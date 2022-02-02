import "./CreateEvent.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import * as EventsAPI from "../../utils/Services/EventsAPI";
import * as TemplatesAPI from "../../utils/Services/TemplatesAPI";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import * as RolesAPI from "../../utils/Services/RolesAPI";
import * as ResourcesAPI from "../../utils/Services/ResourcesAPI";
import cloneDeep from "lodash/cloneDeep";

export default function CreateEvent({ setUpdateFlag, setOpen, setIsCreate, leaders }) {
  const [empTemplate, setEmpTemplate] = useState({
    _id: 0,
    name: "",
    teamList: [],
    worshipLeader: "",
  })
  const [event, setEvent] = useState();
  const [templates, setTemplates] = useState();
  const [selectedTemplate, setSelectedTemplate] = useState(empTemplate);

  useEffect(() => {
    var rolesArr = [];
    RolesAPI.getAllRoles().then((roles) => {
      roles.forEach((role) => {
        var obj = {
          roleId: role._id,
          roleName: role.name,
          teamMember: [],
          teamMapping: [],
        };
        if (obj.roleName !== "Worship-Leader" && obj.roleName !== "Admin-Worship") {
            console.log(obj.roleName)
          rolesArr.push(obj);
        }
        console.log(rolesArr)
      });
      var eventObj = {
        event: {
          name: "",
          description: "",
          eventDetails: [
            {
              eventDetailsId: "",
              eventType: "worship",
            },
          ],
          timestamp: Math.round(new Date().getTime() / 1000),
        },
        eventDetails: {
          eventId: "",
          teamList: rolesArr,
          rehearsals: [],
          resourceId: "",
          additionalInfo: "",
          worshipLeader: "",
        },
      };
      setEvent(eventObj);
      var newTemp = {
        _id: 0,
        name: "",
        teamList: rolesArr,
        worshipLeader: "",
      };
      setEmpTemplate(newTemp);
    });
    TemplatesAPI.getTemplates().then((templates) => {
      setTemplates(templates);
    });
  }, []);

  const handleSave = () => {
    console.log("eventObj", event);
    EventsAPI.addEvent(event.event)
      .then((eventResp) => {
        console.log("eventResp", eventResp);
        event.eventDetails.eventId = eventResp._id;
        var resourceObj = {
          eventDetailsId: "000",
        };
        ResourcesAPI.addResource(resourceObj)
          .then((resourceResp) => {
            console.log("resourceResp", resourceResp);
            event.eventDetails.resourceId = resourceResp._id;
            console.log(event.eventDetails);
            EventsAPI.addEventDetails(event.eventDetails)
              .then((eventDetailsResp) => {
                console.log("eventDetailsResp", eventDetailsResp);
                eventResp.eventDetails.find(
                  (item) => item.eventType === "worship"
                ).eventDetailsId = eventDetailsResp._id;
                EventsAPI.updateEvent(eventResp, eventResp._id);
                resourceResp.eventDetailsId = eventDetailsResp._id;
                ResourcesAPI.updateResource(
                  resourceResp,
                  resourceResp._id
                ).then((resp) => {
                  console.log("updateResource", resp);
                  setOpen(false);
                  setUpdateFlag(false);
                  setUpdateFlag(true);
                  setIsCreate(1);
                });
              })
              .catch((err) => {
                console.log("eventDetails err", err);
                setIsCreate(2);
              });
          })
          .catch((err) => {
            console.log("resource err", err);
            setIsCreate(2);
          });
      })
      .catch((err) => {
        console.log("event err", err);
        setIsCreate(2);
      });
  };

  const handleCancel = () => {
    setOpen(false);
    setUpdateFlag(false);
    setUpdateFlag(true);
  };

  useEffect(() => {
    if (event) {
        var tempEvent = cloneDeep(event);
        tempEvent.eventDetails.teamList = selectedTemplate.teamList;
        tempEvent.eventDetails.worshipLeader = selectedTemplate.worshipLeader;
        setEvent(tempEvent);
    }
    // eslint-disable-next-line
  }, [selectedTemplate]);

  const handleChangeTemplate = (e) => {
    if (e.target.value !== 0) {
        var tempTemplate = cloneDeep(templates.find(template => template._id === e.target.value))
        setSelectedTemplate(tempTemplate);
    }
    else {
        setSelectedTemplate(empTemplate)
    }
  };

  return (
    <>
      {event && (
        <div className="create-event-modal">
          <div className="header">
            <div>Create New Event</div>
            <div className="template-select-wrapper">
            <FormControl variant='outlined' size='small' fullWidth>
            <InputLabel id="templateSelect">Selected Team</InputLabel>
            <Select
              className="template-select"
              labelId="templateSelect"
              label="Selected Team"
              value={selectedTemplate._id}
              onChange={handleChangeTemplate}
            >
              <MenuItem value={0}>No Team</MenuItem>
              {templates?.length > 0 &&
                templates.map((template, index) => {
                  return (
                    <MenuItem value={template._id}>
                      {template.teamName}
                    </MenuItem>
                  );
                })}
            </Select>
            </FormControl>
            </div>
          </div>
          <EventCard
            event={event}
            setUpdateFlag={null}
            isCreate={true}
            setEvent={setEvent}
            leaders={leaders}
          />
          <div className="create-button-wrapper">
            <div>
              <Button
                className="create-button"
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSave}
              >
                Create event
              </Button>
              <Button
                className="cancel-button"
                variant="contained"
                color="primary"
                size="small"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
