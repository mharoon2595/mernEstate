import axios from "axios";

let apiRequest = axios.create({
  baseURL: "https://current-dominica-devinthemaking-721da948.koyeb.app/",
  withCredentials: true,
});

export default apiRequest;
