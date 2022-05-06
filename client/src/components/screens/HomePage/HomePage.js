import './HomePage.scss'
import React, { useEffect } from "react";
import { Box, Grid } from "grommet";
import { Typography, Button, Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import isAdmin from '../../state/actions/adminAction.js';
import * as UserAPI from "../../utils/Services/UsersAPI";
import * as EmailAPI from "../../utils/Services/EmailAPI";
import isWorshipLeader from '../../state/actions/worshipLeaderAction';

export default function HomePage() {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // console.log(user)
        UserAPI.getUserByEmail(user.email)
            .then((data) => {
                // console.log(data)
                // Checking if user exists
                if (data.user.length > 0) {
                    // Checks if user is authenticated
                    if (data.user[0].authenticated === true) {
                        localStorage.setItem('userData', JSON.stringify(data.user[0]))
                        //Checks if user is registered
                        if (data.user[0].registered === true) {
                            // Verifies user is an admin
                            if (data.user[0].role.includes("Admin")) {
                                dispatch(isAdmin());
                                localStorage.setItem('isAdmin', JSON.stringify(true));
                                localStorage.setItem('isWorshipLeader', JSON.stringify(true));
                            }
                            // Checks if a worship leader
                            else if (data.user[0].role.includes("Worship-Leader")) {
                                dispatch(isWorshipLeader());
                                localStorage.setItem('isWorshipLeader', JSON.stringify(true));
                                localStorage.setItem('isAdmin', JSON.stringify(false));
                            } else {
                                localStorage.setItem('isAdmin', JSON.stringify(false));
                                localStorage.setItem('isWorshipLeader', JSON.stringify(false));
                            }
                        } else {
                            //If user is not registered redirect to create profile
                            history.push("/profile");
                        }
                    } else {
                        //If user is not authed but created, redirect to waiting page
                        history.push("/newUser");
                    }
                } else {
                    // a new user just signed up; send approval email
                    var newUser = {
                        "email": user.email
                    }
                    UserAPI.createUser(newUser).then((user) => {
                        console.log(user)
                        var data = {
                            data: {
                                recipient: {
                                    name: "Jason",
                                    email: process.env.NODE_ENV === 'production' ? "jason-cheng@live.com" : "darrenchay@gmail.com"
                                },
                                email: user.email,
                                userId: user._id
                            }
                        }
                        console.log(data)
                        EmailAPI.authNewUser(data).then(resp => {
                            console.log(resp)
                        })
                    }
                    );
                    //redirect user to waiting page
                    history.push("/newUser");
                }
            })
    }, [user, dispatch, history])

    let redirectToPlanner = (event) => {
        history.push("planner");
    };

    let redirectToResources = (event) => {
        history.push("/resources")
    };

    let redirectToTeam = (event) => {
        history.push("/team")
    };

    return (
        <div className='home-page-wrapper'>

            <Box
                gridArea="main"
                direction="column"
                pad="medium"
                width={{ max: "700px" }}
                style={{ margin: "auto" }}
            >
                <Typography
                    className='main-verse'
                    variant="h4"
                    align="center"
                >
                    EQUIPPED FOR EVERY GOOD WORK
                </Typography>
                <Typography
                    className='main-verse-ref'
                    align="right"
                >
                    2 Tim 3:17
                </Typography>
            </Box>

            <Grid
                rows={["200px", "200px"]}
                columns={["0.70fr", ".30fr"]}
                gap="small"
                areas={[
                    { name: "events-container", start: [0, 0], end: [0, 1] },
                    { name: "home-nav-buttons", start: [1, 0], end: [1, 1] },
                ]}
                style={{ margin: 50, marginLeft: 350, marginRight: 350 }}
            >
                <Box gridArea="events-container">
                    <Paper
                        className='home-events'
                    >
                        My upcoming events
                    </Paper>
                </Box>
                <Box gridArea="home-nav-buttons">
                    <Button className='home-nav-buttons' onClick={redirectToPlanner}>
                        ALL EVENTS
                    </Button>
                    <Button className='home-nav-buttons' onClick={redirectToTeam}>
                        TEAM
                    </Button>
                    <Button className='home-nav-buttons' onClick={redirectToResources}>
                        SONG BOOK
                    </Button>
                </Box>
            </Grid>
        </div>
    );
}