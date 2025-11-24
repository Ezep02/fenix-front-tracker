import { AuthenticationInstance } from "@/configs/axios_config";
import { JourneyStats } from "../types/JourneyStats";

const JOURNEY_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/journey`;


export const GetJourneyStats = async () => {
    let response = await AuthenticationInstance.get<JourneyStats>(`${JOURNEY_BASE_URL}/stats`)
    return response.data
}