import axios from "axios"

export const axiosUserInstance = axios.create({
  baseURL: "http://localhost:8000/user/",
  withCredentials: true,
})

export const axiosChatInstance = axios.create({
  baseURL: "http://localhost:8000/chat/",
  withCredentials: true,
})
export const axiosMeetingInstance = axios.create({
  baseURL: "http://localhost:8000/meeting/",
  withCredentials: true,
})

export const axiosUploadInstance = axios.create({
  baseURL: "http://localhost:8000/upload/",
  withCredentials: true,
})