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
      container spacing="2px" 
      justify='space-around'
      alignItems='center'
      width={{ max: "500px" }}
      
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

      
    </div>
  );
}