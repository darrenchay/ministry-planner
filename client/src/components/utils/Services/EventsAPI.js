import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);

export const getFullEventsList = (ministry) => {
    return axios
        .get(baseURL + "planner/getAll/" + ministry)
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

export const updateEvent = (data, id) => {
    return axios({
        method: "post",
        url: baseURL + "events/update/" + id,
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const updateEventDetails = (data, ministry, type, id) => {
    //Update the team members for a role
    if (type === 'role') {
        return axios({
            method: "post",
            url: baseURL + ministry + "EventDetails/updateRole/" + data._id,
            data: data
        })
            .then(resp => resp.data)
            .catch(err => {
                console.log(err);
                throw err
            })
    } else {
        //Updates the general event details (additional Info, rehearsal time, etc) 
        return axios({
            method: "post",
            url: baseURL + ministry + "EventDetails/update/" + id,
            data: data
        })
            .then(resp => resp.data)
            .catch(err => {
                console.log(err);
                throw err
            })
    }
}