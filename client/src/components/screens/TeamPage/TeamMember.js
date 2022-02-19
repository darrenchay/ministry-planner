import './TeamPage.scss';
import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
    makeStyles,
    IconButton,
    TextField,
    MenuItem,
    Checkbox,
    ListItemText,
    FormControl,
    Select,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDelete from '../../utils/Components/ConfirmDelete'
import * as UsersAPI from './../../utils/Services/UsersAPI'

const useStyles = makeStyles({
    noBorder: {
        border: "none",
    },
    resize: {
        fontSize: 22,
    },
    popover: {
        "& .MuiMenu-list": {
            padding: "8px 10px 4px !important",
        },
    },
});

export default function TeamMember({teamMember, setReload, reload, roles, ministries}) {
    const classes = useStyles();
    const [originalUser, setOriginalUser] = useState(teamMember);
    const [selectedUser, setSelectedUser] = useState(originalUser);
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const [isEditable, toggleEdit] = useState(false);
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        toggleEdit(!isEditable);
    };

    const handleSave = () => {
        UsersAPI.updateUser(selectedUser, selectedUser._id).then(() => {
            console.log("updated user");
            setOriginalUser(selectedUser);
        }).catch((err) => {
            console.log(err);
        })
        toggleEdit(false);
    }

    // If you cancel, reverts the changes you made back to original data
    const handleCancel = () => {
        setSelectedUser(originalUser)
        toggleEdit(false);
    }

    const handleDelete = () => {
        UsersAPI.deleteUser(selectedUser._id).then(() => {
            setReload(!reload);
            setOpen(false);
            console.log("reloading");
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const handleChangeLastName = (e) => {
        var tempUserInfo = cloneDeep(selectedUser);
        tempUserInfo.lastname = e.target.value;
        setSelectedUser(tempUserInfo);
    }

    const handleChangeFirstName = (e) => {
        var tempUserInfo = cloneDeep(selectedUser);
        tempUserInfo.firstname = e.target.value;
        setSelectedUser(tempUserInfo);
    }  

    const handleChangeEmail = (e) => {
        var tempUserInfo = cloneDeep(selectedUser);
        tempUserInfo.email = e.target.value;
        setSelectedUser(tempUserInfo);
    }

    const handleChangePhone = (e) => {
        var tempUserInfo = cloneDeep(selectedUser);
        tempUserInfo.phoneNumber = e.target.value;
        setSelectedUser(tempUserInfo);
    }

    const handleChangeRoles = (event) => {
        var tempUserInfo = cloneDeep(selectedUser);
        const {
          target: { value },
        } = event;
        tempUserInfo.role = typeof value === 'string' ? value.split(',') : value;
        setSelectedUser(tempUserInfo);
      };

    const handleChangeMinistry = (e) => {
        var tempUserInfo = cloneDeep(selectedUser);
        tempUserInfo.ministry = e.target.value;
        setSelectedUser(tempUserInfo);
    }
  return (
    <>
      <tr>                    
        {isAdmin &&
            <td className="edit-col">
            {!isEditable &&
                <>
                    <IconButton onClick={handleEdit} aria-label="settings" >
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleOpen} aria-label="settings" >
                        <DeleteIcon className="delete-icon" />
                    </IconButton>
                </>
            }
            {isEditable && 
                <>
                    <IconButton className='save-button' onClick={handleSave} aria-label="settings">
                        <DoneIcon />
                    </IconButton>
                    <IconButton className='cancel-button' onClick={handleCancel} aria-label="settings">
                        <ClearIcon />
                    </IconButton>
                </>
            }

            </td>
        }
            <td>
            <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='title'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="No First Name"
                        value={selectedUser.firstname}
                        onChange={handleChangeFirstName} />
            </td>
            <td>
            <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='title'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="No Last Name"
                        value={selectedUser.lastname}
                        onChange={handleChangeLastName} />
            </td>

            {isEditable && 
                <td>
                    <FormControl variant="outlined" size="small">
                        <Select
                            className="title"
                            value={selectedUser.ministry}
                            onChange={handleChangeMinistry}
                            disabled={!isEditable}
                        >
                            {ministries?.length > 0 &&
                                ministries.map((ministry, index) => {
                                    return <MenuItem value={ministry}>{ministry}</MenuItem>;
                                })}
                        </Select>
                    </FormControl>
                </td>
            }
            {!isEditable && 
                <td>{selectedUser.ministry}</td>
            }
            
            {!isEditable &&            
            <td>{selectedUser.role?.length > 0 &&
                    selectedUser.role
                    .map((role) => {
                    return (<div>{role}</div>)
                    })
                }
            </td>
            }
            {isEditable && 
            
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                multiple
                value={selectedUser.role}
                onChange={handleChangeRoles}
                renderValue={(selected) => selected.join(', ')}
                >
                {roles?.map((roleVal) => (
                    <MenuItem key={roleVal.name} value={roleVal.name}>
                        <Checkbox checked={selectedUser.role.indexOf(roleVal.name) > -1} />
                        <ListItemText primary={roleVal.name} />
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            }
            <td>
            <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='title'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="No Email"
                        value={selectedUser.email}
                        onChange={handleChangeEmail} />
            </td>
            <td>
            <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='title'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="No Phone Number"
                        value={selectedUser.phoneNumber}
                        onChange={handleChangePhone} />
            </td>


      </tr>
            <ConfirmDelete
                keepMounted
                open={open}
                onClose={handleClose}
                handleDelete={handleDelete}
            />
      </>
    );

}