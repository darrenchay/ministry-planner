import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"
import TimeSelect from './TimeSelect';
import * as EventsAPI from './../../utils/Services/EventsAPI'
import {
    CircularProgress
} from '@material-ui/core';
import convertDate from "../../utils/ConvertDate";

/* TODO: 
    - Add an add event button
    - Add the scrolling/pagination of events
    - add the calendar thing to skip to a specific month
    - add a loading animation when retrieving events
 */

export default function PlannerPage() {
    const [events, setEvents] = useState(null);
    const [month, setMonth] = useState('Jan');
    const [year, setYear] = useState(2021);
    const ministry = "worship";

    // Updates events list when something on the page updates
    useEffect(() => {
        EventsAPI.getFullEventsList(ministry)
            .then((data) => {
                console.log("Successfully retrieved " + data.length + " events");
                setEvents(data);
            })
            .catch((err) => {
                console.log(err);
            });
        document.title = "Events";
    }, [month, year]);

    return (
        <div className='planner-page-wrapper'>
            <TimeSelect
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
            />

            <div className='cards-wrapper'>

                {events?.length > 0 &&
                    events
                        
                        .map((event, index) => (
                            <EventCard key={index} event={event} />
                        ))
                        .sort((firstEl, secondEl) => {
                            console.log(firstEl.props.event.event.name)
                            console.log(firstEl.props.event.event.timestamp)
                            console.log(secondEl.props.event.event.name)
                            console.log(secondEl.props.event.event.timestamp)
                            console.log(firstEl.props.event.event.timestamp - secondEl.props.event.event.timestamp);
                            return firstEl.props.event.event.timestamp - secondEl.props.event.event.timestamp;
                        })
                    //Add a filter for only 4 event cards
                }
                {!events && (
                    <CircularProgress
                        style={{ alignSelf: "center", color: "#FE646F" }}
                    />
                )}
                {events?.length === 0 &&
                    <div>No events</div>
                }
            </div>
        </div>
    );
}