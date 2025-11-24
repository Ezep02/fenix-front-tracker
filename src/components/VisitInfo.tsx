import { Label } from "@/components/ui/label";
import VisitForm from "@/features/tracking/components/forms/VisitForm";
import { Journey } from "@/types/journey";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  item: Journey;
};

const VisitInfo: React.FC<Props> = ({ item }) => {
  const wasUpdatedRecently = (dateString: Date) => {
    const updatedAt = new Date(dateString);
    const now = new Date();
    const diffMinutes = (now.getTime() - updatedAt.getTime()) / 1000 / 60;
    return diffMinutes <= 10;
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-zinc-600">Visita</Label>

      <div className="bg-gray-200 rounded-3xl p-5">
        {item.visits ? (
          <div className="space-y-1 text-sm text-zinc-800">
            <p>
              <strong>Visitado:</strong> {item.visits.visited ? "Sí" : "No"}
            </p>
            <p>
              <strong>Matafuegos dejados:</strong>{" "}
              {item.visits.fire_extinguishers_left ? "Sí" : "No"}
            </p>

            {item.visits.fire_extinguishers_left && (
              <p>
                <strong>Cantidad:</strong>{" "}
                {item.visits.fire_extinguishers_left_count}
              </p>
            )}
            <p>
              <strong>Nota:{" "}</strong>
              {item.visits.note ? (
                <>{item.visits.note}</>
              ) : (
                <span className="italic">Sin nota</span>
              )}
            </p>

            {item.visits.visited && (
              <p>
                <strong>Última visita:</strong>{" "}
                {item.visits.visited_at
                  ? new Date(item.visits.visited_at).toLocaleDateString(
                      "es-AR",
                      {
                        day: "numeric",
                        month: "long",
                        weekday: "short",
                        year: "numeric",
                      }
                    )
                  : "—"}
              </p>
            )}

            {wasUpdatedRecently(item.visits.updated_at) && (
              <>
                <p className="text-sm text-blue-600">
                  Solo podes actualizar en menos de 10 minutos
                </p>

                <VisitForm
                  journey_id={item.id}
                  visit={item.visits}
                  trigger={
                    <Button className="rounded-full active:scale-95 cursor-pointer">
                      Editar
                    </Button>
                  }
                />
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600 mt-2">
            Sin información de visita registrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default VisitInfo;
