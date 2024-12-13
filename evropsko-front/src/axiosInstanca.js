import axios from "axios";

const token = window.sessionStorage.getItem('token');

const axiosInstanca = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

if (token !== null) {
    axiosInstanca.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export default axiosInstanca;