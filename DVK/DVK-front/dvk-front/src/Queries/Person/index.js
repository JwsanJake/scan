import { api } from "@/utils/api"
import { useQuery } from "react-query"
import { mapAllPersons, mapSearchedPersons, mapPersonById, mapPersonView } from "@/Mappers/Person/mapper"


export const getAllPersons = async () => {
    const { data } = await api.get(`/person/getAllPersons`)

    return data
}

export const getAllCountries = async () => {
    const { data } = await api.get(`/person/getAllCountries`)

    return data
}

export const getPersonById = async (id) => {
    const { data } = await api.get(`/person/getPersonById?id=${id}`)

    return data
}

export const getPersonAllDataById = async (id) => {
    const { data } = await api.get(`/person/getPersonAllDataById?id=${id}`)

    return data
}

export const getAllPersonsData = async () => {
    const { data } = await api.get(`/person/getAllPersonsData`)

    return data
}

export const getPersonEducation = async (id) => {
    const { data } = await api.get(`/person/getPersonEducation?id=${id}`)

    return data
}

export const getPersonFamilyMembers = async (id) => {
    const { data } = await api.get(`/person/getPersonFamilyMembers?id=${id}`)

    return data
}

export const getPersonCareer = async (id) => {
    const { data } = await api.get(`/person/getPersonCareer?id=${id}`)

    return data
}

export const getPersonFinancialSolvency = async (id, eventIdentifier) => {
    const { data } = await api.get(`/person/getPersonFinancialSolvency?id=${id}&eventIdentifier=${eventIdentifier}`)

    return data
} 

export const getPersonAllFinancialSolvency = async (id) => {
    const { data } = await api.get(`/person/getPersonAllFinancialSolvency?id=${id}`)

    return data
}

export const getPersonAffiliations = async (id) => {
    const { data } = await api.get(`/person/getPersonAffiliations?id=${id}`)

    return data
}

export const getPersonNegativeInfo = async (id, eventIdentifier) => {
    const { data } = await api.get(`/person/getPersonNegativeInfo?id=${id}&eventIdentifier=${eventIdentifier}`)
    
    return data
}

export const getPersonAllNegativeInfo = async (id) => {
    const { data } = await api.get(`/person/getPersonAllNegativeInfo?id=${id}`)

    return data
}

export const useAllPersons = () => {
    return useQuery(["allPersons"], async () => await mapAllPersons())
}

export const useAllCountries = () => {
    return useQuery(["allCountries"], async () => await getAllCountries()) 
}

export const useSearchedPersons = () => {
    return useQuery(["searchedPersons"], async () => await mapSearchedPersons())
}

export const usePersonById = (id) => {
    return useQuery(["person", id], () => mapPersonById(id), { enabled  : true })
}

export const usePersonByIdView = (id) => {
    return useQuery(["personBaseInfoView", id], () => mapPersonView(id))
}

export const usePersonAllDataById = (id) => {
    return useQuery(["personAllData", id], async () => await getPersonAllDataById(id))
}

export const useAllPersonsData = () => {
    return useQuery(["allPersonsData"], async () => await mapAllPersons())
}

export const usePersonEducationByID = (id) => {
    return useQuery(["personEducation", id], async () => await getPersonEducation(id))
}

export const usePersonFamilyMember = (id) => {
    return useQuery(["personFamilyMembers", id], async () => await getPersonFamilyMembers(id))
}

export const usePersonCareer = (id) => {
    return useQuery(["personCareer", id], async () => await getPersonCareer(id))
}

export const usePersonFinancialSolvency = (id, eventIdentifier) => {
    return useQuery(["personFinancialSolvency", id, eventIdentifier], async () => await getPersonFinancialSolvency(id, eventIdentifier))
}

export const usePersonAllFinancialSolvency = (id) => {
    return useQuery(["person"], async () => await getPersonAllFinancialSolvency(id))
}

export const usePersonAffiliations = (id) => {
    return useQuery(["personAffiliations", id], async () => await getPersonAffiliations(id))
}

export const usePersonNegativeInfo = (id, eventIdentifier) => {
    return useQuery(["personNegativeInfo", id, eventIdentifier], async () => await getPersonNegativeInfo(id, eventIdentifier))
}

export const usePersonAllNegativeInfo = (id) => {
    return useQuery(["personAllNegativeInfo", id], async () => await getPersonAllNegativeInfo(id)) 
}



