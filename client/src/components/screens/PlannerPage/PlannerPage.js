import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard"
import TimeSelect from './TimeSelect';
import * as EventsAPI from './../../utils/Services/EventsAPI'
import {
    CircularProgress,
    Typography,
    IconButton,
    Snackbar
} from '@material-ui/core';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import convertDate from "./../../utils/ConvertDate";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/* TODO: 
    - Add an add event button
 */
const steps = [
    {
        value: 0,
        label: 'Jan',
        full: 'January',
    },
    {
        value: 1,
        label: 'Feb',
        full: 'February',
    },
    {
        value: 2,
        label: 'Mar',
        full: 'March',
    },
    {
        value: 3,
        label: 'Apr',
        full: 'April',
    },
    {
        value: 4,
        label: 'May',
        full: 'May',
    },
    {
        value: 5,
        label: 'Jun',
        full: 'June',
    },
    {
        value: 6,
        label: 'Jul',
        full: 'July',
    },
    {
        value: 7,
        label: 'Aug',
        full: 'August',
    },
    {
        value: 8,
        label: 'Sep',
        full: 'September',
    },
    {
        value: 9,
        label: 'Oct',
        full: 'October',
    },
    {
        value: 10,
        label: 'Nov',
        full: 'November',
    },
    {
        value: 11,
        label: 'Dec',
        full: 'December',
    },
];

export default function PlannerPage() {
    const [events, setEvents] = useState(null);
    const [month, setMonth] = useState(steps.find(({value}) => value === new Date().getMonth()).label);
    const [year, setYear] = useState(new Date().getFullYear());
    const [filteredEvents, setFilteredEvents] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const [currTimestamp, setCurrTimestamp] = useState(new Date(year, (steps.find(({ label }) => label === month)).value, 1).getTime() / 1000);
    const ministry = "worship";
    const [isCreate, setIsCreate] = useState(0)
    const [openSuccessCreateEvent, setOpenSuccessCreateEvent] = useState(false);
    const [openErrorCreateEvent, setOpenErrorCreateEvent] = useState(false);
    const [updateFlag, setUpdateFlag] = useState(true);

    const handleCloseSnack = () => {
        setOpenSuccessCreateEvent(false);
        setOpenErrorCreateEvent(false);
    };

    // Updates events list when something on the page updates
    useEffect(() => {
        //Setting the timestamp that will be used for filtering purposes
        setCurrTimestamp(new Date(year, (steps.find(({ label }) => label === month)).value, 1).getTime() / 1000);
        EventsAPI.getFullEventsList(ministry)
            .then((data) => {
                setEvents(data);
                // console.log("Successfully retrieved " + data.length + " events");
            })
            .catch((err) => {
                console.log(err);
            });

    }, [month, year, updateFlag]);

    useEffect(() => {
        if (isCreate === 1) {
            setOpenSuccessCreateEvent(true)
        }
        if (isCreate === 2) {
            setOpenErrorCreateEvent(true)
        }
        setIsCreate(false);
    }, [isCreate])


    const [nextTimestamp, setNextTimestamp] = useState(null);
    const [prevTimestamp, setPrevTimestamp] = useState(null);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [prevDisabled, setPrevDisabled] = useState(true);

    useEffect(() => {
        if (events?.length > 0) {
            //Filters all events that are after the current set timestamp
            setFilteredEvents(events.filter((event) => {
                return (
                    parseInt(event.event.timestamp) >= currTimestamp
                )
            }))
            setShowLoading(false);

            // Setting up the pagination logic (finds the timestamp values of the next and previous events)
            for (var i = 0; i < events.length; i++) {
                // Check if current event is at the timestamp, and that the next event exists
                if (events[i].event.timestamp >= currTimestamp) {
                    if (i + 1 < events.length) {
                        setNextTimestamp(events[i + 1].event.timestamp);
                        if (events.length - i > 4) {
                            setNextDisabled(false);
                        } else {
                            setNextDisabled(true);
                        }
                    }
                    if (i - 1 >= 0) {
                        setPrevDisabled(false);
                        setPrevTimestamp(events[i - 1].event.timestamp);
                    } else {
                        setPrevDisabled(true);
                    }
                    break;
                }
            }
            var currDate = convertDate(currTimestamp)
            if (currDate.month !== month) {
                setMonth(currDate.month);
            }
            if (currDate.year !== year) {
                setYear(currDate.year);
            }
        }
        // eslint-disable-next-line
    }, [events, currTimestamp])

    const handleNext = () => {
        setCurrTimestamp(nextTimestamp)
    }

    const handlePrevious = () => {
        setCurrTimestamp(prevTimestamp)
    }

    return (
        <>
        <div className='planner-page-wrapper'>
            <TimeSelect
                month={month}
                setMonth={setMonth}
                year={year}
                setYear={setYear}
                marks={steps}
                setShowLoading={setShowLoading}
                setUpdateFlag={setUpdateFlag}
                setIsCreate={setIsCreate}
            />
            {showLoading && (
                <CircularProgress
                    style={{ color: "#FE646F" }}
                />
            )}

            <div className='cards-wrapper'>
                <div className='previous-button-wrapper'>
                <IconButton disabled={prevDisabled} onClick={handlePrevious} className="previous-button">
                    <KeyboardArrowLeftRoundedIcon className='pagination-button-icon' />
                </IconButton>
                </div>
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
                            return (<EventCard key={event.event._id} event={event} setUpdateFlag={setUpdateFlag} isCreateEvent={false} setEvent={null} />);
                        })
                        .slice(0, 4)
                }
                <div className='next-button-wrapper'>
                <IconButton disabled={nextDisabled} onClick={handleNext} className="next-button">
                    <KeyboardArrowRightRoundedIcon className='pagination-button-icon' />
                </IconButton>
                </div>
            </div>
        </div>
        {/* Status update toast notifications */}
        <Snackbar open={openSuccessCreateEvent} autoHideDuration={5000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="success">
                Event successfully created!
            </Alert>
        </Snackbar>
        <Snackbar open={openErrorCreateEvent} autoHideDuration={5000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity="error">
                An error occured when creating the event.
            </Alert>
        </Snackbar>
        </>
    );
}