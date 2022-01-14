import './ResourcesPage.scss'
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { TextField, Button, Avatar } from '@material-ui/core';
import * as dateFormatter from '../../utils/ConvertDate';
import * as ResourceAPI from '../../utils/Services/ResourcesAPI';
import Comment from './Comments.js'

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
    const [comments, setComments] = useState();
    const [resources, setResources] = useState();
    const [originalSonglist, setOriginalSonglist] = useState();
    const [selectedSonglist, setSelectedSonglist] = useState(originalSonglist);
    const [text, setText] = useState("");

    useEffect(() => {
        ResourceAPI.getResource(event.eventDetails.resourceId)
            .then((resource) => {
                setResources(resource[0])
                setComments(resource[0].comments.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1))
                setOriginalSonglist(resource[0].sections);
                setSelectedSonglist(resource[0].sections);
            })
    }, [event]);

    const addComment = () => {
        var commentsObj = resources.comments
        commentsObj.unshift({
            commentId: "comment4",
            user: "test user",
            comment: text,
            timestamp: Math.round(new Date().getTime() / 1000)
        })
        var addedResource = {
            comments: commentsObj
        }
        ResourceAPI.updateResource(addedResource, resources._id)
            .then(resp => {
                console.log('Successfully retrieved', resp);
            })
            .catch(err => {
                console.log("Error while retrieving", err);
            });
        setText("")
    }

    return (
        <div className="resources-page-wrapper">
            <div className='header-section'>
                <div className='resources-title'>
                    Resources
                </div>
                <div className='event-name'>
                    {event.event.name}
                </div>
                <div className='event-time'>
                    {dateFormatter.formatDateTitle(event.event.timestamp)}
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
                    {selectedSonglist?.length === 0 &&
                        <Typography>No Songs</Typography>
                    }
                </div>
                <div className='comments-wrapper'>
                    <div className='title'>Comments</div>
                    <div className='form-container'>
                        <Avatar 
                            className='image-container'
                        />
                        <TextField
                            className="comment-text"
                            placeholder="Add a comment..."
                            multiline
                            rows={1}
                            maxRows={5}
                            InputProps={{ 
                                disableUnderline: true,
                                style: {fontSize:14, fontWeight: "bold"},
                            }}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                        <Button className="comment-form-button" onClick={addComment}>Post</Button>
                    </div>
                    <div>
                        {comments?.length > 0 &&
                            comments
                                .map((data) => {
                                    return (
                                        <Comment  //sort by latest
                                            commentObj={data}
                                        />
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
