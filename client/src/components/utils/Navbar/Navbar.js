import './Navbar.scss'
import React from 'react';
import {
	Box,
	AppBar,
	Button,
	Toolbar
  } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SearchIcon from '@material-ui/icons/Search';
import logo from './stpaul-logo.png'
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

export default function Navbar() {
    const { isAuthenticated } = useAuth0();

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
					<Link to="/">
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
					<Button className='right-area-button'>
						<AccountCircleIcon className='right-area-icon' />
					</Button>
					<Button className='right-area-button'>
						<SettingsRoundedIcon className='right-area-icon' />
					</Button>
				</Toolbar>
			</AppBar>
		</div>
        :
        <div></div>
        }
        </>
	)
}