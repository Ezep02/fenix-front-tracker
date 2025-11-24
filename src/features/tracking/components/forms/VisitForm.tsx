import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React, { startTransition } from "react";

import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Visit } from "@/types/visit";
import useTrackingAction from "../../hooks/useTrackingAction";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  visit?: Visit;
  journey_id: number;
  trigger?: React.ReactNode;
};

const VisitForm: React.FC<Props> = ({ journey_id, visit, trigger }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Visit>({
    defaultValues: {
      id: visit?.id,
      note: visit?.note,
      journey_id: journey_id,
      fire_extinguishers_left_count: visit?.fire_extinguishers_left_count || 0,
    },
  });

  const {
    onCreateVisitAction,
    onUpdateVisitAction,
    createVisitErr,
    updateVisitErr,
    isVisitDialogOpen,
    toggleVisitDialogOpen,
  } = useTrackingAction();

  // Submit event
  const handleSubmitForm = async (data: Visit) => {
    startTransition(async () => {
      switch (visit) {
        case undefined:
          onCreateVisitAction(data);
          break;
        default:
          onUpdateVisitAction(data);
      }
    });
  };

  return (
    <Dialog open={isVisitDialogOpen} onOpenChange={toggleVisitDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className="
          2xl:max-h-[80vh] 2xl:min-h-[50vh] 2xl:max-w-3xl
          xl:max-h-[80vh] xl:min-h-[50vh] xl:max-w-3xl 
          lg:max-h-[80vh] lg:min-h-[50vh] lg:max-w-2xl
          md:max-h-[95vh] md:min-h-[50vh] md:max-w-2xl  
          max-w-full max-h-full
          w-full h-full 
          p-6 flex flex-col bg-zinc-50 z-50 md:rounded-3xl
          shadow-2xl overflow-hidden overflow-y-scroll scroll-hidden
        "
      >
        <DialogHeader>
          <div className="flex gap-4 mb-3 items-center">
            <button
              onClick={toggleVisitDialogOpen}
              className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition cursor-pointer"
            >
              <MdOutlineKeyboardArrowLeft size={24} className="text-zinc-700" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-5 md:px-10 flex-1">
          <div>
            <DialogTitle>
              {visit ? "Editar visita" : "Guardar visita"}
            </DialogTitle>
            <DialogDescription>
              Completa los campos y guarda los cambios.
            </DialogDescription>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="space-y-6 mt-4"
          >
            {/* Cantidad de matafuegos dejados */}
            <div>
              <Label htmlFor="fire_extinguishers_left_count">
                Cantidad de matafuegos dejados
              </Label>
              <Input
                id="fire_extinguishers_left_count"
                type="number"
                step="0"
                {...register("fire_extinguishers_left_count", {
                  required: "El precio es obligatorio",
                  min: {
                    value: 0,
                    message:
                      "La cantidad de matafuegos dejados no puede ser negativa",
                  },
                  valueAsNumber: true,
                })}
                className="mt-1 rounded-xl"
              />
              {errors.fire_extinguishers_left_count && (
                <p className="text-sm text-red-500">
                  {errors.fire_extinguishers_left_count.message}
                </p>
              )}
            </div>

            {/* Nota */}
            <div>
              <Label htmlFor="note">Nota</Label>
              <Textarea
                id="note"
                {...register("note")}
                placeholder="Escribe una nota"
                className="mt-1 rounded-xl"
              />
            </div>

            {createVisitErr && !visit && (
              <p style={{ color: "red" }}>{createVisitErr}</p>
            )}
            {updateVisitErr && visit && (
              <p style={{ color: "red" }}>{updateVisitErr}</p>
            )}

            {/* Botones */}
            <div className="sticky bottom-0 flex justify-end gap-2 p-4">
              <Button
                type="submit"
                className="rounded-full active:scale-95 cursor-pointer"
              >
                Guardar cambios
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisitForm;
