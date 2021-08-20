import './HomePage.scss'
import React from "react";
import { Box } from "grommet";
import { Typography, Button, Grid } from '@material-ui/core';

export default function HomePage() {
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
      spacing={16} 
      justify='space-around'
      alignItems='center'
      >
        <Button variant="contained" className='home-nav-buttons'>
          Planner
        </Button>
        <Button variant="contained" className='home-nav-buttons'>
          Resources
        </Button>
        <Button variant="contained" className='home-nav-buttons'>
          Team
        </Button>
      </Grid>

      {/* <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center">
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                asdasdsdsdsds
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
       */}
    </div>
  );
}