import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"
import * as EventsAPI from './../../utils/Services/EventsAPI'

/* TODO: 
    - Add a add event button
    - Add the scrolling/pagination of events
    - add the calendar thing to skip to a specific month
 */

export default function PlannerPage() {
    const [events, loadEvents] = useState([]);
    const ministry = "worship";

    // Updates events list when something on the page updates
    useEffect(() => {
        EventsAPI.getFullEventsList(ministry)
            .then((data) => {
                console.log("Successfully retrieved " + data.length + " events");
                loadEvents(data);
            })
            .catch((err) => {
                console.log(err);
            });
        document.title = "Events";
    }, []);

    return (
        <div className='planner-page-wrapper'>
            {events?.length > 0 &&
                events
                    .map((event, index) => (
                        <EventCard key={index} event={event} index={index} />
                    ))
                    .sort((firstEl, secondEl) => {
                        return firstEl.props.event.event.timestamp - secondEl.props.event.event.timestamp;
                    })
            }

            {events?.length === 0 &&
                <div>No events</div>
            }
        </div>
    );
}