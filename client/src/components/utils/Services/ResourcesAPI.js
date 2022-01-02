import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);

export const getResource = (id) => {
    return axios({
        method: 'GET',
        url: baseURL + "resources/" + id
    })
    .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const addResource = (data) => {
    return axios({
        method: "post",
        url: baseURL + "resources/add",
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const updateResource = (data, id) => {
    return axios({
        method: "post",
        url: baseURL + "resources/update/" + id,
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}
