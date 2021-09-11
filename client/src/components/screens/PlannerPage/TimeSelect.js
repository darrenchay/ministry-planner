import React from "react";
import {
    Slider,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core';

const marks = [
    {
        value: 0,
        label: 'Jan',
    },
    {
        value: 10,
        label: 'Feb',
    },
    {
        value: 20,
        label: 'Mar',
    },
    {
        value: 30,
        label: 'Apr',
    },
    {
        value: 40,
        label: 'May',
    },
    {
        value: 50,
        label: 'Jun',
    },
    {
        value: 60,
        label: 'Jul',
    },
    {
        value: 70,
        label: 'Aug',
    },
    {
        value: 80,
        label: 'Sep',
    },
    {
        value: 90,
        label: 'Oct',
    },
    {
        value: 100,
        label: 'Nov',
    },
    {
        value: 110,
        label: 'Dec',
    },
];

export default function TimeSelect({month, setMonth, year, setYear}) {
    const updateYear = (e) => {
        setYear(e.target.value);
    }
    const updateMonth = (e, data) => {
        setMonth((marks.find( ({value}) => value === data)).label);
    }
    return (
        <div className='time-select-wrapper'>
            <div>
                <Typography>
                    {month} {year}
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
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                </Select>
                <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider-custom"
                    step={10}
                    valueLabelDisplay="off"
                    marks={marks}
                    min={0}
                    max={110}
                    onChange={updateMonth}
                />
            </div>
        </div>

    );
}