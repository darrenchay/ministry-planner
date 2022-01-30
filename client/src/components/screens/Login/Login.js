import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
    Paper,
    Typography
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import "./Login.scss"
import logo from "../../../Assets/Images/stpaul-logo.png";

export default function LoginPage() {
 
    const { isAuthenticated } = useAuth0();
    const history = useHistory();
    const [loginHovered, setLoginHovered] = useState(false);

    const { loginWithRedirect } = useAuth0();

    const login = () => {
        loginWithRedirect();
    }

    useEffect(() => {
        if (isAuthenticated === true) {
            history.push("/home");
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    const handleOnMouseOver = () => {
        setLoginHovered(true);
    };

    const handleOnMouseLeave = () => {
        setLoginHovered(false);
    };
    

    return (
        <Paper elevation={3} className="login-wrapper">
            <Typography className="title" variant="h2">
                WELCOME TO MINISTRY PLANNER
            </Typography>
            {/* 
            <Paper elevation={0} className="logo-background">
                <img src={logo} alt="logo" />
            </Paper>
             */}
            <div className="description-container">
                <Typography className="description" variant="h4">
                    Please log in or sign up to see events ☺
                </Typography>
                <Button
                    className={loginHovered ? "login-button-hovered": "login-button"}
                    onClick={login}  
                    onMouseOver={handleOnMouseOver}  
                    onMouseLeave={handleOnMouseLeave}
                    variant="h5"
                >
                    Log In
                </Button>
            </div>
        </Paper>
    );
}