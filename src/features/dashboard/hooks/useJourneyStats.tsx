import { useEffect, useState } from "react";
import { JourneyStats } from "../types/JourneyStats";
import { GetJourneyStats } from "../services/journey_stats";

const useJourneyStats = () => {
  const [journeyStats, setJourneyStats] = useState<JourneyStats>();

  useEffect(() => {
    const fetchStats = async () => {
      let res = await GetJourneyStats();
      if (res) {
        setJourneyStats(res);
      }
    };

    fetchStats();
  }, []);

  return {
    journeyStats
  };
};

export default useJourneyStats;
