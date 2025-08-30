import { User } from "@/types/user";
import { nextServer } from "./api";

export type RegisterRequestData = {
    email: string;
    password: string;
}

export const register = async (payload: RegisterRequestData) => {
    const { data } = await nextServer.post<User>('/auth/register', payload)
    return data
}

export const login = async (payload: RegisterRequestData) => {
    const { data } = await nextServer.post<User>('/auth/login', payload)
    return data
}