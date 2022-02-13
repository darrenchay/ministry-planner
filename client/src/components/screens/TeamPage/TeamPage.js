import './TeamPage.scss';
import React, { useState, useEffect } from "react";
import * as UsersAPI from './../../utils/Services/UsersAPI'
// import ButtonGroup from "../PlannerPage/EditButtonGroup";

export default function TeamPage() {
  const [users, setUsers] = useState({})
  // const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  // const [isEditable, toggleEdit] = useState(false);

  useEffect(() => {
    UsersAPI.getUsers()
      .then((users) => {
          console.log(users);
          setUsers(users);
      });
  }, [])

  return (
    <div className="view-wrapper">
      <div className="page-title">
        Team Members
      </div>
      
      <div className="table-wrapper">
              <table>
                  <tr className="headers-row">
                      {/* <th className="edit-col"></th>  */}
                      <th>Name</th> 
                      <th>Ministry</th> 
                      <th>Roles</th>
                      <th>Email</th>
                      <th>Phone</th>
                  </tr>
                  {users?.length > 0 &&
                      users.map((user) => {
                          return (
                              <tr>
                                {/* 
                                {isAdmin &&
                                  <td className="edit-col">
                                      {!isCreateEvent && (
                                          <ButtonGroup
                                              isEditable={isEditable}
                                              toggleEdit={toggleEdit}
                                              event={selectedEvent}
                                              updateSelectedEvent={changeSelectedEvent}
                                              originalData={originalEvent}
                                              updateOriginalData={changeOriginalEvent}
                                              setUpdateFlag={setUpdateFlag}
                                          />
                                      )}
                                  </td>
                                }
                                 */}
                                <td>{user.firstname + ' ' + user.lastname}</td>
                                <td>{user.ministry}</td>
                                <td>{ user.role?.length > 0 &&
                                      user.role
                                      .map((role) => {
                                      return (<div>{role}</div>)
                                      })
                                    }
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                              </tr>
                          );
                      })}
              </table>
          {/* } */}
      </div>
      
    </div>

  );
}