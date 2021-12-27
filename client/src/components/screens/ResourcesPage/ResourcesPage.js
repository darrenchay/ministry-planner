import './ResourcesPage.scss'
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Box, Grid } from "grommet";
import { Typography } from '@material-ui/core';
import convertDate from "./../../utils/ConvertDate";


function timeConverter(timestamp){
  // Convert unix timestamp to "d MMM yyyy - HH:mm" format
  var a = new Date(timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours()
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  var ampm = hour >= 12 ? 'PM' : 'AM';
  var min = a.getMinutes();
  min = min < 10 ? '0'+min : min;
  var time = date + ' ' + month + ' ' + year + ' - ' + hour + ':' + min + ' ' + ampm;
  return time;
}

export default function ResourcesPage() {
  const location = useLocation()

  useEffect(() => {
    console.log(location.event); // result: 'some_value'
    console.log(location.event.event.name);
    console.log(convertDate(location.event.event.timestamp));
    console.log(timeConverter(location.event.event.timestamp))
  }, [location]);

  return (
    <div className="resources-page-wrapper">
      <Box className="title-wrapper">
        <Typography className='resources-title'>
          Resources
        </Typography>
        <Typography className='event-name'>
          {location.event.event.name}
        </Typography>
        <Typography className='event-time'>
          {timeConverter(location.event.event.timestamp)}
        </Typography>
      </Box>

      <Grid
        rows={["625px", "625px"]}
        columns={["0.70fr", ".30fr"]}
        gap="medium"
        areas={[
          { name: "songlist-wrapper", start: [0, 0], end: [0, 1] },
          { name: "comments-wrapper", start: [1, 0], end: [1, 1] },
        ]}
        style={{ marginTop: 27, marginLeft: 180, marginRight: 180 }}
      >
        <Grid
          gridArea="songlist-wrapper"
          className="songlist-comments-wrapper"
          border={{ color: '#BBB9B9' }}
        >
          <Typography className='songlist-title'>
            Songlist
          </Typography>
        </Grid>
        <Grid
          gridArea="comments-wrapper"
          className="songlist-comments-wrapper"
          border={{ color: '#BBB9B9' }}
        >
          <Typography className='comments-title'>
            Comments
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}