import axios from 'axios'

export const axiosPlugin = axios.create({
    baseURL: "localhost:8000/api"
})