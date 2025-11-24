import { AuthenticationInstance, MultipartInstance } from "@/configs/axios_config"

const JOURNEY_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/journey`;

type UploadExcelRes = {
    jobId:string,
	message: string
}

export const UploadExcel = async (formData: FormData) => {
    const res = await MultipartInstance.post<UploadExcelRes>(`${JOURNEY_BASE_URL}/upload`, formData)
    return res.data
}

// Funcion para actualizar los estados de los journeys status a tracking
export const MarkAsTracking = async (id: number) => {
    const res = await AuthenticationInstance.put(`${JOURNEY_BASE_URL}/tracking/${id}`)
    return res.data
}

// Funcion para actualizar el estado de completed a pending, con el fin de volver a trackear
export const MarkAsPending = async (id: number) => {
    const res = await AuthenticationInstance.put(`${JOURNEY_BASE_URL}/pending/${id}`)
    return res.data
}
