import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Journey } from "@/types/journey";
import React from "react";

import { GoArrowUpRight } from "react-icons/go";
import MarkAsTracking from "../common/MarkAsTracking";
import MarkAsPending from "../common/MarkAsPending";
import useJourneyAction from "../../hooks/useJourneyAction";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import BasicInfo from "../../../../components/BasicInfo";
import UbicationInfo from "../../../../components/UbicationInfo";
import ExtinguishersInfo from "../../../../components/ExtinguishersInfo";
import VisitInfo from "../../../../components/VisitInfo";
import { Label } from "@/components/ui/label";

type Props = {
  item: Journey;
};

const OpenDetails: React.FC<Props> = ({ item }) => {
  const {
    onMarkAsPending,
    onMarkAsTracking,
    filterByStatus,
    isFormOpen,
    toggleFormOpen,
  } = useJourneyAction();

  function GetOnActionButton(item: Journey): React.ReactNode {
    switch (filterByStatus) {
      case "pending":
        return (
          <MarkAsTracking journey={item} onMarkAsTracking={onMarkAsTracking} />
        );
      case "completed":
        return (
          <MarkAsPending journey={item} onMarkAsPending={onMarkAsPending} />
        );
      case "retired":
        return (
          <MarkAsTracking journey={item} onMarkAsTracking={onMarkAsTracking} />
        );
      default:
        return;
    }
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={toggleFormOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer rounded-full"
          size="sm"
          variant="ghost"
        >
          <GoArrowUpRight size={20} /> Abrir
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[90vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleFormOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-2 md:p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>Detalles</DialogTitle>
            <DialogDescription>
              Todos los detalles pertenecientes a la tarjeta seleccionada.
            </DialogDescription>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2.5">
            {/* CLIENTE */}
            <div className="md:col-span-2 p-5 bg-gray-200 rounded-3xl">
              <div className="flex flex-col gap-1.5">
                <Label>Cliente</Label>

                <div className="flex justify-start">
                  <h2 className="text-zinc-800">
                    {item.name} {item.surname}
                  </h2>
                </div>
              </div>
            </div>

            {/*  Información básica */}
            <BasicInfo item={item} />

            {/*  Detalle de matafuegos */}
            <ExtinguishersInfo item={item} />

            {/*  Ubicación */}
            <UbicationInfo item={item} />

            {/*  Información de la visita (si no está pendiente) */}
            {item.journey_status !== "pending" && <VisitInfo item={item} />}
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 flex justify-end gap-2 p-4">
          <div className="flex justify-end">{GetOnActionButton(item)}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OpenDetails;
