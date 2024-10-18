import { useQuery } from "react-query"
import { api } from "@/utils/api"

export const getAllViolations = async () => {
    const { data } = await api.get(`/violation/getAllViolations`)

    return data
} 

export const getViolationById = async (id) => {
    const { data } = await api.get(`/violation/getViolationById?id=${id}`)

    return data
}

export const getViolationCategories = async () => {
    const { data } = await api.get(`/violation/getViolationCategories`)

    return data
}

export const getViolationKinds = async (id) => {
    const {data} = await api.get(`/violation/getViolationKinds?id=${id}`)

    return data
}

export const useAllViolations = () => {
    return useQuery(["allViolations"], async () => await getAllViolations())
}

export const useViolationById = (id) => {
    return useQuery(["violation", id], async () => await getViolationById(id))
}

export const useViolationCategories = () => {
    return useQuery(["violationCategories"], async () => await getViolationCategories())
}

export const useViolationKinds = (id) => {
    return useQuery(["violationKinds", id], async () => await getViolationKinds(id))
}