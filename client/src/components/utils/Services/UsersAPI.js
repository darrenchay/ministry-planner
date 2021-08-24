import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);

export const getUser = (id) => {
    return axios
        .get(baseURL + "users/" + id)
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}