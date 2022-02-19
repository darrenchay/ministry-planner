import './TeamPage.scss';
import React, { useState, useEffect } from "react";
import * as UsersAPI from './../../utils/Services/UsersAPI'
import TeamMember from './TeamMember';
// import ButtonGroup from "../PlannerPage/EditButtonGroup";

export default function TeamPage() {
  const [users, setUsers] = useState({})
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
//   const [isEditable, toggleEdit] = useState(false);

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
                      {isAdmin &&  <th className="edit-col"></th>}
                      <th>First Name</th> 
                      <th>Last Name</th> 
                      <th>Ministry</th> 
                      <th>Roles</th>
                      <th>Email</th>
                      <th>Phone</th>
                  </tr>
                  {users?.length > 0 &&
                      users.map((user) => {
                          return (
                              <TeamMember teamMember={user} />

                          );
                      })}
              </table>
          {/* } */}
      </div>
      
    </div>

  );
}