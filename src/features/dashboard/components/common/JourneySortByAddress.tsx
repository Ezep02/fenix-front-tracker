import React from "react";
import { JourneyFilterBy } from "../../types/JourneyItem";

type JourneySortByAddressProps = {
  filterByOrderBy: JourneyFilterBy;
  onFilterChange: (value: JourneyFilterBy) => void;
};

const JourneySortByAddress: React.FC<JourneySortByAddressProps> = ({
  filterByOrderBy,
  onFilterChange,
}) => {
  return (
    <div className="py-4">
      <select
        value={filterByOrderBy}
        onChange={(e) => onFilterChange(e.target.value as JourneyFilterBy)}
        className="px-4 py-2 border delay-75 cursor-pointer rounded-full bg-zinc-900 text-zinc-50 border-zinc-700  hover:bg-zinc-800 active:scale-95"
      >
        <option value="ASC">Dirección: A → Z</option>
        <option value="DESC">Dirección: Z → A</option>
      </select>
    </div>
  );
};

export default JourneySortByAddress;
