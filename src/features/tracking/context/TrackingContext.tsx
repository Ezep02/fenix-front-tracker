import { Journey } from "@/types/journey";
import React, { useState } from "react";

interface TrackingContextProps {
  trackingItemsList: Journey[] | []
  setTrackingList: React.Dispatch<React.SetStateAction<Journey[]>>

  // Lista de journeys
  journeyList: Journey[] | []
  setJourneyList:  React.Dispatch<React.SetStateAction<Journey[]>>

  // Hashmap de elementos que se estan trackeando
  onTrackingMap: Map<number, boolean>
  setOnTrackingMap: React.Dispatch<React.SetStateAction<Map<number, boolean>>>
}

export const TrackingContext = React.createContext<TrackingContextProps | undefined>(undefined);

interface ChildrenProviderProp {
  children: React.ReactNode;
}

export const TrackingContextProvider: React.FC<ChildrenProviderProp> = ({children}) => {
  
  // Items que estan siendo trackeados
  const [trackingItemsList, setTrackingList] = useState<Journey[]>([])

  const [journeyList, setJourneyList] = useState<Journey[]>([]);


  // Hashmap para 
  const [onTrackingMap, setOnTrackingMap] = useState<Map<number, boolean>>(new Map)


  return (
    <TrackingContext.Provider
      value={{
        trackingItemsList,
        setTrackingList,
        onTrackingMap,
        setOnTrackingMap,
        journeyList,
        setJourneyList
      }}    
    >
      {children}
    </TrackingContext.Provider>
  );
};
