import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard"

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
		document.title = "Events";
	}, []);
	
	return (
		<div className='wrapper'>
			{events?.length > 0 && events.map((event, index) => (
				<EventCard key={index} event={event} index={index}/>
			))}
			{events?.length === 0 && 
				<div>No events</div>
			}
		</div>
	);
}