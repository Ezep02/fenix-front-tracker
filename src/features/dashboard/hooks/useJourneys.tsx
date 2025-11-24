import { useContext, useEffect, useState } from "react";
import { GetJourneyList } from "@/services/journey_service";
import { Journey } from "@/types/journey";
import { DashboardContext } from "../context/DashboardContext";

const CLIENT_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/journey`;

type SSEMessage = { type: string; data: any };

const useJourneys = () => {
  const { 
    journeyList, 
    setJourneyList, 
    filterByOrderBy,
    filterByStatus,
    hasMoreJourneys,
    setHasMoreJourneys,
    setCurrentJourneyPage,
  } = useContext(DashboardContext)!;

  const [progress, setProgress] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<"idle" | "processing" | "completed" | "error">("idle");
  


  

  // ---------- Helper centralizado ----------
  const updateJourneyList = (updates: Journey[]) => {
    setJourneyList((prev) => {
      const map = new Map(prev.map((j) => [j.id, j]));
      updates.forEach((j) => map.set(j.id, { ...map.get(j.id), ...j }));
      return Array.from(map.values()).filter(
        (j) => j.journey_status === filterByStatus
      );
    });
  };

  // ---------- SSE ----------
  useEffect(() => {
    const eventSource = new EventSource(`${CLIENT_BASE_URL}/stream`);

    eventSource.addEventListener("message", (event) => {
      try {
        const message: SSEMessage = JSON.parse(event.data);
        console.info("Message", message)
        switch (message.type) {
          case "journey_created":
            setProgress(message.data.processed);
            setTotal(message.data.total);
            setStatus("processing");
            break;

          case "batch_created":
            if(Array.isArray(message.data)) setJourneyList(message.data)
            break
          case "journey_returned":
            if (Array.isArray(message.data)) updateJourneyList(message.data);
            break;

          case "completed":
            setStatus("completed");
            break;

          default:
            console.warn("Evento SSE desconocido:", message);
        }
      } catch (err) {
        console.error("Error parseando SSE", err);
        setStatus("error");
      }
    });

    eventSource.onerror = () => {
      setStatus("error");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  // ---------- Fetch inicial según filtro ----------
  useEffect(() => {
    const fetchJourneyList = async () => {
      try {
        setCurrentJourneyPage(0);
        setHasMoreJourneys(true);
        setJourneyList([]);

        const res = await GetJourneyList(0, filterByStatus, filterByOrderBy);
        if (res?.length) {
          setJourneyList(res);
          setCurrentJourneyPage((prev) => prev +1)
        }
      } catch (error) {
        console.error("Error recuperando JourneyListRes", error);
      }
    };

    fetchJourneyList();
  }, [filterByOrderBy, filterByStatus]);



  return {
    journeyList,
    progress,
    total,
    status,
 
    hasMoreJourneys,
    filterByStatus,
  };
};

export default useJourneys;
