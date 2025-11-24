import React from "react";

import { Journey } from "@/types/journey";
type Props = {
  item: Journey;
  details: React.ReactNode
};

const JourneyItem: React.FC<Props> = ({ item, details}) => {


  return (
    <li
      className="px-4 py-5 bg-zinc-200/50 hover:bg-zinc-200/40 rounded-3xl border border-gray-100 flex md:items-center md:flex-row gap-2 justify-between flex-col"
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-gray-700">{item.address}</span>
        </div>
        <span className="text-gray-800 font-medium">
          {item.name} {item.surname}
        </span>
      </div>

      <div className="pt-3.5 md:p-0">
        {details}
      </div>
    </li>
  );
};

export default JourneyItem