import React, { useEffect, useState } from "react";
import axios from "axios";

import "./PlannerPage.css";


export default function PlannerPage() {
    // const [ministry, getMinistry] = useState("worship");
    const [events, loadEvents] = useState([]);
    const [eventsString, setEventString] = useState(" ");
    const baseURL = "http://localhost:8080/api/planner";
    const ministry = "worship";

    // Updates events list when something on the page updates
    useEffect(() => {
        console.log(baseURL + "/getAll/" + ministry);
        axios
            .get(baseURL + "/getAll/" + ministry)
            .then((resp) => {
                console.log(resp);
                let data = resp.data;
                loadEvents(data)
                setEventString(JSON.stringify(events, null, 1));
            })
            .catch((err) => {
                console.log(err);
            });
        document.title = "Ministry Planner";
    }, [])
    
    return (
        <div>
            <p>Planner Page</p>
            <ul>{eventsString}</ul>
        </div>
    );
}