import axios from "axios";

const generate = (source, customHeaders) => {
    return axios.create({
        baseURL: global.ENV.VUE_APP_API,
        cancelToken: source && source.token,
        headers: { ...headers(), ...customHeaders },
    });
};

export const headers = () => {
    const headers = {
        "content-type": "application/json",
    };
    headers.Authorization = `Bearer ${store.getters.auth_token}`;
    return headers;
};

