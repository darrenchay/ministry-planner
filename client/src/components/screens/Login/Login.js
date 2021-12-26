import React, { useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
    Paper,
    Typography
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import "./Login.scss"
import logo from "../../../Assets/Images/stpaul-logo.png";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const login = () => {
        loginWithRedirect();
    }

    return (
        <Button
            className="login-button"
            onClick={login}
        >
            Log In
        </Button>
    );
};

export default function LoginPage() {
    const { isAuthenticated } = useAuth0();
    const history = useHistory();

    useEffect(() => {
        if (isAuthenticated === true) {
            history.push("/home");
        }
        // eslint-disable-next-line
    }, [isAuthenticated]);

    return (
        <Paper elevation={3} className="login-wrapper">
            <Typography className="title" variant="h2">
                Welcome to Ministry Planner
            </Typography>
            <Paper elevation={0} className="logo-background">
                <img src={logo} alt="logo" />
            </Paper>
            <Typography className="description" variant="h4">
                Please login or signup to see the events
            </Typography>
            <LoginButton />
        </Paper>
    );
}