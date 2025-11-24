import React from "react";

type Props = {
  text?: string;
  stat_content?: number;
  inherited_action?: React.ReactElement;
};

const JourneyStats: React.FC<Props> = ({
  text,
  stat_content,
  inherited_action,
}) => {
  return (
    <div className="p-10 rounded-4xl bg-zinc-900 flex flex-col gap-1.5 text-start transition-transform duration-300 border-zinc-400 shadow-lg">
      {/* Etiqueta */}
      <h2 className="text-sm font-medium text-gray-300">{text}</h2>

      {inherited_action ? (
        <div className="flex justify-center items-center">
          {inherited_action}
        </div>
      ) : (
        <div className="flex justify-between flex-wrap">
          <p className="text-4xl font-bold text-zinc-50">{stat_content}</p>
        </div>
      )}
      {/* Número principal */}
    </div>
  );
};

export default JourneyStats;
