import { Button } from "@/components/ui/button";
import { Journey } from "@/types/journey";
import React, { useRef, useState } from "react";

type Props = {
  onMarkAsRetired: (id: number) => void;
  journey: Journey;
};

const MarkAsRetired: React.FC<Props> = ({ onMarkAsRetired, journey }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isIntervalActive, setIntervalActive] = useState(false);

  const initInterval = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIntervalActive(true);
    setTimeLeft(5);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIntervalActive(false);
          onMarkAsRetired(journey.id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return isIntervalActive ? (
    <>
      <Button
        variant={"ghost"}
        className="rounded-full active:scale-95 cursor-pointer"
        onClick={(e) => {
          clearInterval(timerRef.current!);
          setIntervalActive(false);
          e.stopPropagation();
        }}
      >
        Cancelar ({timeLeft})
      </Button>
      <Button
        className="rounded-full active:scale-95 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();

          clearInterval(timerRef.current!);
          onMarkAsRetired(journey.id);
          setIntervalActive(false);
        }}
      >
        Confirmar
      </Button>
    </>
  ) : (
    <Button
      onClick={initInterval}
      className="rounded-full active:scale-95 cursor-pointer"
    >
      Retirado
    </Button>
  );
};

export default MarkAsRetired;
