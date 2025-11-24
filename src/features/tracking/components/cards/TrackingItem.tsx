import { Journey } from "@/types/journey";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  item: Journey;
  onStartTracking: (id: number, status: "selected" | "unselected") => void;
  isTracking: boolean;
  actions: React.ReactNode;
};

const TrackingItem: React.FC<Props> = ({
  item,
  isTracking,
  actions,
  onStartTracking,
}) => {
  const [isSelected, setIsSelected] = useState(isTracking);

  const toggleSelection = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onStartTracking(item.id, newState ? "selected" : "unselected");
  };

  return (
    <li className="px-6 py-5 rounded-3xl border flex flex-col gap-3 transition-colors w-full">
      {/* Main content */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Checkbox + info */}
        <div className="flex items-center gap-3">
          <label
            className="relative flex items-center cursor-pointer mt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={toggleSelection}
              className="
                peer appearance-none w-6 h-6 border-2 border-gray-500 rounded-full cursor-pointer 
                checked:bg-zinc-900 checked:border-gray-900
                transition-colors duration-200
                focus:outline-none focus:ring-gray-900/50 
                hover:ring-1 group-hover:ring-1
              "
            />
            <Check
              size={17}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
              text-white transform opacity-0 scale-50 
              transition-all duration-200 ease-out
              peer-checked:opacity-100 peer-checked:scale-100"
            />
          </label>

          <div className="flex flex-col">
            <span className="font-medium">{item.address}</span>
            <span className="text-gray-800">
              {item.name} {item.surname}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key="default"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {actions}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
};

export default TrackingItem;
