import axios from "axios";

const Backend_URL = axios.create({
  baseURL: "http://localhost:4000/api/v1/noteapp/",
});

export default Backend_URL;
