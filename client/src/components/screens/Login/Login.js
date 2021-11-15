import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import {
    Button,
} from '@material-ui/core';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    const login = () => {
        loginWithRedirect();
    }

    return (
        <Button
            onClick={login}
        >
            Log In
        </Button>
    );
};


const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <Button
            onClick={() =>
                logout({
                    returnTo: window.location.origin,
                })
            }
        >
            Log Out
        </Button>
    );
};

export default function LoginPage() {
    const { isAuthenticated } = useAuth0();
    return (
        <div>
            LOGIN
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
    );
}