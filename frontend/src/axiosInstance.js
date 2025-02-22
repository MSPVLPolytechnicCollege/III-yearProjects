import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
