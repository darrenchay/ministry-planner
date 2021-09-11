import React from "react";
import {
    Slider,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core';

export default function TimeSelect({month, setMonth, year, setYear, marks}) {
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
                    step={1}
                    valueLabelDisplay="off"
                    marks={marks}
                    min={0}
                    max={11}
                    onChange={updateMonth}
                />
            </div>
        </div>

    );
}