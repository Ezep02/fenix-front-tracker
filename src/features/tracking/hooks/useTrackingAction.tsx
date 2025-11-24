import { useActionState, useContext, useState } from "react";
import {
  MarkAsCompleted,
  MarkAsPending,
  MarkAsRetired,
} from "../services/tracking_service";
import { TrackingContext } from "../context/TrackingContext";
import { Visit } from "@/types/visit";
import { createVisit, updateVisit } from "../services/visit_service";

const useTrackingAction = () => {
  const {
    setJourneyList,
    journeyList,
    setTrackingList,
    setOnTrackingMap,
    onTrackingMap,
  } = useContext(TrackingContext)!;

  // Dialogs controllers
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const toggleDetailOpen = () => {
    setIsDetailsOpen((prev) => !prev);
  };

  const [isVisitDialogOpen, setIsVisitDialogOpen] = useState(false);
  const toggleVisitDialogOpen = () => {
    setIsVisitDialogOpen((prev) => !prev);
  };

  // Funcion para remover de la vista de trackeango una tarjeta luego de ser
  // marcada como completada
  const onMarkAsRetired = async (id?: number) => {
    if (id == null) return; // chequear null o undefined

    try {
      let res = await MarkAsRetired(id);
      if (res) {
        setJourneyList((prev) => prev.filter((curr) => curr.id !== id));
        setTrackingList((prev) => prev.filter((elm) => elm.id !== id));
      }
    } catch (error) {
      console.error("Algo no fue bien completando el viaje", error);
    }
  };

  const onMarkAsPending = async (id: number) => {
    if (id == null) return; // chequear null o undefined

    try {
      let res = await MarkAsPending(id);
      if (res) {
        setJourneyList((prev) => prev.filter((curr) => curr.id !== id));
        setTrackingList((prev) => prev.filter((elm) => elm.id !== id));
      }
    } catch (error) {
      console.error("Algo no fue bien completando el viaje", error);
    }
  };

  const onMarkAsCompleted = async (id: number) => {
    if (id == null) return; // chequear null o undefined

    try {
      let res = await MarkAsCompleted(id);
      if (res) {
        setJourneyList((prev) => prev.filter((curr) => curr.id !== id));
        setTrackingList((prev) => prev.filter((elm) => elm.id !== id));
      }
    } catch (error) {
      console.error("Algo no fue bien completando el viaje", error);
    }
  };

  const onStartTracking = (id: number, status: "selected" | "unselected") => {
    switch (status) {
      case "selected": {
        const findElement = journeyList.find((elm) => elm.id === id);
        if (!findElement) return;

        // Actualizamos la lista de tracking
        setTrackingList((prev) => {
          if (prev.some((elm) => elm.id === id)) {
            console.info("El journey ya estaba en la lista de tracking:", id);
            return prev;
          }
          return [...prev, findElement];
        });

        // Marcamos como true en el Map
        setOnTrackingMap((prev) => new Map(prev).set(id, true));
        break;
      }

      case "unselected": {
        // Quitamos de la lista de tracking
        setTrackingList((prev) => prev.filter((elm) => elm.id !== id));

        // Marcamos como false en el Map
        setOnTrackingMap((prev) => new Map(prev).set(id, false));
        break;
      }
    }
  };

  // Funcion para buscar si un elemento se esta trackeando o no
  const onSearchIsTracking = (id: number): boolean => {
    if (id == null) return false;

    // devolver true si existe
    return onTrackingMap.get(id) ?? false;
  };

  // VISITAS
  const [createVisitErr, onCreateVisitAction, isCreateVisitPending] =
    useActionState(async (_: string | null, data: Visit) => {
      try {
  
        const res = await createVisit(data.journey_id, data);
        if (res) {
          setJourneyList((prev) =>
            prev.map((curr) =>
              curr.id === data.journey_id ? { ...curr, visits: res } : curr
            )
          );

          toggleVisitDialogOpen();
        }
        return res ? null : "No se pudo crear el servicio";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error creando servicio"
        );
      }
    }, null);

  const [updateVisitErr, onUpdateVisitAction, isUpdateVisitPending] =
    useActionState(async (_: string | null, data: Visit) => {
      try {
        if (!data.id) return "Id del servicio no existe";
        console.log(data)
        const res = await updateVisit(data.journey_id, data);

        if (res) {
          console.log(res)
          setJourneyList((prev) =>
            prev.map((curr) =>
              curr.id === data.journey_id ? { ...curr, visits: { ...curr.visits ,...res}} : curr
            )
          );

          toggleVisitDialogOpen();
        }

        return res ? null : "No se pudo crear el servicio";
      } catch (error: any) {
        return (
          error?.response?.data?.error ||
          error.message ||
          "Error actualizando el servicio"
        );
      }
    }, null);

  return {
    onMarkAsRetired,
    onStartTracking,
    onSearchIsTracking,
    onMarkAsPending,
    onMarkAsCompleted,

    // crear visita
    createVisitErr,
    onCreateVisitAction,
    isCreateVisitPending,

    // actualizar visita
    updateVisitErr,
    onUpdateVisitAction,
    isUpdateVisitPending,

    // Dialogos
    isDetailsOpen,
    toggleDetailOpen,
    isVisitDialogOpen,
    toggleVisitDialogOpen,
  };
};

export default useTrackingAction;
