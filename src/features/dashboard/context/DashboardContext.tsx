import React, { useState } from "react";
import { JourneyFilterBy } from "../types/JourneyItem";
import { Journey } from "@/types/journey";
import { JourneyStatus } from "@/types/JourneyStatus";


interface DashboardContextProps {
  journeyList: Journey[] | []
  setJourneyList: React.Dispatch<React.SetStateAction<Journey[]>>

  // Filtros para ordenar segun ascendente o descendente
  filterByOrderBy: JourneyFilterBy
  setFilterByOrderBy: React.Dispatch<React.SetStateAction<JourneyFilterBy>>

  // Filtros para ordenar segun el estado ( Pendiente | Completado)
  filterByStatus: JourneyStatus
  setFilterByStatus: React.Dispatch<React.SetStateAction<JourneyStatus>>

  // Determina si hay mas journeys disponibles para cargar
  hasMoreJourneys: boolean
  setHasMoreJourneys: React.Dispatch<React.SetStateAction<boolean>>
  // Paginas de journeys recorridas hasta el momento
  currentJourneyPage: number
  setCurrentJourneyPage: React.Dispatch<React.SetStateAction<number>>
  // Loader de carga para los journeys
  joruneysAreLoading:boolean
  setJourneyAreLoading:React.Dispatch<React.SetStateAction<boolean>>

}

export const DashboardContext = React.createContext<DashboardContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: React.ReactNode;
}

export const DashboardContextProvider: React.FC<ChildrenProviderProp> = ({children}) => {
  
  // Items que estan siendo trackeados
  const [journeyList, setJourneyList] = useState<Journey[]>([]);
  
  // Determina si hay mas journeys para cargar al listado
  const [hasMoreJourneys, setHasMoreJourneys] = useState<boolean>(false)

  // Determina el offset recorrido hasta el momento
  const [currentJourneyPage, setCurrentJourneyPage] = useState<number>(0)

  // Activa un loader cuando los journeys estan cargando
  const [joruneysAreLoading, setJourneyAreLoading] = useState<boolean>(false);


  // Filtros
  const [filterByOrderBy, setFilterByOrderBy] = useState<JourneyFilterBy>("ASC")
  const [filterByStatus, setFilterByStatus] = useState<JourneyStatus>("pending");
  

  return (
    <DashboardContext.Provider
      value={{
        journeyList,
        setJourneyList,
        filterByOrderBy,
        setFilterByOrderBy,
        filterByStatus,
        setFilterByStatus,
        hasMoreJourneys,
        setHasMoreJourneys,
        currentJourneyPage,
        setCurrentJourneyPage,
        joruneysAreLoading,
        setJourneyAreLoading
      }}    
    >
      {children}
    </DashboardContext.Provider>
  );
};
