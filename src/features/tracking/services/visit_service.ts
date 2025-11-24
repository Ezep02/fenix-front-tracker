import { AuthenticationInstance } from "@/configs/axios_config"
import { Visit } from "@/types/visit"

const TRACKING_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/journey`


export const createVisit = async (service_id: number, visit:Visit) => {
    let onCreateRes = await AuthenticationInstance.post<Visit>(`${TRACKING_BASE_URL}/visit/${service_id}`, visit)
    return onCreateRes.data
}

export const updateVisit = async (service_id: number, visit:Visit) => {
    let onCreateRes = await AuthenticationInstance.put<Visit>(`${TRACKING_BASE_URL}/visit/${service_id}`, visit)
    return onCreateRes.data
}