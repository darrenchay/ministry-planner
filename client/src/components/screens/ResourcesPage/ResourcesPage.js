import './ResourcesPage.scss'
import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { TextField, IconButton, Button, Avatar } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import * as dateFormatter from '../../utils/ConvertDate';
import * as ResourceAPI from '../../utils/Services/ResourcesAPI';
import Comment from './Comments.js'
import cloneDeep from "lodash/cloneDeep";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
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
            : 'rgba(0, 0, 0, 0)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.1)"
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '0px solid rgba(0, 0, 0, .125)',
}));

export default function ResourcesPage() {
    // const location = useLocation();
    const event = JSON.parse(localStorage.getItem('eventData'));
    const userData = JSON.parse(localStorage.getItem('userData'));
    // const event = location.event;
    const [resource, setResource] = useState();
    const [originalSonglist, setOriginalSonglist] = useState();
    const [selectedSonglist, setSelectedSonglist] = useState(originalSonglist);
    const [isEditable, setIsEditable] = useState(false);
    const [comments, setComments] = useState();
    const [text, setText] = useState("");

    // const [isSonglistEmpty, setIsSonglistEmpty] = useState(true);

    useEffect(() => {
        ResourceAPI.getResource(event.eventDetails.resourceId)
            .then((resource) => {
                setResource(resource[0]);
                setComments(resource[0].comments.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1))
                setOriginalSonglist(resource[0].sections);
                setSelectedSonglist(resource[0].sections);
            });
    // eslint-disable-next-line
    }, [originalSonglist, event]);

    const handleEdit = () => {
        setIsEditable(true);
    }

    const handleSave = () => {
        var temp = cloneDeep(resource);
        temp.sections = selectedSonglist;
        ResourceAPI.updateResource(temp, resource._id)
            .then((resp) => {
                console.log("successfully updated " + resp.nModified + " resource(s)");
                setIsEditable(false);
            })
    }

    const handleAddComment = () => {
        if (text?.length > 0) {
            var newComment = {
                user: userData._id,
                comment: text,
                timestamp: Math.round(new Date().getTime() / 1000),
                edited: false
            }
            if (comments?.length > 0) {
                var tempComments = cloneDeep(comments)
                tempComments.unshift(newComment)
            } else {
                tempComments = [newComment]
            }
            var tempResource = {
                comments: tempComments
            }
            ResourceAPI.updateResource(tempResource, resource._id)
                .then(resp => {
                    console.log('Successfully posted comment', resp);
                    setComments(comments)
                })
                .catch(err => {
                    console.log("Error while posting comment", err);
                });
            setText("")
        }
    }

    const handleCancel = () => {
        setIsEditable(false);
        setSelectedSonglist(originalSonglist);
    }

    const handleChangeSectionTitle = (e, sectionIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].title = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongTitle = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].title = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongArtist = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].artist = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongKey = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].key = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongBPM = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].bpm = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongTimesig = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].timeSig = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongLink = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].link = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleChangeSongNotes = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs[songIndex].notes = e.target.value;
        setSelectedSonglist(temp);
    }

    const handleAddSection = () => {
        var temp = cloneDeep(selectedSonglist);
        var section = {
            title: '',
            songs: [
                {
                    title: '',
                    artist: '',
                    key: '',
                    bpm: '',
                    timeSig: '',
                    link: '',
                    notes: '',
                    lyrics: '',
                    songRef: ''
                }
            ]
        };
        temp.push(section);
        setSelectedSonglist(temp);
    }

    const handleAddSong = (e, sectionIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs.push(
            {
                title: '',
                artist: '',
                key: '',
                bpm: '',
                timeSig: '',
                link: '',
                notes: '',
                lyrics: '',
                songRef: ''
            }
        );
        setSelectedSonglist(temp);
    }

    const handleDeleteSection = (e, sectionIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp.splice(sectionIndex, 1);
        setSelectedSonglist(temp);
    }

    const handleDeleteSong = (e, sectionIndex, songIndex) => {
        var temp = cloneDeep(selectedSonglist);
        temp[sectionIndex].songs.splice(songIndex, 1);
        setSelectedSonglist(temp);
    }

    const getVideoId = (link) => {
        if (link.includes('https://www.youtube.com/watch?v=')) {
            return link.split('https://www.youtube.com/watch?v=')[1];
        }
        return link.split('https://youtu.be/')[1];
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
                    {!isEditable &&
                        <div className='non-edit-mode'>
                            <div className='songlist-header'>
                                <div className='left'></div>
                                <div className='right'>
                                    <div className='text'><b>Songlist</b></div>
                                    <button className='edit-btn' onClick={handleEdit}>Edit</button>
                                </div>
                            </div>
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
                                                                    <div className='key'>
                                                                        <div className='left'>Key: </div><div className='right'><b>{song.key}</b></div>
                                                                    </div>
                                                                    <hr className='separator' />
                                                                    <div className='bpm'>
                                                                        <div className='left'>BPM: </div><div className='right'><b>{song.bpm}</b></div>
                                                                    </div>
                                                                    <hr className='separator' />
                                                                    <div className='timeSig'>
                                                                        <div className='left'>Time signature: </div><div className='right'><b>{song.timeSig}</b></div>
                                                                    </div>
                                                                    <hr className='separator' />
                                                                </div>
                                                                <div className='link'>Link: <a href={song.link}>{song.link}</a></div>
                                                                {song.link &&
                                                                    <div className='video-section'>
                                                                        <div className='video-wrapper'>
                                                                            <iframe src={`https://www.youtube.com/embed/${getVideoId(song.link)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                                        </div>
                                                                    </div>
                                                                }
                                                                <div className='notes'>
                                                                    <div>Notes: </div>
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
                    }
                    {isEditable &&
                        <div className='edit-mode'>
                            <div className='songlist-header'>
                                <div className='left'>
                                    <button className='cancel-btn' onClick={handleCancel}>Cancel</button>
                                </div>
                                <div className='center'>
                                    <div className='text'><b>Songlist</b></div>
                                </div>
                                <div className='right'>
                                    <button className='edit-btn' onClick={handleSave}>Save</button>
                                </div>
                            </div>
                            {selectedSonglist?.length > 0 &&
                                selectedSonglist.map((section, sectionIndex) => {
                                    return (
                                        <>
                                            <div className='section'>
                                                <div>
                                                    <TextField
                                                        className='section-title'
                                                        id="outlined-basic"
                                                        placeholder='Section title'
                                                        variant="outlined"
                                                        value={section.title}
                                                        onChange={(e) => handleChangeSectionTitle(e, sectionIndex)} />
                                                    <IconButton className='deleteIcon' onClick={(e) => handleDeleteSection(e, sectionIndex)}>
                                                        <CancelIcon />
                                                    </IconButton>
                                                </div>
                                                {section.songs?.length > 0 &&
                                                    section.songs.map((song, songIndex) => {
                                                        return (
                                                            <div className='song-wrapper'>
                                                                <div className='song-number'>
                                                                    Song {songIndex + 1}
                                                                    <IconButton className='deleteIcon' onClick={(e) => handleDeleteSong(e, sectionIndex, songIndex)}>
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </div>
                                                                <div className='rows-wrapper'>
                                                                    <div className='common-row title'>
                                                                        <div className='left'>Title:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter a title'
                                                                                variant="outlined"
                                                                                value={song.title}
                                                                                onChange={(e) => handleChangeSongTitle(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className='common-row artist'>
                                                                        <div className='left'>Artist:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter an artist'
                                                                                variant="outlined"
                                                                                value={song.artist}
                                                                                onChange={(e) => handleChangeSongArtist(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className='common-row key'>
                                                                        <div className='left'>Key:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter a key'
                                                                                variant="outlined"
                                                                                value={song.key}
                                                                                onChange={(e) => handleChangeSongKey(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className='common-row bpm'>
                                                                        <div className='left'>BPM:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter a BPM'
                                                                                variant="outlined"
                                                                                value={song.bpm}
                                                                                onChange={(e) => handleChangeSongBPM(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className='common-row timeSig'>
                                                                        <div className='left'>Time signature:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter a time signature'
                                                                                variant="outlined"
                                                                                value={song.timeSig}
                                                                                onChange={(e) => handleChangeSongTimesig(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className='common-row link'>
                                                                        <div className='left'>Link:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter a link'
                                                                                variant="outlined"
                                                                                value={song.link}
                                                                                onChange={(e) => handleChangeSongLink(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div className='common-row notes'>
                                                                        <div className='left'>Notes:</div>
                                                                        <div className='right'>
                                                                            <TextField
                                                                                id="outlined-basic"
                                                                                placeholder='Enter a note'
                                                                                variant="outlined"
                                                                                value={song.notes}
                                                                                onChange={(e) => handleChangeSongNotes(e, sectionIndex, songIndex)} />
                                                                        </div>
                                                                    </div>
                                                                    <hr></hr>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <button className='add-song-btn' onClick={(e) => handleAddSong(e, sectionIndex)}>
                                                    Add a song
                                                </button>
                                            </div>
                                            <hr></hr>
                                        </>
                                    )
                                })
                            }
                            <div className='section'>
                                <button className='add-section-btn' onClick={handleAddSection}>
                                    + Add a section
                                </button>
                            </div>
                        </div>
                    }
                </div>
                <div className='comments-wrapper'>
                    <div className='title'>Comments</div>
                    <div className='form-container'>
                        <Avatar
                            className='image-container'
                        // src={userData[0].profilePicture}
                        />
                        <TextField
                            className="comment-text"
                            placeholder="Add a comment..."
                            multiline
                            rows={1}
                            maxRows={5}
                            InputProps={{
                                disableUnderline: true,
                                style: { fontSize: 14, fontWeight: "bold" },
                            }}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />
                        {text?.length > 0 &&
                            <Button className="post-button" onClick={handleAddComment}>Post</Button>
                        }
                    </div>
                    <div>
                        {comments?.length > 0 &&
                            comments
                                .map((data) => {
                                    return (
                                        <Comment  //sort by latest
                                            key={data._id}
                                            comment={data}
                                            resource={resource}
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
