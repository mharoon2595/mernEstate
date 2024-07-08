import axios from "axios";

let apiRequest = axios.create({
  baseURL: "https://mernestatebe.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
