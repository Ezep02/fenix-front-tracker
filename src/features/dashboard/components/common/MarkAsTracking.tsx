import { Button } from '@/components/ui/button'
import { Journey } from '@/types/journey'
import React, { useRef, useState } from 'react'

type Props = {
    onMarkAsTracking: (id: number) => void
    journey: Journey
}

const MarkAsTracking: React.FC<Props> = ({ onMarkAsTracking, journey }) => {

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
                    onMarkAsTracking(journey.id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return isIntervalActive ? (
        <div className='flex justify-center md:block'>
            <Button
                variant={"ghost"}
                className='rounded-full active:scale-95 cursor-pointer'
                onClick={(e) => {
                    clearInterval(timerRef.current!);
                    setIntervalActive(false);
                    e.stopPropagation();
                }}>
                Cancelar{" "}({timeLeft})
            </Button>
            <Button
                className='rounded-full active:scale-95 cursor-pointer'
                onClick={() => {
                    clearInterval(timerRef.current!);
                    onMarkAsTracking(journey.id);
                    setIntervalActive(false)
                }}
            >
                Confirmar
            </Button>
        </div>
    ) : (
        <Button
            onClick={initInterval}
            variant={"default"}
            className='rounded-full active:scale-95 cursor-pointer w-full'
        >
            Hacer seguimiento
        </Button>
    );
}

export default MarkAsTracking