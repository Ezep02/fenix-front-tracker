import { AuthenticationInstance } from "@/configs/axios_config";
import { User } from "@/types/user";
import { LoginFormData } from "../types/login/loginFormTypes";

const AUTH_BASE_URL = `${import.meta.env.VITE_AUTH_BACKEND_URL}/auth`

type LoginRes = {
    message:string
    user: User
}

export const Login = async (data: LoginFormData) => {
    let loginRes = await AuthenticationInstance.post<LoginRes>(`${AUTH_BASE_URL}/login`, data)
    return loginRes.data
}