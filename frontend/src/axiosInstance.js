import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://e-com-backend-vev8.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
