import './Navbar.scss'
import { React, useState } from 'react';
import {
    Box,
    AppBar,
    Button,
    Toolbar,
    Menu,
    MenuItem
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../../Assets/Images/stpaul-logo.png';
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const openSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closeSettings = () => {
        setAnchorEl(null);
    };
    const { isAuthenticated } = useAuth0();
    const { logout } = useAuth0();

    const history = useHistory();

    let redirectToPlanner = (event) => {
        history.push("/planner");
    };

    let redirectToResources = (event) => {
        history.push("/resources")
    };

    let redirectToTeam = (event) => {
        history.push("/team")
    };

    let redirectToAboutUs = (event) => {
        history.push("/aboutus")
    };
    let redirectToProfile = (event) => {
        history.push("profile");
    }

    return (
        <>
            {isAuthenticated ?

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
                            <Link to="/home">
                                <img src={logo} className='logo' alt="logo" />
                            </Link>
                            <Box display='flex' flexGrow={1}>
                                <Button className='nav-buttons' onClick={redirectToPlanner}>
                                    Planner
                                </Button>
                                <Button className='nav-buttons' onClick={redirectToResources}>
                                    Song Book
                                </Button>
                                <Button className='nav-buttons' onClick={redirectToTeam}>
                                    Team
                                </Button>
                                <Button className='nav-buttons' onClick={redirectToAboutUs}>
                                    About Us
                                </Button>
                            </Box>

                            <Button className='right-area-button'>
                                <SearchIcon className='right-area-icon' />
                            </Button>
                            <Button
                                startIcon={<AccountCircleIcon className='right-area-icon' />}
                                className='right-area-button'
                                onClick={redirectToProfile}
                            >
                            </Button>
                            <Button
                                id="settings-button"
                                className='right-area-button'
                                onClick={openSettings}
                                aria-controls="settings-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <SettingsRoundedIcon className='right-area-icon' />
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Menu
                        id="settings-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeSettings}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={closeSettings}><Button
                            onClick={() =>
                                logout({
                                    returnTo: window.location.origin,
                                })
                            }
                        >
                            Log Out
                        </Button></MenuItem>
                    </Menu>
                </div>
                :
                <div></div>
            }
        </>
    )
}