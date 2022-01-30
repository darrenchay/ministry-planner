import "./TableView.scss";
import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
import * as RolesAPI from "../../utils/Services/RolesAPI";
import TableViewRow from "./TableViewRow";
import CreateEvent from "./CreateEvent";
import CreateTemplate from "./CreateTemplate";

export default function TableView({
    events,
    setUpdateFlag,
    setIsCreate,
    createEventFlag,
    setCreateEventFlag,
    setIsTemplate,
    createTemplateFlag,
    setCreateTemplateFlag,
    leaders
}) {
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const [rolesHeaders, setRolesHeaders] = useState([]);

    useEffect(() => {
        RolesAPI.getAllRoles().then((roles) => {
            var tempRoles = [];
            roles.forEach((role, index) => {
                if (role.name !== "Worship-Leader") {
                    tempRoles.push(role.name);
                }
                if (index === roles.length - 1) {
                    setRolesHeaders(tempRoles);
                }
            });
        });
    }, [createEventFlag]);

    return (
        <div className="view-wrapper">
            <div className="table-wrapper">
                {rolesHeaders?.length > 0 &&
                    <table>
                        <tr className="headers-row">
                            {isAdmin && <th className="edit-col"></th>}
                            <th>Title</th>
                            <th>Date / Time</th>
                            <th className="worshipLeader-col">Worship Leader</th>
                            <th>Rehearsals</th>
                            {rolesHeaders?.length > 0 &&
                                rolesHeaders.map((role, index) => {
                                    return (
                                        <th className="role-col">{role}</th>
                                    );
                                })}
                            <th>Additional Info</th>
                            <th>Actions</th>
                        </tr>
                        {events?.length > 0 &&
                            events.map((event, index) => {
                                return (
                                    <TableViewRow
                                        key={event.event._id}
                                        event={event}
                                        setUpdateFlag={setUpdateFlag}
                                        isCreateEvent={false}
                                        setEvent={null}
                                        leaders={leaders}
                                    />
                                );
                            })}
                    </table>
                }
            </div>
            {createEventFlag && (
                <CreateEvent
                    setUpdateFlag={setUpdateFlag}
                    setIsCreate={setIsCreate}
                    setOpen={setCreateEventFlag}
                    leaders={leaders}
                />
            )}
            {createTemplateFlag && (
                <CreateTemplate
                    setUpdateFlag={setUpdateFlag}
                    setIsTemplate={setIsTemplate}
                    setOpen={setCreateTemplateFlag}
                    leaders={leaders}
                />
            )}
        </div>
    );
}
