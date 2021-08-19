import React from 'react';
import './Navbar.css'
import {
    Box,
    AppBar,
    Button,
    Toolbar
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';
import logo from './stpaul-logo.png'
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    logo: {
        height: "35px",
        width: "35px",
    },
    navButtons: {
        fontWeight: "bold",
        color: "#D83B1E",
        padding: "10px",
        borderRadius: "10px",
        margin: "0 0 0 20px",
    },
    navMenuItems: {
        fontWeight: "bold",
        borderRadius: "10px",
        margin: "0 10px 0 10px",
        justifyContent: "center",
    },
    button: {
        borderRadius: "50%",
        color: "#D83B1E",
        padding: "10px",
    },
    icon: {
        color: "#D83B1Ek",
        size: "small",
    },
}));

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();

    let redirectToPlanner = (event) => {
        history.push("planner");
      };

    return (
        <div>
            <AppBar position="static">
                <Toolbar
                style={{
                    backgroundColor: "white",
                    paddingLeft: 20,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                >
                    <Link to="/">
                        <img src={logo} className={classes.logo} alt="logo" />
                    </Link>
                    <Box display='flex' flexGrow={1}>
                        <Button className={classes.navButtons} onClick={redirectToPlanner}>
                            Planner
                        </Button>
                        <Button className={classes.navButtons}>
                            Resources
                        </Button>
                        <Button className={classes.navButtons}>
                            Team
                        </Button>
                        <Button className={classes.navButtons}>
                            About Us
                        </Button>
                    </Box>

                    <Button
                        startIcon={<SearchIcon className={classes.icon} />}
                        className={classes.button}
                    >
                    </Button>
                    <Button
                        startIcon={<AccountCircleIcon className={classes.icon} />}
                        className={classes.button}
                    >
                    </Button>
                    <Button
                        startIcon={<HelpOutlineIcon className={classes.icon} />}
                        className={classes.button}
                    >
                    </Button>
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}