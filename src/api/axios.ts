import axiosBase from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axios = axiosBase.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axios;
