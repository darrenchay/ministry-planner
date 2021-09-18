import axios from "axios";

// const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);
const baseURL = "http://localhost:8080/api/"
export const getUser = (id) => {
    return axios
        .get(baseURL + "users/" + id)
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

export const getUserByRole = (ministry, role) => {
    return axios
        .get(baseURL + "users/getRoles/" + ministry + "/" + role)
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err)
            throw err;
        });
}