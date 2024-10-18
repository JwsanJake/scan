import { useQuery } from "react-query"
import { api } from "@/utils/api"


export const getAllNotifications = async () => {
    const { data } = await api.get(`/notification/getNotifications`)

    return data.notifications
}

export const useNotifications = () => {

    return useQuery(["notifications"], async () => await getAllNotifications())
};