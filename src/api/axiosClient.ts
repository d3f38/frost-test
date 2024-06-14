import axios from "axios";

import { FROST_API } from "./const";

export const axiosClient = axios.create({
  baseURL: FROST_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
