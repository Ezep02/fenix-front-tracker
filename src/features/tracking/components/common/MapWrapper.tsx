import React from "react";

type Props = {
  children: React.ReactNode;
};

const MapWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full min-h-[500px] max-h-full">{children}</div>
  );
};

export default MapWrapper;
