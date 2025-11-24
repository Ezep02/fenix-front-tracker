import React from "react";
import useJourneyStats from "../hooks/useJourneyStats";
import JourneyStats from "../components/card/JourneyStats";
import OpenExcelMockup from "../components/dialogs/OpenExcelMockup";

const JourneyStatSection: React.FC = () => {
  const { journeyStats } = useJourneyStats();

  return (
    <section className="py-3 flex flex-col gap-3">
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-1.5">
        <JourneyStats
          stat_content={journeyStats?.completed_journeys ?? 0}
          text="Completados"
        />
        <JourneyStats
          stat_content={journeyStats?.in_progress_journeys ?? 0}
          text="En progreso"
        />
        <JourneyStats
          stat_content={journeyStats?.pending_journeys ?? 0}
          text="Pendientes"
        />
        <JourneyStats
          stat_content={journeyStats?.retired_journeys ?? 0}
          text="Retirados"
        />
        <JourneyStats
          stat_content={journeyStats?.total_journeys ?? 0}
          text="Totales"
        />

        <JourneyStats
          text="Subir archivo"
          inherited_action={<OpenExcelMockup />}
        />
      </div>
    </section>
  );
};

export default JourneyStatSection;
