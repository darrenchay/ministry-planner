import axios from "axios";
const baseURL = process.env.REACT_APP_AUTH0_API + "users/";

export default function getAccessToken() {
    const body = {
        "client_id": process.env.REACT_APP_AUTH0_TOKEN_CLIENT_ID,
        "client_secret": process.env.REACT_APP_AUTH0_TOKEN_CLIENT_SECRET,
        "audience": process.env.REACT_APP_AUTH0_API,
        "grant_type": "client_credentials"
    }
    return axios({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: body
    })
        .then((data) => {
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

export const getUserPermissions = async (user, accessToken) => {
    const id = String(user.sub);
    console.log(id);
    console.log(accessToken);

    // const data = await fetch(baseURL + id + "/roles", {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // })

    // const test = await data.json();
    // console.log(test);

    // return data.json();

    // return axios.get(baseURL, {
    //     paramsSerializer: function (params) {
    //         console.log(qs.parse(id) + "/roles");
    //         return qs.stringify({id});
    //     }
    // })
    //     .then(resp => resp.data)
    //     .catch(err => {
    //         console.log(err);
    //         throw err;
    //     });
    return axios({
        method: "get",
        headers: {
            Authorization: `bearer ${accessToken}`
        },
        url: baseURL + encodeURI(user.sub) + "/roles"
    })
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
            throw err;
        });
}