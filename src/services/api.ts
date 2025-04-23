import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import { AuthError } from "./errors/AuthError";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

const setupAPIClient = () => {
  let cookies = parseCookies();
  const token = cookies["@nextauth.token"];
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  if (!baseURL) {
    throw new Error("BASE URL não encontrada");
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        destroyCookie(undefined, "@nextauth.token");
        const router = useRouter();
        if (typeof window !== undefined) {
          router.push("/auth");
        }
        return Promise.reject(new AuthError());
      }
      console.error("Erro na API:", error);
      return Promise.reject(error);
    }
  );

  return api;
};

const api = setupAPIClient();
export { api };
