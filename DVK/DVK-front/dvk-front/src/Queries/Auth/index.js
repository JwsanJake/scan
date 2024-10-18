import { api } from "@/utils/api"
import { useQuery } from "react-query"


export const getUserAccesses = async () => {
    const { data } = await api.get(`/auth/userAccesses`)

    return data
}

export const getUserInfo = async () => {
    const { data } =await api.get(`/auth/GetUserInfo`)

    return data
}

export const useUserAccesses = () => {
    return useQuery(["accesses"], async () => await getUserAccesses())
}

export const useUserName = () => {
    return useQuery(["userInfo"], async () => await getUserInfo(), { enabled : true})
}