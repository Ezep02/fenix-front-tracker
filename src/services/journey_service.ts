import { AuthenticationInstance } from "@/configs/axios_config";
import { JourneyFilterBy } from "@/features/dashboard/types/JourneyItem";
import { Journey } from "@/types/journey";
import { JourneyStatus } from "@/types/JourneyStatus";

const JOURNEY_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/journey`;


// FUncion para cargar los recorridos iniciales 
export const GetJourneyList = async (review_offset: number, journey_status: JourneyStatus, order_by: JourneyFilterBy) => {
  const res = await AuthenticationInstance.get<Journey[]>(`${JOURNEY_BASE_URL}/all/page/${review_offset}/${journey_status}/${order_by}`);
  return res.data;
};