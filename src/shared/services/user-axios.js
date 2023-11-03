import axios from "axios";
import { api } from "../../utils/";
import Cookies from "js-cookie";
const ACCESS_TOKEN = localStorage.getItem("v1_u_t") || "";
export const user_axios = axios.create({
  baseURL: api,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
    Authorization: ACCESS_TOKEN,
  },
});
