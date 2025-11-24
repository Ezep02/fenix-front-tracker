import { GetJourneyList } from "@/services/journey_service";
import { useContext, useEffect } from "react";
import { TrackingContext } from "../context/TrackingContext";
import { JourneyStatus } from "@/features/dashboard/types/JourneyItem";

const useTracking = () => {
  const { setJourneyList, journeyList } = useContext(TrackingContext)!;

  useEffect(() => {
    const fetchJourneyList = async () => {
      try {
        let filterByStatus: JourneyStatus = "tracking";
        let res = await GetJourneyList(0, filterByStatus, "DESC");
        if (res) {
          setJourneyList(res);
        }
      } catch (error) {
        console.error("Error recuperando JourneyListRes", error);
      }
    };

    fetchJourneyList();
  }, []);

  return {
    journeyList,
  };
};

export default useTracking;
