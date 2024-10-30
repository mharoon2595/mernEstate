import axios from "axios";

let apiRequest = axios.create({
  baseURL: "https://psychological-shalna-devinthemaking-5c7896fb.koyeb.app/",
  withCredentials: true,
});

export default apiRequest;
