import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
import JourneySortByAddress from "../common/JourneySortByAddress";
import { JourneyFilterBy } from "../../types/JourneyItem";
import { DashboardContext } from "../../context/DashboardContext";
import { Button } from "@/components/ui/button";
import { IoFilterOutline } from "react-icons/io5";
import { JourneyStatus } from "@/types/JourneyStatus";

const OpenFilters = () => {
  const {
    filterByStatus,
    setFilterByStatus,
    filterByOrderBy,
    setFilterByOrderBy,
  } = useContext(DashboardContext)!;

  // Estado del Dialog (abrir/cerrar)
  const [open, setOpen] = useState(false);

  // Estados locales (temporales)
  const [tempStatus, setTempStatus] = useState<JourneyStatus>(filterByStatus);
  const [tempOrderBy, setTempOrderBy] = useState<JourneyFilterBy>(filterByOrderBy);

  // Guardar cambios en el contexto y cerrar modal
  const handleSaveFilters = () => {
    setFilterByStatus(tempStatus);
    setFilterByOrderBy(tempOrderBy);
    setOpen(false);
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full cursor-pointer active:scale-95"
        >
          <IoFilterOutline />
          Filtros
        </Button>
      </DialogTrigger>

      <DialogContent className="p-6 space-y-4">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl text-start font-bold text-zinc-800">
            Filtra tus tarjetas
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-start">
            Elegí los filtros y luego dale a guardar para ver reflejado los
            cambios.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 items-center">
          {/* Filtro por dirección */}
          <JourneySortByAddress
            filterByOrderBy={tempOrderBy}
            onFilterChange={(val) => setTempOrderBy(val)}
          />

          {/* Filtro por estado */}
          <div>
            <select
              value={tempStatus}
              onChange={(e) => setTempStatus(e.target.value as JourneyStatus)}
              className="p-2 border delay-75 cursor-pointer rounded-full bg-zinc-900 text-zinc-50 border-zinc-700 hover:bg-zinc-800"
            >
              <option value="pending">Pendiente</option>
              <option value="completed">Completada</option>
              <option value="retired">Retiros</option>
            </select>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="ghost"
            className="rounded-full cursor-pointer"
            onClick={() => setOpen(false)} 
          >
            Cancelar
          </Button>
          <Button
            disabled={
              tempStatus === filterByStatus && tempOrderBy === filterByOrderBy
            }
            onClick={handleSaveFilters}
            className="rounded-full active:scale-95 cursor-pointer"
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenFilters;
