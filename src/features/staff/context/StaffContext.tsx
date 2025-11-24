import { User } from "@/types/user";
import React, { useState } from "react";


interface StaffContextProps {
    // Listado de usuarios registrados
    usersList: User[] | []
    setUsersList: React.Dispatch<React.SetStateAction<User[] | []>>

}

export const StaffContext = React.createContext<StaffContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: React.ReactNode;
}

export const StaffContextProvider: React.FC<ChildrenProviderProp> = ({children}) => {
  
  // # Lista de usuario registrados
  const [usersList, setUsersList] = useState<User[]>([])

  return (
    <StaffContext.Provider
      value={{
        usersList,
        setUsersList
      }}    
    >
      {children}
    </StaffContext.Provider>
  );
};
