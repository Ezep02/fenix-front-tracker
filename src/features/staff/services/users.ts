import { AuthenticationInstance } from "@/configs/axios_config"
import { User } from "@/types/user"


const REGISTER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`

export const registerUser = async (data: User) => {
    let registerRes = await AuthenticationInstance.post<User>(`${REGISTER_BASE_URL}/register`, data)
    return registerRes.data
}


const USERS_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/users`

export const allUserList = async () => {
    let registerRes = await AuthenticationInstance.get(`${USERS_BASE_URL}/all`)
    return registerRes.data
}

export const updateUser = async (data: User) => {
    let updateRes = await AuthenticationInstance.put<User>(`${USERS_BASE_URL}/${data.id}`, data)
    return updateRes.data
}
