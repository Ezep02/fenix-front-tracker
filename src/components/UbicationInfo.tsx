import { Label } from "@/components/ui/label";
import { Journey } from "@/types/journey";
import React from "react";

type Props = {
  item:Journey
}

const UbicationInfo:React.FC<Props> = ({item}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-zinc-600">Ubicación</Label>

      <div className="space-y-1 text-sm text-zinc-800 p-5 bg-gray-200 rounded-3xl">
        <p>
          <strong>Dirección:</strong> {item.address}
        </p>
        {item.street_name && (
          <p>
            <strong>Calle:</strong> {item.street_name}{" "}
            {item.street_number ?? ""}
          </p>
        )}
        {item.house_number && (
          <p>
            <strong>Altura:</strong> {item.house_number}
          </p>
        )}
        {item.between_streets && (
          <p>
            <strong>Entre calles:</strong> {item.between_streets}
          </p>
        )}
        {item.extra_info && (
          <p>
            <strong>Info extra:</strong> {item.extra_info}
          </p>
        )}
      </div>
    </div>
  );
};

export default UbicationInfo;
