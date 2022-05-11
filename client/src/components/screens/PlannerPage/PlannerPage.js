import "./PlannerPage.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import * as EventsAPI from "./../../utils/Services/EventsAPI";
import cloneDeep from "lodash/cloneDeep";
import {
    Typography,
    IconButton,
} from "@material-ui/core";
import * as UsersAPI from "./../../utils/Services/UsersAPI";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";

import EventCard from "./EventCard";
import TableView from "./TableView";
import TimeSelect from "./TimeSelect";
import * as dateFormatter from "./../../utils/ConvertDate";

import steps from "../../utils/Components/MonthSteps";
import SnackBar from "../../utils/SnackBar";


export default function PlannerPage() {
    const history = useHistory();
    const [events, setEvents] = useState(null);
    const [month, setMonth] = useState(
        steps.find(({ value }) => value === new Date().getMonth()).label
    );
    const [year, setYear] = useState(new Date().getFullYear());
    const [filteredEvents, setFilteredEvents] = useState();
    const [filterTypes, setFilterTypes] = useState(
        [
            {
                value: 'sevenAM',
                full: 'Main - 7:30 AM',
                checked: true
            },
            {
                value: 'nineAM',
                full: 'Main - 9:30 AM',
                checked: true
            },
            {
                value: 'youth',
                full: 'Youth',
                checked: true
            },
            {
                value: 'other',
                full: 'Other',
                checked: true
            }
        ]
    );
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

    const [updateFlag, setUpdateFlag] = useState(true);
    const [isTableView, setIsTableView] = useState(false);
    const [createEventFlag, setCreateEventFlag] = useState(false);
    const [createTemplateFlag, setCreateTemplateFlag] = useState(false);

    const [snackBarData, setSnackBarData] = useState({})


    useEffect(() => {
        var registered = JSON.parse(localStorage.getItem('userData')).registered;
        if (registered === false) {
            history.push('/profile');
        }
    }, [history]);

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
    }, [month, year, updateFlag, filterTypes]);

    useEffect(() => {
        if (isTemplate === 1) {
            setSnackBarData({object:'team',action:'create',status:'success'});
        }
        else if (isTemplate === 2) {
            setSnackBarData({object:'team',action:'create',status:'error'});
        }
        else if (isTemplate === 3) {
            setSnackBarData({object:'team',action:'update',status:'success'});
        }
        else if (isTemplate === 4) {
            setSnackBarData({object:'team',action:'update',status:'error'});
        }
        else if (isTemplate === 5) {
            setSnackBarData({object:'team',action:'delete',status:'success'});
        }
        else if (isTemplate === 6) {
            setSnackBarData({object:'team',action:'delete',status:'error'});
        }
        setIsTemplate(0);
    }, [isTemplate]);

    useEffect(() => {
        if (isCreate === 1) {
            setSnackBarData({object:'event',action:'create',status:'success'});
        }
        else if (isCreate === 2) {
            setSnackBarData({object:'event',action:'create',status:'error'});
        }
        setIsCreate(0);
    }, [isCreate]);

    const [nextTimestamp, setNextTimestamp] = useState(null);
    const [prevTimestamp, setPrevTimestamp] = useState(null);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [emptyCardPlaceholders, setEmptyCardPlaceholders] = useState([]);

    useEffect(() => {
        if (filteredEvents && filteredEvents.length > 0 && filteredEvents.length < 3) {
            let temp = [];
            for (let i = 0; i < 3 - filteredEvents.length; i++) {
                temp.push(i);
            }
            setEmptyCardPlaceholders(temp);
        }
    }, [filteredEvents])

    useEffect(() => {
        if (events?.length > 0) {
            //Filters all events that are after the current set timestamp
            setFilteredEvents(
                events.filter((event) => {
                    const tempIndex = filterTypes.map(values => values.value).findIndex((type) => { return type === event.event.serviceType });

                    return (
                        (parseInt(event.event.timestamp) >= currTimestamp)
                        && (filterTypes[tempIndex].checked)
                    );
                })
            );
            setShowLoading(false);

            // Setting up the pagination logic (finds the timestamp values of the next and previous events)
            for (var i = 0; i < events.length; i++) {
                // Check if current event is at the timestamp, and that the next event exists
                if (events[i].event.timestamp >= currTimestamp) {
                    if (i + 1 < events.length) {
                        setNextTimestamp(events[i + 1].event.timestamp);
                        if (events.length - i > 3) {
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
            var currDate = dateFormatter.convertDate(currTimestamp);
            if (currDate.month !== month) {
                setMonth(currDate.month);
            }
            if (currDate.year !== year) {
                setYear(currDate.year);
            }
        }
        // eslint-disable-next-line
    }, [events, currTimestamp, filterTypes]);

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

    var numChecked = filterTypes.filter((type) => type.checked === true).map((type) => type.checked);
    const handleSelectAll = (event) => {
        const tempFilterTypes = cloneDeep(filterTypes);
        for (let i = 0; i < tempFilterTypes.length; i++) {
            tempFilterTypes[i].checked = event.target.checked;
        }
        setFilterTypes(tempFilterTypes);
    };

    const handleChangeSelectedFilterType = (event) => {
        const {
            target: { value },
        } = event;
        const tempFilterTypes = cloneDeep(filterTypes);
        var tempFilterTypesIndex = (tempFilterTypes.map(values => values.value).findIndex((values) => { return values === value[4] }));
        if (typeof value[3] !== 'undefined') {
            tempFilterTypes[tempFilterTypesIndex].checked = !tempFilterTypes[tempFilterTypesIndex].checked;
            setFilterTypes(tempFilterTypes);
        }
        numChecked = filterTypes.filter((type) => type.checked === true).map((type) => type.checked);
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
                        changeView={changeView}
                        filterTypes={filterTypes}
                        handleChangeSelectedFilterType={handleChangeSelectedFilterType}
                        handleSelectAll={handleSelectAll}
                        numChecked={numChecked}
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
                            <div className="message-wrapper">
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
                                .slice(0, 3)}
                        {filteredEvents?.length < 3 && emptyCardPlaceholders?.length > 0 && !isTableView && emptyCardPlaceholders.map((index, e) => {
                            return (
                                <div className='emptyCardPlaceholder'></div>
                            )
                        })}
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
            <SnackBar data={snackBarData}></SnackBar>
        </>
    );
}
