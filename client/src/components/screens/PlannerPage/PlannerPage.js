import "./PlannerPage.scss";

import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"
import TimeSelect from './TimeSelect';
import * as EventsAPI from './../../utils/Services/EventsAPI'
import {
    CircularProgress,
    Typography,
    IconButton
} from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
/* TODO: 
    - Add an add event button
    - Add the pagination of events
        - have a watcher that watches first event in list?
        - filter after that watcher
        - on press next, increment setTimestamp in filter to be 1 day after current event
        
    Or: make server side filtering, take in year and month parameters, and then have a previous and next that is sent with the body
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
    const [filteredEvents, setFilteredEvents] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const [nextTimestamp, setNextTimestamp] = useState(null);
    const [prevTimestamp, setPrevTimestamp] = useState(null);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [currTimestamp, setCurrTimestamp] = useState(new Date(year, (steps.find(({ label }) => label === month)).value, 1).getTime() / 1000)
    const ministry = "worship";

    // Updates events list when something on the page updates
    useEffect(() => {
        //Filter by timestamp, if next, get next by +1 to time, update the month and year if time updates past 1 month
        setCurrTimestamp(new Date(year, (steps.find(({ label }) => label === month)).value, 1).getTime() / 1000);
        EventsAPI.getFullEventsList(ministry)
            .then((data) => {
                setEvents(data);
            })
            .catch((err) => {
                console.log(err);
            });
        document.title = "Events";

    }, [month, year]);

    useEffect(() => {
        if (events?.length > 0) {
            setFilteredEvents(events.filter((event) => {
                //Check previous and next timestamps, and onclick, if click previous get previous timestamp, and update setTimestamp
                return (
                    parseInt(event.event.timestamp) >= currTimestamp
                )
            }))
            console.log("Successfully retrieved " + events.length + " events");
            setShowLoading(false);
            for (var i = 0; i < events.length; i++) {
                // Check if current event is at the timestamp, and that the next event exists
                console.log("for event: " + events[i].event.name);
                if (events[i].event.timestamp >= currTimestamp && i + 1 < events.length) {
                    console.log("found next: " + events[i + 1].event.name);
                    setNextTimestamp(events[i + 1].event.timestamp);
                    if (events.length - i > 4) {
                        setNextDisabled(false);
                    } else {
                        setNextDisabled(true);
                    }
                    break;
                }
                console.log("setting previous to: " + events[i].event.name)
                setPrevTimestamp(events[i].event.timestamp);
                setPrevDisabled(false);
            }
        }
    }, [events, currTimestamp])

    const handleNext = () => {
        setCurrTimestamp(nextTimestamp)
    }

    const handlePrevious = () => {
        setCurrTimestamp(prevTimestamp)
    }

    return (
        <div className='planner-page-wrapper'>
            <TimeSelect
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                marks={steps}
                setShowLoading={setShowLoading}
            />

            {showLoading && (
                <CircularProgress
                    style={{ color: "#FE646F" }}
                />
            )}

            <div className='cards-wrapper'>
                <IconButton disabled={prevDisabled} onClick={handlePrevious} className="pagination-button-previous">
                    <KeyboardArrowLeftRoundedIcon className='pagination-button-icon' />
                </IconButton>

                {(filteredEvents?.length === 0 || events?.length === 0) &&
                    <div>
                        <Typography variant="h4">
                            There are no events
                        </Typography>
                    </div>
                }
                {filteredEvents?.length > 0 &&
                    filteredEvents
                        .map((event) => {
                            return (<EventCard key={event.event._id} event={event} />);
                        })
                        .slice(0, 4)
                }
                <IconButton disabled={nextDisabled} onClick={handleNext} className="pagination-button-next">
                    <KeyboardArrowRightRoundedIcon className='pagination-button-icon' />
                </IconButton>

            </div>
        </div>
    );
}