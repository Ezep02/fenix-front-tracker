import React, { useContext } from "react";

import { Loader2 } from "lucide-react";
import JourneyItem from "../components/common/JourneyItem";

import { Button } from "@/components/ui/button";

import useJourneys from "../hooks/useJourneys";
import OpenFilters from "../components/dialogs/OpenFilters";
import OpenDetails from "../components/dialogs/OpenDetails";
import { DashboardContext } from "../context/DashboardContext";
import useJourneyAction from "../hooks/useJourneyAction";

const JourneySection: React.FC = () => {
  
  const {
    hasMoreJourneys,
    joruneysAreLoading,
  } = useContext(DashboardContext)!
  
  const {
    journeyList,
    filterByStatus,
  } = useJourneys();

  const {
    SearchMoreJourneys
  } = useJourneyAction()
  
  function GetDescriptionByStatus(): React.ReactNode {
    switch (filterByStatus) {
      case "pending":
        return "viajes pendientes";
      case "completed":
        return "viajes completados";
      case "retired":
        return "Retiros realizados";
      default:
        return;
    }
  }



  return (
    <section className="flex border-gray-200 grow">
      <div className="flex flex-col flex-grow gap-2">
        <div className="flex justify-between p-2 items-center flex-wrap gap-2.5">
          <div>
            <h2 className="text-gray-700 font-medium">Tus viajes</h2>
            <p>
              Mostrando {journeyList.length} {GetDescriptionByStatus()}
            </p>
          </div>

          <div className="flex gap-2">
            {/* ACCIONES */}
            <OpenFilters />
          </div>
        </div>

        <div className="space-y-4">
          {Array.isArray(journeyList) && journeyList.length > 0 ? (
            <ul className="flex flex-col gap-1.5">
              {journeyList.map((item) => (
                <JourneyItem
                  key={item.id}
                  item={item}
                  details={<OpenDetails item={item}/>}
                />
              ))}

              {/* Loader para infinite scroll */}
              {joruneysAreLoading && (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="animate-spin w-6 h-6 text-rose-500" />
                </div>
              )}
              {hasMoreJourneys && (
                <div className="flex justify-center py-5">
                  <Button
                    onClick={SearchMoreJourneys}
                    size={"sm"}
                    variant={"ghost"}
                    className="rounded-full cursor-pointer"
                  >
                    Ver mas
                  </Button>
                </div>
              )}

              {/* Mensaje final cuando ya no hay más citas */}
              {!hasMoreJourneys && !joruneysAreLoading && (
                <p className="text-center text-gray-500 py-4">
                  No hay más pendientes en tu historial
                </p>
              )}
            </ul>
          ) : (
            <div className="p-2">
              <div className="text-center py-8">
                <p className="text-gray-700">No tienes citas pendientes</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
