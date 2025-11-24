import type { User } from "../types/user";
import { AuthenticationInstance } from "./axios_config";

const AUTH_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`
const USER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/users`


// Verificar sesion del usuario
type VerifySessionRes = {
    message: string
    user: User
}

export const VerifySession = async () => {
    let sessionRes = await AuthenticationInstance.get<VerifySessionRes>(`${AUTH_BASE_URL}/verify`)
    return sessionRes.data
}

export const VerifyUserInfo = async () => {
    let userInfoRes = await AuthenticationInstance.get<User>(`${USER_BASE_URL}/info`)
    return userInfoRes.data
}