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

export default function Navbar() {
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
							Resources
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

					<Button
						startIcon={<SearchIcon className='right-area-icon' />}
						className='right-area-button'
					>
					</Button>
					<Button
						startIcon={<AccountCircleIcon className='right-area-icon' />}
						className='right-area-button'
					>
					</Button>
					<Button
						startIcon={<SettingsRoundedIcon className='right-area-icon' />}
						className='right-area-button'
					>
					</Button>
					
				</Toolbar>
			</AppBar>
		</div>
	)
}