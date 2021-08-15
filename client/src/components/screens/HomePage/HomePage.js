import React from "react";
import { Box } from "grommet";
import { Typography, makeStyles, Button, Grid} from '@material-ui/core';


const mystyle={
  background: 'linear-gradient(#D83B1E 0%, #FE9969 100%)'
}

const useStyles = makeStyles((theme) => ({
  mainVerse: {
      flexGrow: 1,
      fontWeight: "bold",
      color: "white",
      paddingTop: "50px",
      borderRadius: "10px",
  },
  mainVerseRef: {
    paddingBottom: "80px",
    color: "white",
  },
  homeNavButtons: {
    boxShadow: '6px 6px 4px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
    width: 200,
    height: 250,
    fontWeight: "bold",
    color: "#D83B1E",
    fontSize: 20,
    padding: "12px",
    borderRadius: "15px",
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <div style={mystyle}>

      <Box
        gridArea="main"
        direction="column"
        pad="medium"
        width={{ max: "700px" }}
        style={{ margin: "auto" }}
      >
          <Typography 
            className={classes.mainVerse} 
            variant="h4" 
            align="center" 
          >
            EQUIPPED FOR EVERY GOOD WORK
          </Typography>
          <Typography 
            className={classes.mainVerseRef} 
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
        <Button variant="contained" className={classes.homeNavButtons}>
          Planner
        </Button>
        <Button variant="contained" className={classes.homeNavButtons}>
          Resources
        </Button>
        <Button variant="contained" className={classes.homeNavButtons}>
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