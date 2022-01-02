import './ResourcesPage.scss'
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Box, Grid } from "grommet";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { TextField } from '@material-ui/core';
import * as dateFormatter from '../../utils/ConvertDate';
import * as ResourceAPI from '../../utils/Services/ResourcesAPI';

const mockSonglist = [
	{
		title: 'Praise and Worship',
		songs: [
			{
				title: 'This Is Amazing Grace',
				artist: 'Phil Whickam',
				key: 'G',
				bpm: 85,
				timesig: '3/4',
				link: 'https://www.youtube.com/watch?v=XFRjr_x-yxU',
				lyrics: '',
				notes: 'test123111111111111111111111111111111111111111111111111111111'
			},
			{
				title: 'Mo Loue Bondie',
				artist: '',
				key: 'G',
				bpm: 85,
				timesig: '3/4',
				link: 'https://www.youtube.com/watch?v=o6yF8OQqXXw',
				lyrics: '',
				notes: ''
			},
			{
				title: 'At The Cross',
				artist: 'Chris Tomlin',
				key: 'G',
				bpm: 85,
				timesig: '',
				link: 'https://www.youtube.com/watch?v=o6yF8OQqXXw',
				lyrics: '',
				notes: 'Evan to Lead'
			}
		]
	},
	{
		title: 'Offertory',
		songs: [
			{
				title: 'Hosanna',
				artist: 'Hillsong Worship',
				key: 'G',
				bpm: 85,
				timesig: '3/4',
				link: 'https://www.youtube.com/watch?v=o6yF8OQqXXw',
				lyrics: '',
				notes: ''
			}
		]
	},
	{
		title: 'Communion',
		songs: [
			{
				title: 'Song',
				artist: '',
				key: 'G',
				bpm: null,
				timesig: '',
				link: 'https://www.youtube.com/watch?v=o6yF8OQqXXw',
				lyrics: '',
				notes: ''
			}
		]
	}
];

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
	// '&:first-child': {
	// 	borderRadius: '10px 10px 0 0'
  // },
	'&:not(:last-child)': {
    borderBottom: 0,
  },
	// '&:last-child': {
	// 	borderRadius: '0 0 10px 10px'
  // },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, 0.05)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function ResourcesPage() {
  const location = useLocation();
	const event = location.event;
	const [originalSonglist, setOriginalSonglist] = useState();
	const [selectedSonglist, setSelectedSonglist] = useState(originalSonglist);

  useEffect(() => {
		ResourceAPI.getResource(event.eventDetails.resourceId)
		.then((resource) => {
			setOriginalSonglist(resource[0].sections);
			setSelectedSonglist(resource[0].sections);
		})
  }, [location]);

  return (
    <div className="resources-page-wrapper">
      {/* <Box className="title-wrapper">
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
      </Grid> */}

			<div className='header-section'>
        <div className='resources-title'>
          Resources
        </div>
        <div className='event-name'>
          {event.event.name}
        </div>
        <div className='event-time'>
          {dateFormatter.formatDate(event.event.timestamp)}
        </div>
			</div>
      <div className='main-section'>
      <div className='songlist-wrapper'>
				{selectedSonglist?.length > 0 &&
					selectedSonglist.map((section) => {
						return (
							<div className='section'>
								<div className='title'>
									<b>{section.title}</b>
								</div>
								{section.songs?.length > 0 &&
									section.songs.map((song) => {
										return (
											<Accordion>
												<AccordionSummary
													expandIcon={<ExpandMoreIcon />}
													aria-controls="panel1a-content"
													id="panel1a-header"
												>
													<div className='title-artist'><b>{song.title}</b> {song.artist.length > 0 && <>- {song.artist} </>}</div>
												</AccordionSummary>
												<AccordionDetails className='song-wrapper'>
													<div class='song-info'>
														<div className='key'><b>Key: </b>{song.key}</div>
														<div className='bpm'><b>BPM: </b>{song.bpm}</div>
														<div className='timesig'><b>Time signature: </b>{song.timesig}</div>
													</div>
													<div className='link'><b>Link: </b><a href={song.link}>{song.link}</a>
														<div className='video-wrapper'>
														<iframe src={`https://www.youtube.com/embed/${song.link.split('v=')[1]}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
														</div>
													</div>
													<div className='notes'><b>Notes: </b>
													<TextField 
														className='text-section'
														variant="outlined"
                            multiline={true}
														value={song.notes}
														disabled={true} />
													</div>
												</AccordionDetails>
											</Accordion>
										)
									})
								}
							</div>
						)
					})
				}
      </div>
      <div className='comments-wrapper'>
        {/* yoann's part */}
        <Grid
          gridArea="comments-wrapper"
          className="songlist-comments-wrapper"
          border={{ color: '#BBB9B9' }}
        >
          <Typography className='comments-title'>
            Comments
          </Typography>
        </Grid>
      </div>
      </div>
    </div>
  );
}