import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://teams-server-zeta.vercel.app/",
});
