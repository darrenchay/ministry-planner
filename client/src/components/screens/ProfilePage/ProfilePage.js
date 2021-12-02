import './ProfilePage.scss';
import React, { useState } from "react";
import logo from './blank-profile-img.png';

/*
To be solved:

How to create divs dynamically from ministry and roles arrays? (<script>??)
How to store input profile picture?
- Firebase
-  https://www.youtube.com/watch?v=XeiOnkEI7XI
-  https://www.youtube.com/watch?v=8r1Pb6Ja90o
Edit mode (Priority)
Password hidden 
- (https://stackoverflow.com/questions/23393236/password-text-toggle-without-using-input-tag)
Look up jquery and how to use it 
- (https://www.youtube.com/watch?v=NW3FREAbV-8)

Profile Image CSS (alignment and stuff)

*/
export default function ProfilePage() {
    const [profileImg, setProfileImg] = useState(logo)
    // const [passwordShown, setPasswordShown] = useState(false);

    var mockUser = {
        firstName: "Evan",
        lastName: "Li",
        email: "youv.van@hotmail.com",
        phone: "+230 59494445",
        ministry: ["Music", "Dance"],
        roles: ["Vocals", "Worship Leader"]
        // etc
    }
    function imageHandler(event) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }
    
    return (
        <div className="profile-page-wrapper">
            {/* TO DO: Stack "Change photo" over Profile Picture, and appear on hover */}
            <div className="container">
                <div className="img-holder">
                    <img src={profileImg} alt="" id="img" className="img" />
                </div>
                <div className="label">
                    <label htmlFor="input" className="image-upload">
                        Change
                    </label>
                </div>
                <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler} />
                {/* <div className="label"> 
                    <label htmlFor="input" className="image-upload">
                        Change
                    </label>
                </div> */}
            </div>
            {/* Use typography instead*/}
            <h1 className="name">{mockUser.firstName + ' ' + mockUser.lastName}</h1>
            <div className="userInfo">
                <h2 className="subheaders">Contact</h2>
                <div className="contactInfo">
                    <div className="email">Email</div><div className="emailValue">{mockUser.email}</div>
                    <div class="row-border"></div>
                    <div className="password">Password</div>
                    <div className="passwordValue">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div> 
                    {/* <div className="password">Password</div> 
                    <div className="passwordValue">
                    <input type={passwordShown ? "text" : "password"} />
                    <button onClick={togglePassword}>Show Password</button>
                    </div> */}
                    <div class="row-border"></div>
                    <div className="phone">Phone</div><div className="phoneValue">{mockUser.phone}</div>
                </div>
                <h2 className="subheaders">Ministry</h2>
                <div className="ministryItems">
                    <div>{mockUser.ministry[0]}</div>
                    <div>{mockUser.ministry[1]}</div>
                </div>
                <h2 className="subheaders">Roles</h2>
                <div className="roleItems">
                    <div>{mockUser.roles[0]}</div>
                    <div>{mockUser.roles[1]}</div>
                </div>
            </div>
            {/*  
            <script type="text/javascript">
                for (let i = 0; i < mockUser.ministry.length; i++) {
                $('<div class="results" />').text(ministry[i]).appendTo('ministry');       
            }
            </script>
            */}
        </div>
        
    );
}