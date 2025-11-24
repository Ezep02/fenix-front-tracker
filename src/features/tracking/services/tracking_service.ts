import { AuthenticationInstance } from "@/configs/axios_config"

const TRACKING_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/journey`

export const MarkAsRetired = async (id: number) => {
    let result = await AuthenticationInstance.put(`${TRACKING_BASE_URL}/retired/${id}`)    
    return result.data
}

export const MarkAsPending = async (id: number) => {
    let result = await AuthenticationInstance.put(`${TRACKING_BASE_URL}/pending/${id}`)    
    return result.data
}

export const MarkAsCompleted = async (id: number) => {
    let result = await AuthenticationInstance.put(`${TRACKING_BASE_URL}/completed/${id}`)    
    return result.data
}


// Calcular geolocalizacion de los journeys
type GeocodingRes = {
    lat: number
    lng: number
}

export const StartGeocoding = async (address: string, city: string, country = "Argentina") => {
    let result = await AuthenticationInstance.post<GeocodingRes>(`${TRACKING_BASE_URL}/geocoding`, {
        address: address,
        city: city,
        country: country
    })

    return result.data
}