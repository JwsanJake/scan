import { api } from "@/utils/api";
// import {
// 	invalidateMultipleKeys,
// 	invalidateQueryKeys,
// } from "@/utils/invalidateQueryKeys";
import { useMutation, useQueryClient } from "react-query";


const login = async (userCredentials) => {
    return await api.post("/auth/login", userCredentials)
}

export const useLogin = () => {
    const queryClient = useQueryClient()

    return useMutation((userCredentials) => login(userCredentials), {
        onSuccess: () => {
            // invalidateMultipleKeys(queryClient, invalidateQueryKeys.auth)
            queryClient.invalidateQueries("login")
            queryClient.invalidateQueries("userInfo")
            queryClient.invalidateQueries("notifications")
        }
    })
}