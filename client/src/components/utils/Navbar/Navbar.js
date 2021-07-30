import React from 'react';
import './Navbar.css'
import {
    Box,
    AppBar,
    Button,
    Toolbar
  } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';
import logo from './stpaul-logo.png'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navButtons: {
        fontWeight: "bold",
        color: "#D83B1E",
        padding: "10px",
        borderRadius: "10px",
        margin: "0 0 0 20px",
    },
    navMenu: {
        "& > .MuiPaper-root": {
        // textAlign: "right",
        borderRadius: "25px",
        },
    },
    navMenuItems: {
        fontWeight: "bold",
        borderRadius: "10px",
        margin: "0 10px 0 10px",
        justifyContent: "center",
    },
    shoppingCartButton: {
        borderRadius: "50%",
        padding: 10,
    },
    shoppingCartIcon: {
        color: "#D83B1Ek",
        size: "small",
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar
                style={{
                    backgroundColor: "white",
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <Box display='flex' flexGrow={1}>
                        <Button className={classes.navButtons}>
                            My Schedule
                        </Button>
                        <Button className={classes.navButtons}>
                            Songlist
                        </Button>
                        <Button className={classes.navButtons}>
                            Team
                        </Button>
                        <Button className={classes.navButtons}>
                            About Us
                        </Button>
                    </Box>

                    <Button
                        startIcon={<SearchIcon className={classes.shoppingCartIcon} />}
                        className={classes.navButtons}
                    >
                    </Button>
                    <Button
                        startIcon={<AccountCircleIcon className={classes.shoppingCartIcon} />}
                        className={classes.navButtons}
                    >
                    </Button>
                    <Button
                        startIcon={<HelpOutlineIcon className={classes.shoppingCartIcon} />}
                        className={classes.navButtons}
                    >
                    </Button>
                    
                </Toolbar>
            </AppBar>
        </div>
    )
}