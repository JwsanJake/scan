import { api } from "@/utils/api"
import { useQuery } from "react-query"
import { mapFactories, mapSubdivisions, mapPositions } from "@/Mappers/Admin/mapper"


export const getAllAccesses = async () => {
    const { data } = await api.get(`/admin/getAllAccesses`)

    return data
}

export const getAllFactories = async () => {
    const { data } = await api.get(`/admin/getAllFactories`)

    return data
}

export const getAllDirections = async () => {
    const { data } = await api.get(`/admin/getAllDirections`)

    return data
}

export const getAllSubdivisions = async () => {
    const { data } = await api.get(`/admin/getAllSubdivisions`)

    return data
}

export const getAllPositions = async () => {
    const { data } = await api.get(`/admin/getAllPositions`)

    return data 
}

export const getAllEmployees = async () => {
    const { data } = await api.get(`/admin/getAllEmployees`)

    return data
}

export const useAllAccesses = () => {
    return useQuery(["accesses"], async () => await getAllAccesses())
}

export const useAllFactories = () => {
    return useQuery(["factories"], async () => await mapFactories())
}

export const useAllDirections = () => {
    return useQuery(["directions"], async () => await getAllDirections())
}

export const useAllSubdivisions = () => {
    return useQuery(["subdivisions"], async () => await mapSubdivisions())
}

export const useAllSubdivisionLabel = () => {
    return useQuery(["subdivisionsLabel"], async () => await mapSubdivisions())
}

export const useAllPositions = () => {
    return useQuery(["positions"], async () => await getAllPositions())
}

export const useAllPositionLabel = () => {
    return useQuery(["positionLabel"], async () => await mapPositions())
}

export const useAllEmployees = () => {
    return useQuery(["employees"], async () => await getAllEmployees())
}