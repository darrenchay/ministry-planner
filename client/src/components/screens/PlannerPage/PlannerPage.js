import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import convertDate from "../../utils/ConvertDate";

const EventCard = ({event, index}) => {
	return (
		<Card className='card'>
			<CardContent>
				<Typography className='card-header'>
					<Typography>
						{index}. {event.event.name}
					</Typography>
					<Typography>
						{convertDate(parseInt(event.event.timestamp))}
					</Typography>
				</Typography>
				<Typography>
					{event.eventDetails.teamList.map((item, index) => (
						<Card key={index} className='card-2'>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									<div className='rolename'>{item.roleName}</div>
									{item.teamMember.map((teamMember, index2) => (
										<div key={index2}>{teamMember.firstname}</div>
									))}
								</Typography>
							</CardContent>
						</Card>
					))}
				</Typography>
			</CardContent>
			<CardActions className='card-actions'>
				<Button className='resources-button' variant="contained" 
					color='primary' size="small">
					Resources
				</Button>
			</CardActions>
		</Card>
	);
}

export default function PlannerPage() {
	const [events, loadEvents] = useState([]);
	const baseURL = "http://localhost:8080/api/planner";
	const ministry = "worship";

	// Updates events list when something on the page updates
	useEffect(() => {
		console.log(baseURL + "/getAll/" + ministry);
		axios
			.get(baseURL + "/getAll/" + ministry)
			.then((resp) => {
				let data = resp.data;
				console.log(data);
				loadEvents(data);
			})
			.catch((err) => {
				console.log(err);
			});
		document.title = "Ministry Planner";
	}, []);
	
	return (
		<div className='planner-page-wrapper'>
			{events?.length > 0 && events.map((event, index) => (
				<EventCard key={index} event={event} index={index}/>
			))}
			{events?.length == 0 && 
				<div>No events</div>
			}
		</div>
	);
}