import config from "@/config/config"
import axios from "axios"

export const axiosUserInstance = axios.create({
  baseURL: `${config.apiUrl}/user/`,
  withCredentials: true,
})

export const axiosChatInstance = axios.create({
  baseURL: `${config.apiUrl}/chat/`,
  withCredentials: true,
})
export const axiosMeetingInstance = axios.create({
  baseURL: `${config.apiUrl}/meeting/`,
  withCredentials: true,
})

export const axiosUploadInstance = axios.create({
  baseURL: `${config.apiUrl}/upload/`,
  withCredentials: true,
})
