import { useMutation, useQueryClient } from "react-query"
import { api } from "@/utils/api"


const addCompanyBaseInfo = async (newCompany) => {
    return await api.post("/company/addCompany", newCompany)
}

const addCompanyDirector = async (director) => {
    return await api.post(`/company/addCompanyDirector`, director)
}

const addCompanyOwner = async (owner) => {
    return await api.post(`/company/addCompanyOwner`, owner)
}

const addCompanyFinancialSolvency = async (finSolvency) => {
    return await api.post(`/company/addCompanyFinancialSolvency`, finSolvency)
}

const addCompanyAffiliations = async (affiliations) => {
    return await api.post(`/company/addCompanyAffiliations`, affiliations)
}

const addCompanyNegativeInfo = async (negative) => {
    return await api.post(`/company/addCompanyNegativeInfo`, negative)
}

const addCompanyConclusion = async (conclusion) => {
    return await api.post(`/company/addCompanyConclusion`, conclusion)
}

const addCompanyNewConclusion = async (conclusion) => {
    return await api.post(`/company/addCompanyNewConclusion`, conclusion)
}

const updateCompanyBaseInfo = async (baseInfo) => {
    return await api.put(`/company/updateCompanyBaseInfo`, baseInfo)
}

const updateCompanyFinancialSolvency = async (finSolvency) => {
    return await api.put(`/company/updateCompanyFinancialSolvency`, finSolvency)
}

const updateCompanyNegativeInfo = async (negative) => {
    return await api.put(`/company/updateCompanyNegativeInfo`, negative)
}

const updateCompanyConclusion = async (conclusion) => {
    return await api.put(`/company/updateCompanyConclusion`, conclusion)
}

const getCompanyReport = async (identifier) => {
    return await api.post("/company/GetCompanyAllDataById", identifier)
}

export const useGetCompanyReport = () => {
    const queryClient = useQueryClient()

    return useMutation((identifier) => getCompanyReport(identifier), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyReport")
        }
    })
}

export const useAddCompanyBaseInfo = () => {
    const queryClient = useQueryClient()

    return useMutation((newCompany) => addCompanyBaseInfo(newCompany), {
        onSuccess: () => {
            queryClient.invalidateQueries("company")
            
        }
    })
}

export const useAddCompanyDirector = () => {
    const queryClient = useQueryClient()

    return useMutation((director) => addCompanyDirector(director), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyDirector")
        }
    })
}

export const useAddCompanyOwner = () => {
    const queryClient = useQueryClient()

    return useMutation((owner) => addCompanyOwner(owner), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyOwners")
        }
    })
}

export const useAddCompanyFinSolvency = () => {
    const queryClient = useQueryClient()

    return useMutation((finSolvencyData) => addCompanyFinancialSolvency(finSolvencyData), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyFinancialSolvency")
        }
    })
}

export const useAddCompanyAffiliations = () => {
    const queryClient = useQueryClient()

    return useMutation((affiliations) => addCompanyAffiliations(affiliations), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyAffiliations")
        }
    })
}

export const useAddCompanyNegativeInfo = () => {
    const queryClient = useQueryClient()

    return useMutation((negative) => addCompanyNegativeInfo(negative), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyNegativeInfo")
        }
    })
}

export const useAddCompanyConclusion = () => {
    const queryClient = useQueryClient()

    return useMutation((conclusion) => addCompanyConclusion(conclusion), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyConclusion")
        }
    })
}

export const useAddCompanyNewConclusion = () => {
    const queryClient = useQueryClient()

    return useMutation((conclusion) => addCompanyNewConclusion(conclusion), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyNewConclusion")
        }
    })
}

export const useUpdateCompanyBaseInfo = () => {
    const queryClient = useQueryClient()

    return useMutation((baseInfo) => updateCompanyBaseInfo(baseInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries("updateCompanyBaseInfo")
        }
    })
}

export const useUpdateCompanyFinancialSolvency = () => {
    const queryClient = useQueryClient()

    return useMutation((finSolvency) => updateCompanyFinancialSolvency(finSolvency), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyFinancialSolvency")
        }
    })
}

export const useUpdateCompanyNegativeInfo = () => {
    const queryClient = useQueryClient()

    return useMutation((negative) => updateCompanyNegativeInfo(negative), {
        onSuccess: () => {
            queryClient.invalidateQueries("companyNegativeInfo")
        }
    })
}

export const useUpdateCompanyConclusion = () => {
    const queryClient = useQueryClient()

    return useMutation((companyConclusion) => updateCompanyConclusion(companyConclusion), {
        onSuccess: () => {
            queryClient.invalidateQueries("updateCompanyConclusion")
        }
    })
}