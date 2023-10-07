import axios from "axios"

export const axiosUserInstance = axios.create({
  baseURL: "http://localhost:8000/user/",
  withCredentials: true,
})

export const axiosChatInstance = axios.create({
  baseURL: "http://localhost:8000/chat/",
  withCredentials: true,
})
