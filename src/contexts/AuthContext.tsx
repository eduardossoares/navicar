"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@/services/api";
import Error from "next/error";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  createUser: ({ email, password }: AuthProps) => void;
  signIn: ({ email, password }: AuthProps) => void;
  signOut: () => void;
  user: UserProps | null;
  isLoading: boolean;
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
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, email } = response.data;
          const userData: UserProps = {
            id,
            email,
          };
          setUser(userData);
        })
        .catch((error) => {
          console.log("Erro ao setar usuário");
          setUser(null);
          destroyCookie(null, "@nextauth.token");
          throw new Error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

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
  const signIn = async ({ email, password }: AuthProps): Promise<void> => {''
    try {
      const response = await api.post("/login", {
        email,
        password,
      });
      const { id, token } = response.data;
      const userData: UserProps = {
        id,
        email,
      };
      setUser(userData);
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
  const signOut = () => {
    try {
      destroyCookie(null, "@nextauth.token");
      setUser(null);
      window.location.href = "/auth?logout=true";
    } catch {
      console.log("Erro ao deslogar");
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, createUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
