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
    // console.log('updateAPI');
    // console.log(data);
    return axios ({
        method: "post",
        url: baseURL + "events/update/" + id,
        data: data
    })
    .then(resp => resp.data)
    .catch(err => {
        console.log("here");
        console.log(err);
        throw err;
    })
}