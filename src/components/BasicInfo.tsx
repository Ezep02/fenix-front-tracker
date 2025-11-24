import { Label } from "@/components/ui/label";
import { Journey } from "@/types/journey";
import React from "react";

type Props = {
    item:Journey
}

const BasicInfo:React.FC<Props> = ({item}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-zinc-600">Información básica</Label>
      
      <div className="space-y-1 text-sm text-zinc-800 p-5 bg-gray-200 rounded-3xl">
        <p>
          <strong>Teléfono:</strong> {item.phone || "—"}
        </p>
        <p>
          <strong>Nombre comercial:</strong> {item.trade_name || "—"}
        </p>
        <p>
          <strong>Estado:</strong> {item.journey_status}
        </p>
        <p>
          <strong>Cantidad de matafuegos:</strong> {item.quantity ?? 0}
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
