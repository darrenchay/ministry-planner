import './TeamPage.scss';
import React, { useState, useEffect } from "react";
import * as UsersAPI from './../../utils/Services/UsersAPI'
import TeamMember from './TeamMember';
import * as RolesAPI from './../../utils/Services/RolesAPI'

export default function TeamPage() {
    const [users, setUsers] = useState({})
    const [roles, setRoles] = useState([]);
    const [reload, setReload] = useState(true);
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
//   const [isEditable, toggleEdit] = useState(false);

    useEffect(() => {
        RolesAPI.getAllRoles().then((rolesResp)=> {
            console.log(rolesResp)
            setRoles(rolesResp);
        })
    }, []);

  useEffect(() => {
    UsersAPI.getUsers()
      .then((users) => {
          console.log(users);
          setUsers(users);
      });
    
  }, [reload])

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
                  {users?.length > 0 && roles?.length > 0 && 
                      users.map((user) => {
                          return (
                              <TeamMember key={user._id} teamMember={user} setReload={setReload} reload={reload} roles={roles}/>

                          );
                      })}
              </table>
          {/* } */}
      </div>
      
    </div>

  );
}