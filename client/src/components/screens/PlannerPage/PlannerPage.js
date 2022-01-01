import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import * as EventsAPI from "./../../utils/Services/EventsAPI";
import * as UsersAPI from "./../../utils/Services/UsersAPI";

import { Typography, IconButton, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import EventCard from "./EventCard";
import TableView from "./TableView";
import TimeSelect from "./TimeSelect";
import convertDate from "./../../utils/ConvertDate";

import steps from "../../utils/Components/MonthSteps";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function PlannerPage() {
    const [events, setEvents] = useState(null);
    const [month, setMonth] = useState(
        steps.find(({ value }) => value === new Date().getMonth()).label
    );
    const [year, setYear] = useState(new Date().getFullYear());
    const [filteredEvents, setFilteredEvents] = useState();
    // eslint-disable-next-line
    const [showLoading, setShowLoading] = useState(true);
    const [currTimestamp, setCurrTimestamp] = useState(
        new Date(
            year,
            steps.find(({ label }) => label === month).value,
            1
        ).getTime() / 1000
    );
    const ministry = "worship";
    const [isTemplate, setIsTemplate] = useState(0);
    // eslint-disable-next-line
    const [isCreate, setIsCreate] = useState(0);

    const [openSuccessCreate, setOpenSuccessCreate] = useState(false);
    const [openErrorCreate, setOpenErrorCreate] = useState(false);
    const [openSuccessDelete, setOpenSuccessDelete] = React.useState(false);
    const [openErrorDelete, setOpenErrorDelete] = React.useState(false);

    const [updateFlag, setUpdateFlag] = useState(true);
    const [isTableView, setIsTableView] = useState(false);
    const [createEventFlag, setCreateEventFlag] = useState(false);
    const [createTemplateFlag, setCreateTemplateFlag] = useState(false);

    const handleCloseSnack = () => {
        setOpenSuccessCreate(false);
        setOpenErrorCreate(false);
        setOpenSuccessDelete(false);
        setOpenErrorDelete(false);
    };

    // Updates events list when something on the page updates
    useEffect(() => {
        //Setting the timestamp that will be used for filtering purposes
        setCurrTimestamp(
            new Date(
                year,
                steps.find(({ label }) => label === month).value,
                1
            ).getTime() / 1000
        );
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
        if (isTemplate === 1) {
            setOpenSuccessCreate(true);
        }
        if (isTemplate === 2) {
            setOpenErrorCreate(true);
        }
        if (isTemplate === 3) {
            setOpenSuccessDelete(true);
        }
        if (isTemplate === 4) {
            setOpenErrorDelete(true);
        }
        setIsTemplate(0);
    }, [isTemplate]);

    const [nextTimestamp, setNextTimestamp] = useState(null);
    const [prevTimestamp, setPrevTimestamp] = useState(null);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [prevDisabled, setPrevDisabled] = useState(true);

    useEffect(() => {
        if (events?.length > 0) {
            //Filters all events that are after the current set timestamp
            setFilteredEvents(
                events.filter((event) => {
                    return parseInt(event.event.timestamp) >= currTimestamp;
                })
            );
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
            var currDate = convertDate(currTimestamp);
            if (currDate.month !== month) {
                setMonth(currDate.month);
            }
            if (currDate.year !== year) {
                setYear(currDate.year);
            }
        }
        // eslint-disable-next-line
    }, [events, currTimestamp]);

    const [leaders, setLeaders] = useState();
    // Getting the list of worship leaders on event card load
    useEffect(() => {
        UsersAPI.getUserByRole('worship', "Worship-Leader")
            .then((users) => {
                setLeaders(users);
            });
    }, []);

    const handleNext = () => {
        setCurrTimestamp(nextTimestamp);
    };

    const handlePrevious = () => {
        setCurrTimestamp(prevTimestamp);
    };

    const changeView = (event, newView) => {
        if (newView !== null) {
            setIsTableView(newView);
        }
    };

    return (
        <>
            <div className="planner-page-wrapper">
                <div className="top-section">
                    <ToggleButtonGroup
                        className="view-btn-wrapper"
                        value={isTableView}
                        exclusive
                        onChange={changeView}
                        aria-label="text alignment"
                    >
                        <ToggleButton value={true}>
                            <CalendarViewMonthIcon />
                        </ToggleButton>
                        <ToggleButton value={false}>
                            <CalendarViewWeekIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <TimeSelect
                        month={month}
                        setMonth={setMonth}
                        year={year}
                        setYear={setYear}
                        marks={steps}
                        setShowLoading={setShowLoading}
                        setUpdateFlag={setUpdateFlag}
                        setIsCreate={setIsCreate}
                        isTableView={isTableView}
                        setCreateEventFlag={setCreateEventFlag}
                        setCreateTemplateFlag={setCreateTemplateFlag}
                        setIsTemplate={setIsTemplate}
                        leaders={leaders}
                    />
                </div>
                {isTableView && (
                    <TableView
                        events={filteredEvents}
                        setUpdateFlag={setUpdateFlag}
                        setIsCreate={setIsCreate}
                        createEventFlag={createEventFlag}
                        setCreateEventFlag={setCreateEventFlag}
                        setIsTemplate={setIsTemplate}
                        createTemplateFlag={createTemplateFlag}
                        setCreateTemplateFlag={setCreateTemplateFlag}
                        leaders={leaders}
                    />
                )}
                {!isTableView && (
                    <div className="cards-wrapper">
                        <div className="previous-button-wrapper">
                            <IconButton
                                disabled={prevDisabled}
                                onClick={handlePrevious}
                                className="previous-button"
                            >
                                <KeyboardArrowLeftRoundedIcon className="pagination-button-icon" />
                            </IconButton>
                        </div>
                        {(filteredEvents?.length === 0 || events?.length === 0) && (
                            <div>
                                <Typography variant="h4">There are no events</Typography>
                            </div>
                        )}
                        {filteredEvents?.length > 0 && !isTableView &&
                            filteredEvents
                                .map((event) => {
                                    return (
                                        <EventCard
                                            key={event.event._id}
                                            event={event}
                                            setUpdateFlag={setUpdateFlag}
                                            isCreate={false}
                                            setEvent={null}
                                            leaders={leaders}
                                        />
                                    );
                                })
                                .slice(0, 4)}
                        <div className="next-button-wrapper">
                            <IconButton
                                disabled={nextDisabled}
                                onClick={handleNext}
                                className="next-button"
                            >
                                <KeyboardArrowRightRoundedIcon className="pagination-button-icon" />
                            </IconButton>
                        </div>
                    </div>
                )}
            </div>
            {/* Status update toast notifications */}
            <Snackbar
                open={openSuccessCreate}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Successfully created!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openErrorCreate}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    An error occured when creating.
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSuccessDelete}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="success">
                    Successfully deleted!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openErrorDelete}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
            >
                <Alert onClose={handleCloseSnack} severity="error">
                    An error occured when deleting.
                </Alert>
            </Snackbar>
        </>
    );
}
