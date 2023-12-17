import axios from "axios"

export const api = axios.create({
    // baseURL: "https://allin-bet.onrender.com",
    baseURL: "http://localhost:3333/",
})