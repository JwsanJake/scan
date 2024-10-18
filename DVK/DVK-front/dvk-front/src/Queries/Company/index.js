import { useQuery } from "react-query"
import { api } from "@/utils/api"
import { 
    mapCompanyBaseInfo, 
    mapAllCompanies,
    mapSearchedCompany, 
    mapCompanyDirector,
    mapCompanyAffiliated
} from "@/Mappers/Company/mapper"


export const getAllCompanies = async () => {
    const { data } = await api.get(`/company/getAllCompanies`)

    return data
}

export const getCompanyById = async (id) => {
    const { data } = await api.get(`/company/getCompanyById?id=${id}`)
    
    return data
}

export const getCompanyAllDataById = async (id, eventIdentifier) => {
    const { data } = await api.get(`/company/getCompanyAllDataById?id=${id}&eventIdentifier=${eventIdentifier}`)

    return data
}

export const getCompanyActivities = async (id) => {
    const { data } = await api.get(`/company/getCompanyActivities?id=${id}`)

    return data
}

export const getCompanyLicenses = async (id) => {
    const { data } = await api.get(`/company/getCompanyLicenses?id=${id}`)

    return data
}

export const getCompanyDirectorById = async (id) => {
    const { data } = await api.get(`/company/getCompanyDirectorById?id=${id}`)

    return data
}

export const getCompanyOwnersById = async (id) => {
    const { data } = await api.get(`/company/getCompanyOwnersById?id=${id}`)

    return data
}

export const getCompanyFinSolvency = async (id, eventIdentifier) => {
    const { data } = await api.get(`/company/getCompanyFinancialSolvency?id=${id}&eventIdentifier=${eventIdentifier}`)

    return data
}

export const getCompanyAllFinSolvency = async (id) => {
    const { data } = await api.get(`/company/getCompanyAllFinancialSolvency?id=${id}`)

    return data
}

export const getCompanyAffiliated = async (id) => {
    const { data } = await api.get(`/company/getCompanyAffiliationsById?id=${id}`)

    return data
}

export const getCompanyNegativeInfo = async (id, eventIdentifier) => {
    const { data } = await api.get(`/company/getCompanyNegativeInfo?id=${id}&eventIdentifier=${eventIdentifier}`)

    return data
}

export const getCompanyAllNegativeInfo = async (id) => {
    const { data } = await api.get(`/company/getCompanyAllNegativeInfo?id=${id}`)

    return data
}

export const getCompanyConclusion = async (id) => {
    const { data } = await api.get(`/company/getCompanyConclusion?id=${id}`)

    return data
}

export const useAllCompanies = () => {
    return useQuery(["allCompanies"], async () => await mapAllCompanies())
}

export const useCompanyById = (id) => {
    return useQuery(["company", id], async () => await mapCompanyBaseInfo(id), { enabled  : true })
}

export const useCompanyByIdView = (id) => {
    return useQuery(["companyView", id], async () => await getCompanyById(id))
}

export const useCompanyAllDataById = (id, eventIdentifier) => {
    return useQuery(["companyAllData", id, eventIdentifier], async () => await getCompanyAllDataById(id, eventIdentifier))
}

export const useCompanyActivities = (id) => {
    return useQuery(["activities", id], async () => await getCompanyActivities(id))
}

export const useCompanyLicenses = (id) => {
    return useQuery(["licenses", id], async () => await getCompanyLicenses(id))
}

export const useCompanyOwnersById = (id) => {
    return useQuery(["companyOwners", id], async () => await getCompanyOwnersById(id), { enabled : true })
}

export const useCompanyDirector = (id) => {
    return useQuery(["companyDirector", id], async () => await getCompanyDirectorById(id), { enabled : true })
}

export const useCompanyFinancialSolvency = (id, eventIdentifier) => {
    return useQuery(["companyFinancialSolvency", id, eventIdentifier], async () => await getCompanyFinSolvency(id, eventIdentifier), { enabled : true})
}

export const useCompanyAllFinancialSolvency = (id) => {
    return useQuery(["companyAllFinancialSolvency", id], async () => await getCompanyAllFinSolvency(id))
}

export const useCompanyAffiliated = (id) => {
    return useQuery(["companyAffiliations", id], async () => await getCompanyAffiliated(id), { enabled : true })
}

export const useCompanyNegativeInfo = (id, eventIdentifier) => {
    return useQuery(["companyNegativeInfo", id, eventIdentifier], async () => await getCompanyNegativeInfo(id, eventIdentifier), { enabled : true })
}

export const useCompanyAllNegativeInfo = (id) => {
    return useQuery(["companyAllNegativeInfo", id], async () => await getCompanyAllNegativeInfo(id), { enabled : true })
}

export const useCompanyConclusion = (id) => {
    return useQuery(["companyConclusion", id], async () => await getCompanyConclusion(id), { enabled : true })
}

export const useSearchedCompanies = () => {
    return useQuery(["searchedCompanies"], async () => await mapSearchedCompany())
}

