import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Journey } from "@/types/journey";

type Props = {
  c: Journey;
};

const ExcelTableItem: React.FC<Props> = ({ c }) => {
  return (
    <tr>
      <td className="px-4 py-2 border">{c.name}</td>
      <td className="px-4 py-2 border">{c.surname}</td>
      <td className="px-4 py-2 border">{c.fire_extinguisher_numbers.join(", ")}</td>
      <td className="px-4 py-2 border">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="default" className="rounded-full cursor-pointer active:scale-95">
              Detalles
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:max-w-lg max-w-sm rounded-4xl">
            <DialogHeader>
              <DialogTitle>Detalles de {c?.name}{" "}{c?.surname}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 mt-4">
              <p>
                <strong>N° Cliente:</strong> {c?.client_number}
              </p>
              <p>
                <strong>Teléfono:</strong> {c?.phone}
              </p>
              <p>
                <strong>Nombre Fantasía:</strong> {c?.trade_name}
              </p>
              <p>
                <strong>Dirección:</strong> {c?.address}
              </p>
              <p>
                <strong>Ciudad:</strong> {c?.address}
              </p>
              <p>
                <strong>N° Matafuegos:</strong> {c?.fire_extinguisher_numbers.join(", ")}
              </p>
              <p>
                <strong>Año Fab:</strong> {c?.manufacture_years.join(", ")}
              </p>
              <p>
                <strong>Tipo:</strong> {c?.types.join(", ")}
              </p>
              <p>
                <strong>Cantidad:</strong> {c?.quantity}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

export default ExcelTableItem;
