import { useContext, useState } from "react";
import { MarkAsPending, MarkAsTracking } from "../services/journey_service";
import { GetJourneyList } from "@/services/journey_service";
import { DashboardContext } from "../context/DashboardContext";

const useJourneyAction = () => {
  const {
    filterByOrderBy,
    filterByStatus,
    setJourneyList,
    currentJourneyPage,
    setCurrentJourneyPage,
    hasMoreJourneys,
    setHasMoreJourneys,
    setJourneyAreLoading,
    joruneysAreLoading,
  } = useContext(DashboardContext)!;

  const [isFormOpen, setFormIsOpen] = useState<boolean>(false);
  const toggleFormOpen = () => {
    setFormIsOpen((prev) => !prev);
  };

  // ---------- Search more joruneys ----------
  const SearchMoreJourneys = async () => {
    if (joruneysAreLoading || !hasMoreJourneys) return;

    try {
      setJourneyAreLoading(true);
      const nextPage = currentJourneyPage + 1;

      const res = await GetJourneyList(
        nextPage,
        filterByStatus,
        filterByOrderBy
      );

      if (res?.length > 0) {
        setJourneyList((prev) => [...prev, ...res]);
        setCurrentJourneyPage(nextPage);
      } else {
        setHasMoreJourneys(false);
      }
    } catch (error) {
      console.warn("Error cargando más journeys:", error);
    } finally {
      setJourneyAreLoading(false);
    }
  };

  // ---------- Tracking ----------
  const onMarkAsTracking = async (id: number) => {
    if (!id) return;

    try {
      const res = await MarkAsTracking(id);
      if (res) {
        setJourneyList((prev) => prev.filter((curr) => curr.id !== id));
        toggleFormOpen()
      }
    } catch (error) {
      console.error("Algo no fue bien", error);
    }
  };

  const onMarkAsPending = async (id: number) => {
    if (!id) return;

    try {
      const res = await MarkAsPending(id);
      if (res) {
        setJourneyList((prev) => prev.filter((curr) => curr.id !== id));
        toggleFormOpen()
      }
    } catch (error) {
      console.error("Algo no fue bien", error);
    }
  };

  return {
    onMarkAsTracking,
    onMarkAsPending,
    SearchMoreJourneys,
    filterByStatus,
    isFormOpen,
    toggleFormOpen,
  };
};

export default useJourneyAction;
