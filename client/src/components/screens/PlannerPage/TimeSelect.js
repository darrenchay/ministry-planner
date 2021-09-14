import React, { useEffect, useState } from "react";
import {
    Slider,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core';

export default function TimeSelect({ month, setMonth, year, setYear, marks }) {
    const currentYear = new Date().getFullYear();
    const [years, setYears] = useState([]);
    useEffect(() => {
        var tempYears = [];
        for (var i = currentYear - 5; i < currentYear + 5; i++) {
            tempYears.push(i);
        }
        setYears(tempYears);
    }, [currentYear]);

    const updateYear = (e) => {
        setYear(e.target.value);
    }
    const updateMonth = (e, data) => {
        setMonth((marks.find(({ value }) => value === data)).label);
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
                    {years?.length > 0 &&
                        years.map((year, index) => {
                            return (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            )
                        })}
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