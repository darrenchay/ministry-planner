import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);

export const notifyAllUsers = (data) => {
    return axios({
        method: "post",
        url: baseURL + "email/notifyUsers",
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            throw err;
        })
}
