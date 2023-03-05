import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://167.172.70.208:8003/api',
    baseURL: 'http://127.0.0.1:8000/api',

    headers: {
        "Content-Type": "application/json",
    },
})

export default instance;