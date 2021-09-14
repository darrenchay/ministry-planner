import "./PlannerPage.scss";

import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"
import TimeSelect from './TimeSelect';
import * as EventsAPI from './../../utils/Services/EventsAPI'
import {
    CircularProgress
} from '@material-ui/core';

/* TODO: 
    - Add an add event button
    - Add the scrolling/pagination of events
    - add the calendar thing to skip to a specific month
    - add a loading animation when retrieving events
 */
const steps = [
    {
        value: 0,
        label: 'Jan',
    },
    {
        value: 1,
        label: 'Feb',
    },
    {
        value: 2,
        label: 'Mar',
    },
    {
        value: 3,
        label: 'Apr',
    },
    {
        value: 4,
        label: 'May',
    },
    {
        value: 5,
        label: 'Jun',
    },
    {
        value: 6,
        label: 'Jul',
    },
    {
        value: 7,
        label: 'Aug',
    },
    {
        value: 8,
        label: 'Sep',
    },
    {
        value: 9,
        label: 'Oct',
    },
    {
        value: 10,
        label: 'Nov',
    },
    {
        value: 11,
        label: 'Dec',
    },
];

export default function PlannerPage() {
    const [events, setEvents] = useState(null);
    const [month, setMonth] = useState('Jan');
    const [year, setYear] = useState(new Date().getFullYear());
    const ministry = "worship";

    // Updates events list when something on the page updates
    useEffect(() => {
        EventsAPI.getFullEventsList(ministry)
            .then((data) => {
                setEvents(data);
                console.log("Successfully retrieved " + data.length + " events");
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
                marks={steps}
            />

            <div className='cards-wrapper'>

                {!events && (
                    <CircularProgress
                        style={{ color: "#FE646F" }}
                    />
                )}
                {events?.length === 0 &&
                    <div>No events</div>
                }
                {events?.length > 0 &&
                    events
                        .filter((event) => {
                            let setTimestamp = new Date(year, (steps.find(({ label }) => label === month)).value, 1).getTime() / 1000; //Finding first of selected month
                            return (
                                parseInt(event.event.timestamp) >= setTimestamp
                            )
                        })
                        .map((event) => {
                            return (<EventCard key={event.event._id} event={event} />);
                        })
                        .sort((firstEl, secondEl) => {
                            return firstEl.props.event.event.timestamp - secondEl.props.event.event.timestamp;
                        })
                        .slice(0, 4)
                }
            </div>
        </div>
    );
}