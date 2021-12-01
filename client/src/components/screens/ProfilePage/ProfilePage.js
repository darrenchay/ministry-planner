import './ProfilePage.scss';
import React, { useState } from "react";
import logo from './blank-profile-img.png';

export default function ProfilePage() {
    const [profileImg, setProfileImg] = useState(logo)
    var mockUser = {
        firstName: "Evan"
        // etc
    }
    function imageHandler(event) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState == 2) {
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
                <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler} />
                <div className="label">
                    <label htmlFor="input" className="image-upload">
                        Edit
                    </label>
                </div>
            </div>
            {/* Use typography instead*/}
            <h1 className="name">Name</h1>
            <div className="">Email</div>

        </div>
    );
}