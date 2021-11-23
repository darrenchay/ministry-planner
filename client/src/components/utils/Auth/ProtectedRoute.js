import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import {
    CircularProgress
} from '@material-ui/core';

const ProtectedRoute = ({ component, ...args }) => (
    <Route
        component={withAuthenticationRequired(component, {
            onRedirecting: () => <CircularProgress style={{ color: "#FE646F" }} />,
        })}
        {...args}
    />
);

export default ProtectedRoute;