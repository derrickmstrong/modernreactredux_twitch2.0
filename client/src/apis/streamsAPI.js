import axios from 'axios'

export const streamsAPI = axios.create({
    baseURL: 'http://localhost:3001'
})