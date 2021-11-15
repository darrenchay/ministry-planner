import './HomePage.scss'
import React, { useEffect } from "react";
import { Box, Grid } from "grommet";
import { Typography, Button, Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import * as AuthAPI from "../../utils/Services/AuthAPI";

export default function HomePage() {
    const { user } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();
    // console.log(user);

    const history = useHistory();

    const setRole = async () => {
        const accessToken = await getAccessTokenSilently();

        // const metadataResponse = await fetch(`https://ministry-planner-auth.us.auth0.com/api/v2/users/${user.sub}/roles`, {
        //     headers: {
        //       Authorization: `Bearer ${accessToken}`,
        //     },
        //   });
    
        //   const { user_metadata } = await metadataResponse.json();
        //   history.push("/home", { user_metadata });
    
        AuthAPI.getUserPermissions(user, accessToken)
            .then((data) => {
                console.log(data);
                history.push("/home", { data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        setRole();
    }, [])

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