import { useQuery } from "react-query"
import { api } from "@/utils/api"
import { mapAllEvents, mapEventByType } from "@/Mappers/Event/mapper"


export const getAllEvents = async () => {
    const { data } = await api.get(`/event/getAllEvents`)

    return data
}

export const getEventById = async (id) => {
    const { data } = await api.get(`/event/getEventById?id=${id}`)
    console.log(data)
    return data
}

export const getEmployees = async () => {
    const { data } = await api.get(`/event/getEmployees`)

    return data
}

export const getPersonnelCheckEvents = async (id) => {
    const { data } = await api.get(`/event/getPersonnelCheckEvents?id=${id}`)

    return data
}

export const getPersonEvents = async (id) => {
    const { data } = await api.get(`/event/getPersonEvents?id=${id}`)

    return data
}

export const getContractorEvents = async (id) => {
    const { data } = await api.get(`/event/getCompanyEvents?id=${id}`)

    return data
}

export const useAllEvents = () => {
    return useQuery(["allEvents"], async () => await mapAllEvents())
}

export const useEventById = (id) => {
    return useQuery(["event", id], async () => await mapEventByType(id), { enabled : true })
}

export const useEventByIdView = (id) => {
    return useQuery(["eventView", id], async () => await getEventById(id), { enabled : true })
}

export const useEmployees = () => {
    return useQuery(["employees"], async () => await getEmployees())
}

export const usePersonEvents = (id) => {
    return useQuery(["personEvents", id], async () => await getPersonEvents(id))
}

export const useContractorEvents = (id) => {
    return useQuery(["contractorEvents", id], async () => await getContractorEvents(id))
}