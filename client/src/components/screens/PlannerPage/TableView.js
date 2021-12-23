import "./TableView.scss";
import React, { useEffect, useState } from "react";
// import cloneDeep from "lodash/cloneDeep";
// import { useHistory } from "react-router-dom";
// import { CustomScrollbar } from "../../utils/CustomScrollbar/CustomScrollbar";
import {
    // makeStyles,
    // Card,
    // CardHeader,
    // CardActions,
    // CardContent,
    // Button,
    // TextField,
    // Menu,
    // MenuItem,
    // Select,
    // InputLabel,
    // FormControl
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';
// import SendIcon from '@material-ui/icons/Send';

// import ClearIcon from '@material-ui/icons/Clear';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import AddCircleIcon from '@material-ui/icons/AddCircle';

// import ButtonGroup from './EditButtonGroup';
// import RoleSection from './RoleSection';

// import convertDate from "../../utils/ConvertDate";
import * as UsersAPI from "../../utils/Services/UsersAPI";
import * as RolesAPI from '../../utils/Services/RolesAPI';

import { DataGrid } from '@material-ui/data-grid';

// // TODO: To find a way to use scss instead of makestyles here
// const useStyles = makeStyles({
//     noBorder: {
//         border: "none"
//     },
//     resize: {
//         fontSize: 22
//     },
//     popover: {
//         '& .MuiMenu-list': {
//             padding: '8px 10px 4px !important'
//         }
//     }
// });

// const RehearsalTime = ({ eventDetails, setSelectedEventDetails, rehearsal, isEditable }) => {
//     const handleDelete = () => {
//         var tempEventDetails = cloneDeep(eventDetails);
//         console.log("delete")
//         var idx = tempEventDetails.rehearsals.indexOf(rehearsal)
//         if (idx !== -1) {
//             tempEventDetails.rehearsals.splice(idx, 1);
//             setSelectedEventDetails(tempEventDetails);
//         }
//     }

//     return (
//         <>
//             <div className='rehearsal-time'>
//                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardDateTimePicker
//                         variant="inline"
//                         id="pickupDate"
//                         inputVariant={"standard"}
//                         format="d MMM yyyy - HH:mm"
//                         ampm={false}
//                         disabled={true}
//                         value={new Date(rehearsal * 1000)}
//                         InputProps={{
//                             disableUnderline: true
//                         }}
//                         KeyboardButtonProps={{
//                             "aria-label": "change date",
//                             style: { display: 'none' }
//                         }}
//                     />
//                 </MuiPickersUtilsProvider>
//                 {isEditable &&
//                     <Button onClick={handleDelete} disabled={!isEditable} aria-label="settings" >
//                         <ClearIcon />
//                     </Button>
//                 }
//             </div>
//         </>
//     )

// }

export default function TableView({ events }) {
    // const classes = useStyles();
    // const [isEditable, toggleEdit] = useState(isCreateEvent);
    // const [originalEvent, changeOriginalEvent] = useState(event);
    // const [selectedEvent, changeSelectedEvent] = useState(event);
    // const [selectedEventDetails, setSelectedEventDetails] = useState(event.eventDetails);
    // const [worshipLeaders, setWorshipLeaders] = useState();
    // const [addDateTime, setAddDateTime] = useState(new Date());
    // const [anchorEl, setAnchorEl] = useState(false);
    // const history = useHistory();

    // let redirectToResources = () => {
    //     history.push("resources");
    // };

    // useEffect(() => {
    //     UsersAPI.getUserByRole('worship', "Worship-Leader")
    //         .then((users) => {
    //             setWorshipLeaders(users);
    //         });
    // }, []);


    // useEffect(() => {
    //     if (isCreateEvent) {
    //         setEvent(selectedEvent);
    //     }
    // }, [selectedEvent, isCreateEvent, setEvent])


    // useEffect(() => {
    //     setSelectedEventDetails(selectedEvent.eventDetails);
    //     // eslint-disable-next-line
    // }, [isEditable]);


    // // Updates the event object when the event details section is updated
    // useEffect(() => {
    //     var tempEvent = cloneDeep(selectedEvent);
    //     tempEvent.eventDetails = selectedEventDetails;
    //     changeSelectedEvent(tempEvent);
    //     // eslint-disable-next-line
    // }, [selectedEventDetails]);

    // const handleChangeEvent = (e, type) => {
    //     var tempEvent = cloneDeep(selectedEvent);
    //     if (type.toLowerCase() === 'name') {
    //         tempEvent.event.name = e.target.value;
    //     } else if (type.toLowerCase() === 'date') {
    //         tempEvent.event.timestamp = (e.getTime() / 1000);
    //     }
    //     changeSelectedEvent(tempEvent);
    // }

    // const handleChangeWorshipLeader = (e) => {
    //     var tempEventDetails = cloneDeep(selectedEventDetails);
    //     tempEventDetails.worshipLeader = e.target.value;
    //     setSelectedEventDetails(tempEventDetails);
    // }

    // const handleRehearsals = () => {
    //     var tempEventDetails = cloneDeep(selectedEventDetails);
    //     tempEventDetails.rehearsals.push(addDateTime.getTime() / 1000);
    //     setSelectedEventDetails(tempEventDetails);
    //     setAddDateTime(new Date());
    // }

    // const handleRehearsalClick = (e) => {
    //     setAnchorEl(e.currentTarget);
    // }

    // const handleCloseRehearsals = () => {
    //     setAnchorEl(null);
    // }

    const [isTableReady, setIsTableReady] = useState(false);
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);

    const initColumns = () => {
        var columnsTemp = [
            {field: 'id', headerName: 'ID', hide: true},
            {field: 'isEditable', headerName: 'IsEditable', hide: true},
            {field: 'title', headerName: 'Title', width: 200},
            {field: 'timestamp', headerName: 'Date - Time', width: 200,
                renderCell: (params) => {
                    var isEditable = params.getValue(params.id, 'isEditable');
                    return (
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                margin="normal"
                                id="pickupDate"
                                inputVariant={isEditable? "outlined" : "standard"}
                                format="d MMM yyyy - HH:mm"
                                ampm={false}
                                disabled={!isEditable}
                                value={new Date(params.getValue(params.id, 'timestamp') * 1000)}
                                // onChange={(e) => handleChangeEvent(e, "date")}
                                InputProps={{
                                    disableUnderline: !isEditable
                                }}
                                KeyboardButtonProps={{
                                    "aria-label": "change date",
                                    style: { display: isEditable ? 'inline-flex' : 'none' }
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    );
                }
            },
            {field: 'worshipLeader', headerName: 'Worship Leader', width: 200},
            {field: 'serviceType', headerName: 'Service Type', width: 180},
            {field: 'rehearsals', headerName: 'Rehearsals', width: 180},
            {field: 'additionalInfo', headerName: 'Additional Info', width: 200},
            {field: 'actions', headerName: 'Actions', width: 180},
        ];
        RolesAPI.getAllRoles()
            .then(roles => {
                var count = 0;
                roles.forEach(role => {
                    var obj = {
                        field: role.name.toLowerCase(),
                        headerName: role.name,
                        width: 180
                    }
                    if (role.name !== "Worship-Leader") {
                        columnsTemp.splice(6 + count, 0, obj);
                        count++;
                    }
                });
                setColumns(columnsTemp);
            });
    }

    const initRows = () => {
        var rowsTemp = [];
        events.forEach((event, index) => {
            console.log(index)
            UsersAPI.getUser(event.eventDetails.worshipLeader).then(wl => {
                var obj = {
                    id: index,
                    isEditable: false,
                    title: event.event.name,
                    timestamp: event.event.timestamp,
                    worshipLeader: wl.firstname+' '+wl.lastname,
                    serviceType: event.event.eventDetails[0].eventType,
                    rehearsals: event.eventDetails.rehearsals,
                    vocalist: '',
                    guitarist: '',
                    bassist: '',
                    pianist: '',
                    drums: '',
                    additionalInfo: event.eventDetails.additionalInfo,
                    actions: ''
                }
                rowsTemp.push(obj);
                if (index === events.length - 1) {
                    console.log('setEvents');
                    setRows(rowsTemp);
                    setIsTableReady(true);
                }
            });
        });
    }
    
    useEffect(() => {
        if (events?.length > 0) {
            console.log('events', events);
            initColumns();
            initRows();
        }
        // eslint-disable-next-line
    }, [events]);

    return (
        <div className='table-wrapper'>
            {isTableReady &&
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            } 
        </div>
    );
}
