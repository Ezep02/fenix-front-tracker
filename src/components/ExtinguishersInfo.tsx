import { Label } from "@/components/ui/label";
import { Journey } from "@/types/journey";
import React from "react";

type Props = {
  item: Journey;
};

const ExtinguishersInfo: React.FC<Props> = ({ item }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-zinc-600">Matafuegos</Label>

      <div className="space-y-1 text-sm text-zinc-800 p-5 bg-gray-200 rounded-3xl">
        <p>
          <strong>Números:</strong>{" "}
          {item.fire_extinguisher_numbers.join(", ") || "—"}
        </p>
        <p>
          <strong>Años de fabricación:</strong>{" "}
          {item.manufacture_years.join(", ") || "—"}
        </p>
        <p>
          <strong>Tipos:</strong> {item.types.join(", ") || "—"}
        </p>
      </div>
    </div>
  );
};

export default ExtinguishersInfo;
