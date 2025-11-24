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
import React, { useState } from "react";

import { GoArrowUpRight } from "react-icons/go";

import MarkAsPending from "../common/MarkAsPending";

import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Label } from "@/components/ui/label";
import useTrackingAction from "../../hooks/useTrackingAction";
import { JourneyStatus } from "@/types/JourneyStatus";
import MarkAsCompleted from "../common/MarkAsCompleted";
import BasicInfo from "@/components/BasicInfo";
import ExtinguishersInfo from "@/components/ExtinguishersInfo";
import UbicationInfo from "@/components/UbicationInfo";
import VisitInfo from "@/components/VisitInfo";
import MarkAsRetired from "../common/MarkAsRetired";
import VisitForm from "../forms/VisitForm";

type Props = {
  item: Journey;
};

const OpenDetails: React.FC<Props> = ({ item }) => {
  const {
    onMarkAsCompleted,
    onMarkAsRetired,
    onMarkAsPending,
    isDetailsOpen,
    toggleDetailOpen,
  } = useTrackingAction();

  const [filterByStatus, setFilteredByStatus] = useState<JourneyStatus | "">(
    ""
  );

  function GetOnActionButton(item: Journey): React.ReactNode {
    switch (filterByStatus) {
      case "retired":
        return (
          <MarkAsRetired journey={item} onMarkAsRetired={onMarkAsRetired} />
        );
      case "pending":
        return (
          <MarkAsPending journey={item} onMarkAsPending={onMarkAsPending} />
        );
      case "completed":
        return (
          <MarkAsCompleted
            journey={item}
            onMarkAsCompleted={onMarkAsCompleted}
          />
        );
      default:
        return <p>Ninguna accion seleccionada</p>;
    }
  }

  return (
    <Dialog open={isDetailsOpen} onOpenChange={toggleDetailOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer rounded-full active:scale-95"
          size="sm"
          variant="ghost"
          onClick={(e) => e.stopPropagation()}
        >
          <GoArrowUpRight size={16} /> Ver
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[95vh] 2xl:min-h-[80vh] 2xl:max-w-5xl
          xl:max-h-[90vh] xl:min-h-[80vh] xl:max-w-4xl 
          lg:max-h-[90vh] lg:min-h-[85vh] lg:max-w-3xl
          md:max-h-[95vh] md:min-h-[80vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          flex flex-col z-50 md:rounded-4xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
          p-6
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDetailOpen();
              }}
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

            {/*  Detalle de matafuegos */}
            <ExtinguishersInfo item={item} />

            {/*  Ubicación */}
            <UbicationInfo item={item} />

            {/*  Información básica */}
            <BasicInfo item={item} />

            {/*  Información de la visita (si no está pendiente) */}
            {item?.visits?.visited && <VisitInfo item={item} />}

            {/* SELECTOR DE ACCIÓN */}
            <div className="md:col-span-2 mt-4">
              <Label>Acción a realizar</Label>
              <select
                value={filterByStatus}
                onChange={(e) =>
                  setFilteredByStatus(e.target.value as JourneyStatus)
                }
                className="w-full p-2 border border-gray-300 rounded-xl mt-1"
              >
                <option value="">Seleccionar acción</option>
                <option value="pending">Marcar como pendiente</option>
                <option value="completed">Marcar como completado</option>
                <option value="retired">Marcar como retirado</option>
              </select>
            </div>

            {/* FORMULARIO EXTRA PARA RETIRED */}
            {filterByStatus === "retired" && !item?.visits?.visited && (
              <div className="md:col-span-2 mt-4 bg-gray-100 rounded-3xl p-4 border border-gray-200 flex flex-col gap-1.5">
                <p className="text-sm text-gray-600">
                  Formulario para marcar como retirado
                </p>

                <div>
                  <VisitForm
                    journey_id={item.id}
                    trigger={
                      <Button className="rounded-full active:scale-95 cursor-pointer">
                        Crear visita
                      </Button>
                    }
                  />
                </div>
              </div>
            )}
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
