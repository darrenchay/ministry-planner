import "./TimeSelect.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {
    Slider,
    Typography,
    Select,
    Button,
    MenuItem,
    FormControl,
    makeStyles,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import CreateTemplate from "./CreateTemplate";
import CreateEvent from "./CreateEvent";

import FastForwardOutlinedIcon from "@material-ui/icons/FastForwardOutlined";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    modal: {
        padding: "0 !important",
    },
    paper: {
        position: "absolute",
        width: 400,
        height: 450,
        overflow: "auto",
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TimeSelect({
    month,
    setMonth,
    year,
    setYear,
    marks,
    setShowLoading,
    setUpdateFlag,
    setIsCreate,
    isTableView,
    setCreateEventFlag,
    setCreateTemplateFlag,
    setIsTemplate,
    leaders
}) {
    // const isAdmin = useSelector((state) => state.isAdmin);
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const [years, setYears] = useState([]);
    const [valueSlider, setValueSlider] = useState(
        marks.find(({ label }) => label === month).value
    );
    const [openEvent, setOpenEvent] = React.useState(false);
    const [openTemplate, setOpenTemplate] = React.useState(false);
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    useEffect(() => {
        var tempYears = [];
        for (var i = currentYear - 5; i < currentYear + 5; i++) {
            tempYears.push(i);
        }
        setYears(tempYears);
    }, [currentYear]);

    // Update the slider based off what month is the first in the list of cards
    useEffect(() => {
        setValueSlider(marks.find(({ label }) => label === month).value);
    }, [month, marks]);

    const updateYear = (e) => {
        setYear(e.target.value);
        setMonth("Jan");
    };
    const updateMonth = (e, data) => {
        setShowLoading(false);
        setMonth(marks.find(({ value }) => value === data).label);
    };

    const handleOpenEvent = () => {
        if (isTableView) {
            setCreateEventFlag(true);
            setCreateTemplateFlag(false);
        } else {
            setOpenEvent(true);
            setOpenTemplate(false);
        }
    };

    const handleOpenTemplate = () => {
        if (isTableView) {
            setCreateTemplateFlag(true);
            setCreateEventFlag(false);
        } else {
            setOpenTemplate(true);
            setOpenEvent(false);
        }
    };

    const handleClose = () => {
        setOpenEvent(false);
        setOpenTemplate(false);
    };
    const currentEvent = () => {
        setYear(currentYear);
        setMonth(marks.find(({ value }) => value === currentMonth).label);
    };
    return (
        <div className="time-select-wrapper">
            <div>
                <Typography className="time-header">
                    <b>
                        {marks.find(({ label }) => label === month).full} {year}
                    </b>
                </Typography>
            </div>
            <div className="slider-event-section">
                <Button
                    className="current-event"
                    variant="contained"
                    size="small"
                    onClick={currentEvent}
                    startIcon={<FastForwardOutlinedIcon className="current-event-icon" />}
                >
                    NOW
                </Button>
                <FormControl variant="outlined" className="select-year" size="small">
                    <Select
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                            },
                            getContentAnchorEl: null,
                        }}
                        labelId="select-year"
                        id="select-year"
                        placeholder="Year"
                        value={year}
                        onChange={updateYear}
                    >
                        {years?.length > 0 &&
                            years.map((year, index) => {
                                return (
                                    <MenuItem key={index} value={year}>
                                        {year}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
                <Slider
                    className="slider"
                    defaultValue={0}
                    step={1}
                    valueLabelDisplay="off"
                    marks={marks}
                    value={valueSlider}
                    min={0}
                    max={11}
                    onChangeCommitted={updateMonth}
                    onMouseDown={() => {
                        setShowLoading(true);
                    }}
                    onTouchMove={() => {
                        setShowLoading(true);
                    }}
                />
                {isAdmin && <>
                    <Button
                        className="create-event-button"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleOpenEvent}
                    >
                        Create Event
                    </Button>
                    <Button
                        className="manage-teams-button"
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleOpenTemplate}
                    >
                        Manage Teams
                    </Button>
                    <Modal
                        open={openEvent}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <CreateEvent
                                setUpdateFlag={setUpdateFlag}
                                setIsCreate={setIsCreate}
                                setOpen={setOpenEvent}
                                leaders={leaders}

                            />
                        </div>
                    </Modal>
                    <Modal
                        open={openTemplate}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className={classes.modal}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <CreateTemplate
                                setUpdateFlag={setUpdateFlag}
                                setIsTemplate={setIsTemplate}
                                setOpen={setOpenTemplate}
                                leaders={leaders}
                            />
                        </div>
                    </Modal>
                </>
                }
            </div>
        </div>
    );
}
