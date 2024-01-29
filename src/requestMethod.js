import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.acessToken

export const publicRequest = axios.create({
    baseUrl: BASE_URL
})

export const  userRequest = axios.create({
    baseUrl: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
});

