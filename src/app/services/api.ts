import axios from "axios";
import { parseCookies } from "nookies";
import { AuthError } from "./errors/AuthError";

const setupAPIClient = () => {
  let cookies = parseCookies();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["nextauth.token"]}`,
    },
  });

  api.interceptors.response.use((response) => {
    return response;
  });
  (error: any) => {
    if (error.response?.status === 401) {
      return Promise.reject(new AuthError());
    }
  };
};
