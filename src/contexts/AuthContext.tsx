import { createContext, ReactNode } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextData {}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
