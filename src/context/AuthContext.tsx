import React, { useState } from "react";
import type { User } from "../types/user";

interface AuthContextProps {
  // Session del usuario
  authenticatedUser: User | undefined
  setAuthenticatedUser: React.Dispatch<React.SetStateAction<User | undefined>>

  // Informacion del usuario
  userInfo: User | undefined
  setUserInfo:React.Dispatch<React.SetStateAction<User | undefined>>
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<ChildrenProviderProp> = ({children}) => {
  
  // Usuario autenticado
  const [authenticatedUser, setAuthenticatedUser] = useState<User>()

    const [userInfo, setUserInfo] = useState<User>();

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
