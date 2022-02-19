import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);

export const getUsers = () => {
    return axios
        .get(baseURL + "users/")
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

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

export const updateUser = (data, id) => {
    return axios({
        method: "post",
        url: baseURL + "users/update/" + id,
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}
export const getUserByEmail = (email) => {
    return axios
        .get(baseURL + "users/email/" + email)
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

export const createUser = (user) => {
    return axios({
        method: "post",
        url: baseURL + "users/add",
        data: user
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const registerUser = (id) => {
    return axios({
        method: "post",
        url: baseURL + "users/register/" + id + "/true"
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const deleteUser = (id) => {
    return axios({
        method: "delete",
        url: baseURL + "users/delete/" + id 
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}
