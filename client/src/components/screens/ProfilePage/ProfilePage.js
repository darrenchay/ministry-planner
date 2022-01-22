import './ProfilePage.scss';
import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import logo from './blank-profile-img.png';
// import {fs} from 'fs';
import {
    makeStyles,
    TextField,
    IconButton,
    InputAdornment,
} from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as UsersAPI from './../../utils/Services/UsersAPI'
/*
Resources:

Material UI Card Component: https://www.youtube.com/watch?v=M75MUZ1zVYM&list=RDCMUCW5YeuERMmlnqo4oq8vwUpg&start_radio=1&rv=M75MUZ1zVYM&t=808
*/

/*
To be solved:

How to create divs dynamically from ministry and roles arrays? (<script>??)
- map function (e.g. in Planner Page line 233)
How to store input profile picture?
- Firebase
-  https://www.youtube.com/watch?v=XeiOnkEI7XI
-  https://www.youtube.com/watch?v=8r1Pb6Ja90o

- MongoDB
-   Encode to base64 and store as binary data
Edit mode (Priority)
- isEditable (e.g. in EventCard)
Password hidden 
- (https://stackoverflow.com/questions/23393236/password-text-toggle-without-using-input-tag)
- https://stackoverflow.com/questions/63422502/how-to-hide-unhide-password-using-material-ui-and-react-hook-forms
- Look up Material UI
Look up jquery and how to use it 
- (https://www.youtube.com/watch?v=NW3FREAbV-8)

Profile Image CSS (alignment and stuff)

TO DO:
Material UI Password
Handle save and cancel

Load page after info loaded e.g. PlannerPage line 281
*/

const useStyles = makeStyles(() => ({
    noBorder: {
        border: "none",
    },
    resize: {
        fontSize: 16
    },
    infoIcon: {
        "&:hover": {
          backgroundColor: "transparent"
        }
    }
}));

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
  ))(`
      font-size: 14px;
`);

export default function ProfilePage() {
    const classes = useStyles();
    const [profileImg, setProfileImg] = useState(logo)
    const [isEditable, toggleEdit] = useState(false);
    const [originalUserInfo, setOriginalUserInfo] = useState({});
    const [selectedUserInfo, setSelectedUserInfo] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // eslint-disable-next-line
    const [openSuccessUpdateUserInfo, setOpenSuccessUpdateUserInfo] = useState(false);
    // eslint-disable-next-line
    const [openErrorUpdateUserInfo, setOpenErrorUpdateUserInfo] = useState(false);
   
    useEffect(() => {
        UsersAPI.getUser("61d67a800c5e2a4accf528ea")
            .then((user) => {
                console.log(user);
                setOriginalUserInfo(user);
                // setProfileImg('data:image/png;base64,' + (btoa(String.fromCharCode(...new Uint8Array(user.profileImage.data)))))
            });
    }, [])

    useEffect(() => {
        setSelectedUserInfo(originalUserInfo);
    }, [originalUserInfo])

    function imageHandler(e) {
        const reader = new FileReader();
        var tempUserInfo = cloneDeep(selectedUserInfo);
        
        reader.onload = () => {
            if (reader.readyState === 2) {
                console.log(reader.result.split(",")[1])
                let bindata = new Buffer(reader.result.split(",")[1],"base64");
                tempUserInfo.profileImage = bindata;
                setSelectedUserInfo(tempUserInfo);
                //UsersAPI.updateUser({"profileImage": bindata}, "61d67a800c5e2a4accf528ea")
                handleSave();
                /*
                let outputBuff = btoa(String.fromCharCode(...new Uint8Array(bindata.data)))
                setProfileImg(outputBuff)
                console.log(profileImg)
                */
               setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleChangeEmail = (e) => {
        var tempUserInfo = cloneDeep(selectedUserInfo);
        tempUserInfo.email = e.target.value;
        setSelectedUserInfo(tempUserInfo);
    }

    const handleChangePhone = (e) => {
        var tempUserInfo = cloneDeep(selectedUserInfo);
        tempUserInfo.phoneNumber = e.target.value;
        setSelectedUserInfo(tempUserInfo);
    }

    const handleChangeFirstName = (e) => {
        var tempUserInfo = cloneDeep(selectedUserInfo);
        tempUserInfo.firstname = e.target.value;
        setSelectedUserInfo(tempUserInfo);
    }
    const handleChangeLastName = (e) => {
        var tempUserInfo = cloneDeep(selectedUserInfo);
        tempUserInfo.lastname = e.target.value;
        setSelectedUserInfo(tempUserInfo);
    }

    const handleChangePassword = (e) => {
        var tempUserInfo = cloneDeep(selectedUserInfo);
        tempUserInfo.password = e.target.value;
        setSelectedUserInfo(tempUserInfo);
    }

    const handleEdit = () => {
        toggleEdit(!isEditable);
    };

    const handleCloseSnack = () => {
        setOpenSuccessUpdateUserInfo(false);
        setOpenErrorUpdateUserInfo(false);
    };

    const handleSave = () => {
        // saving the event
        // console.log(selectedUserInfo)
        UsersAPI.updateUser(selectedUserInfo, "61d67a800c5e2a4accf528ea")
            .then(resp => {
                console.log("successfully updated " + resp.nModified + "user");
                handleCloseSnack();
                setOpenSuccessUpdateUserInfo(true);
                setOriginalUserInfo(selectedUserInfo);
            })
            .catch(err => {
                setOpenErrorUpdateUserInfo(true)
                console.log(err);
                // Add error handler and do not make editable false, instead show an alert which says an error occured
            });
     
        toggleEdit(false);
        setShowPassword(false);
    }

    // If you cancel, reverts the changes you made back to original data
    const handleCancel = () => {
        setSelectedUserInfo(originalUserInfo);
        toggleEdit(false);
        setShowPassword(false);
    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    
    return (
        <>
        {Object.keys(selectedUserInfo).length > 0 && 
        <div className="profile-page-wrapper">
            {/* TO DO: Stack "Change photo" over Profile Picture, and appear on hover */}
            <div className="profile-pic-container">
                <div className="img-holder">
                    <img src={profileImg} alt="" id="img" className="img" />
                </div>
                
                <div className="label">
                    <label htmlFor="input" className="image-upload-label">
                        Edit
                    </label>
                </div>
                 
                <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler} />
            </div>
            {/* Use typography instead*/}
            <h1 className="titleName">{originalUserInfo.firstname + ' ' + originalUserInfo.lastname}</h1>
            <div className="userInfo">
                
                <div className="header">
                    <div className="contact-header">
                        <h2 className="subheaders">Contact</h2>
                    </div>
                    
                    <div className="edit-wrapper">
                        {!isEditable && 
                            <>
                                <IconButton onClick={handleEdit} aria-label="settings" className="edit-icon">
                                    <EditIcon />
                                </IconButton>
                            </>
                        }
                        {isEditable && 
                            <>
                                <IconButton onClick={handleSave} aria-label="settings" className="save-icon">
                                    <DoneIcon />
                                </IconButton>
                                <IconButton onClick={handleCancel} aria-label="settings" className="cancel-icon">
                                    <ClearIcon />
                                </IconButton>
                            </>
                        }
                    </div>
                </div>
                
                <div className="contactInfo">
                    <div className="firstname">First Name</div>
                    <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='firstnameValue'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="Enter First Name"
                        value={selectedUserInfo.firstname}
                        onChange={handleChangeFirstName} />
                    <div class="row-border"></div>
                    <div className="lastname">Last Name</div>
                    <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='lastnameValue'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="Enter First Name"
                        value={selectedUserInfo.lastname}
                        onChange={handleChangeLastName} />
                    <div class="row-border"></div>
                    <div className="email">Email</div>
                    <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: true,
                        endAdornment: isEditable && (
                        
                            <InputAdornment position="end" disabled={!isEditable}>
                                <CustomTooltip title="Contact Admin to change email" placement="top">
                                    <IconButton className={classes.infoIcon}>
                                        <InfoIcon/>
                                    </IconButton>
                                </CustomTooltip>
                            </InputAdornment>
                            
                          )
                    }}
                        className={isEditable ? 'emailValueEdit': 'emailValue'}
                        multiline={true}
                        disabled
                        id="outlined-basic"
                        variant="standard"
                        placeholder="Enter email"
                        value={selectedUserInfo.email}
                        onChange={handleChangeEmail} />
                    <div class="row-border"></div>
                    <div className="password">Password</div>
                        <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable, 
                        
                        endAdornment: isEditable && (
                        
                            <InputAdornment position="end" disabled={!isEditable}>
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                            
                          )
    
                        }}
                        className='passwordValue'
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="Enter password"
                        type={isEditable && showPassword?"text":"password"}
                        value={selectedUserInfo.password}
                        onChange={handleChangePassword} />

                    <div class="row-border"></div>
                    <div className="phone">Phone</div>
                    <TextField InputProps={{
                        classes: {
                            // notchedOutline: classes.noBorder,
                            input: classes.resize
                        },
                        disableUnderline: !isEditable
                    }}
                        className='phoneValue'
                        multiline={true}
                        disabled={!isEditable}
                        id="outlined-basic"
                        variant={isEditable ? "outlined" : "standard"}
                        placeholder="Enter Phone Number"
                        value={selectedUserInfo.phoneNumber}
                        onChange={handleChangePhone} />
                </div>
                <h2 className="subheaders">Ministry</h2>
                <div className="ministryItems">
                    <div>{selectedUserInfo.ministry}</div>
                    {/* <div>{originalUserInfo.ministry[1]}</div> */}
                </div>
                <h2 className="subheaders">Roles</h2>
                <div className="roleItems">
                    {   selectedUserInfo.role?.length > 0 &&
                        selectedUserInfo.role
                        .map((role) => {
                            return (<div>{role}</div>)
                        })
                    }
                </div>
            </div>
            {/*  
            <script type="text/javascript">
                for (let i = 0; i < originalUserInfo.ministry.length; i++) {
                $('<div class="results" />').text(ministry[i]).appendTo('ministry');       
            }
            </script>
            */}
        </div>}
        </>
        
    );
}