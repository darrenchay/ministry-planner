import './TimeSelect.scss';
import React, { useEffect, useState } from "react";
import {
    Slider,
    Typography,
    Select,
    Button,
    MenuItem,
    FormControl,
    makeStyles,
    IconButton
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import CreateEventModal from "./CreateEventModal";

import FastForwardOutlinedIcon from '@material-ui/icons/FastForwardOutlined';

const useStyles = makeStyles(() => ({
    modal: {
        padding: '0 !important'
    }
}));

export default function TimeSelect({ month, setMonth, year, setYear, 
                                    marks, setShowLoading, setUpdateFlag, setIsCreate }) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const [years, setYears] = useState([]);
    const [valueSlider, setValueSlider] = useState((marks.find(({ label }) => label === month)).value);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    useEffect(() => {
        var tempYears = [];
        for (var i = currentYear - 5; i < currentYear + 5; i++) {
            tempYears.push(i);
        }
        setYears(tempYears);
    }, [currentYear]);

    // Update the slider based off what month is the first in the list of cards
    useEffect(() => {
        setValueSlider((marks.find(({ label }) => label === month)).value);
    }, [month, marks]);

    const updateYear = (e) => {
        setYear(e.target.value);
        setMonth('Jan');
    }
    const updateMonth = (e, data) => {
        setShowLoading(false);
        setMonth((marks.find(({ value }) => value === data)).label);
    }
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const currentEvent = () => {
        setYear(currentYear);
        setMonth((marks.find(({ value }) => value === currentMonth)).label);
    };
    return (
        <div className='time-select-wrapper'>
            <div>
                <Typography className="time-header">
                    <b>{(marks.find(({ label }) => label === month)).full} {year}</b>
                </Typography>
            </div>
            <div className='slider-event-section'>
                <Button classname='current-event' variant='contained' size='small' onClick={currentEvent} startIcon={<FastForwardOutlinedIcon className="current-event-icon" />}>
                    NOW
                </Button>
                <FormControl variant="outlined" className='select-year' size='small'>
                <Select
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                        },
                        getContentAnchorEl: null
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
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            )
                        })}
                </Select>
                </FormControl>
                <Slider
                    // classes={{
                    //     thumb: thumb,
                    //     rail: rail,
                    //     track: track,
                    //     valueLabel: valueLabel,
                    // }}
                    className='slider'
                    defaultValue={0}
                    step={1}
                    valueLabelDisplay="off"
                    marks={marks}
                    value={valueSlider}
                    min={0}
                    max={11}
                    onChangeCommitted={updateMonth}
                    onMouseDown={() => { setShowLoading(true) }}
                    onTouchMove={() => { setShowLoading(true) }}
                />
                <Button className='create-event-button' variant="contained" color='primary' size="small" onClick={handleOpen}>
                    Create Event
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    <CreateEventModal setUpdateFlag={setUpdateFlag} setIsCreate={setIsCreate} setOpen={setOpen}/>
                </Modal>
            </div>
        </div>
    );
}