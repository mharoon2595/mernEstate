import axios from "axios";

let apiRequest = axios.create({
  baseURL: "http://localhost:8800/api",
  withCredentials: true,
});

export default apiRequest;
