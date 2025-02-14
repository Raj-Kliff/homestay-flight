import axios from "axios";

export const axios_instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'Pio85oC2yqW2PISEhffd'
    }
});
