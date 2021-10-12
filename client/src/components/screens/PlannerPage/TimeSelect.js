import React, { useEffect, useState } from "react";
import {
    Slider,
    Typography,
    Select,
    Button,
    MenuItem
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import CreateEventModal from "./CreateEventModal";

export default function TimeSelect({ month, setMonth, year, setYear, 
                                    marks, setShowLoading, setUpdateFlag }) {
    const currentYear = new Date().getFullYear();
    const [years, setYears] = useState([]);
    const [valueSlider, setValueSlider] = useState((marks.find(({ label }) => label === month)).value);
    const [open, setOpen] = React.useState(false);

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
    return (
        <div className='time-select-wrapper'>
            <div>
                <Typography className="time-header">
                    <b>{month} {year}</b>
                </Typography>
            </div>
            <div className='time-select-inputs'>
                <Select
                    labelId="teamMemberSelect"
                    id="teamMemberSelect"
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
                <Slider
                    // classes={{
                    //     thumb: thumb,
                    //     rail: rail,
                    //     track: track,
                    //     valueLabel: valueLabel,
                    // }}
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
                <Button className='resources-button' variant="contained" color='primary' size="small" onClick={handleOpen}>
                    Create Event
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <CreateEventModal setUpdateFlag={setUpdateFlag} setOpen={setOpen}/>
                </Modal>
            </div>
        </div>

    );
}