import axios from 'axios'

export const axiosPlugin = axios.create({
    baseURL: "http://localhost:8000/api"
})