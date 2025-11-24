
import { AuthenticationInstance } from "@/configs/axios_config"
import { User } from "@/types/user";

const USER_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/users`;

export const UpdateUsername = async (id: number, new_username: string) => {
    let UpdateUsernameRes = await AuthenticationInstance.put<string>(`${USER_BASE_URL}/username/${id}`, {
        new_username: new_username
    })
    return UpdateUsernameRes.data
}

export const UpdateUserInfo = async (id: number, data: User) => {
    let UpdateUsernameRes = await AuthenticationInstance.put<User>(`${USER_BASE_URL}/${id}`, data)
    return UpdateUsernameRes.data
}

export const UpdateUserPassword = async (id: number, new_password: string) => {
    let UpdateUsernameRes = await AuthenticationInstance.put(`${USER_BASE_URL}/password/${id}`, {
        new_password: new_password
    })
    return UpdateUsernameRes.data
}