import axios from "axios";

const baseURL = (process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL);


export const getTemplates = () => {
    return axios
        .get(baseURL + "worshipTemplates")
        .then(resp => resp.data)
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

export const updateTemplate = (data, id) => {
    return axios({
        method: "post",
        url: baseURL + "worshipTemplates/update/" + id,
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const addTemplate = (data) => {
    return axios({
        method: "post",
        url: baseURL + "worshipTemplates/add",
        data: data
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const deleteTemplate = (id) => {
    return axios({
        method: "DELETE",
        url: baseURL + "worshipTemplates/delete/" + id
    }).then((resp) => {
        console.log(resp.data);
    }).catch(err => {
        console.log(err);
        throw err;
    })
}
