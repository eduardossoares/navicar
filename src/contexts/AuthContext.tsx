"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@/services/api";
import Error from "next/error";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import constants from "constants";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  createUser: ({ email, password }: AuthProps) => void;
  signIn: ({ email, password }: AuthProps) => void;
  signOut: () => void;
  user: UserProps | undefined;
}

type UserProps = {
  id: string;
  email: string;
};

export type AuthProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthContextProviderProps) {
  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, email } = response.data;
          const user: UserProps = {
            id,
            email,
          };
          setUser(user);
        })
        .catch((error) => {
          console.log("Erro ao setar usuário");
          throw new Error(error);
        });
    }
  }, []);

  const [user, setUser] = useState<UserProps>();
  const router = useRouter();
  const createUser = async ({ email, password }: AuthProps) => {
    try {
      await api.post("/users", {
        email,
        password,
      });
      await signIn({ email, password });
    } catch (error: any) {
      console.log("Erro ao criar e logar usuário");
      throw new Error(error);
    }
  };
  const signIn = async ({ email, password }: AuthProps): Promise<void> => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const { id, token } = response.data;
      const user: UserProps = {
        id,
        email,
      };
      setUser(user);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setCookie(null, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      router.push("/");
    } catch (error: any) {
      console.log(`Erro ao logar: ${error}`);
      throw new Error(error);
    }
  };
  const signOut = async () => {
    try {
      destroyCookie(null, "@nextauth.token");
      setUser(undefined);
      router.push("/auth");
    } catch {
      console.log("Erro ao deslogar");
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, createUser }}>
      {children}
    </AuthContext.Provider>
  );
}
