import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);

export const notifyAllUsers = () => {
    return axios
        .get(baseURL + "roles")
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}
