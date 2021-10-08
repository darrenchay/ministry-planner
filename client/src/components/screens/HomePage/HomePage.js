import './HomePage.scss'
import React from "react";
import { Box, Grid } from "grommet";
import { Typography, Button, Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom";

export default function HomePage() {
  
  const history = useHistory();

	let redirectToPlanner = (event) => {
		history.push("planner");
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
          <Button className='home-nav-buttons'>
            TEAM
          </Button>
          <Button className='home-nav-buttons'>
            SONG BOOK
          </Button>
        </Box>
      </Grid>
    </div>
  );
}