import { useMutation, useQueryClient } from "react-query"
import { api } from "@/utils/api"

const addPersonnelMonitoringViolation = async (newViolation) => {
    return await api.post("/violation/addPersonnelMonitoringViolation", newViolation)
}

const addContractorsMonitoringViolation = async (newViolation) => {
    return await api.post("/violation/addContractorsMonitoringViolation", newViolation)
}

const addInformationSearchActivityViolation = async (newViolation) => {
    return await api.post("/violation/addInformationSearchActivityViolation", newViolation)
}

const updatePersonnelMonitoringViolation = async (newViolation) => {
    return await api.post("/violation/updatePersonnelMonitoringViolation", newViolation)
}

const updateContractorsMonitoringViolation = async (newViolation) => {
    return await api.post("/violation/updateContractorsMonitoringViolation", newViolation)
}

const updateInformationSearchActivityViolation = async (newViolation) => {
    return await api.post("/violation/updateInformationSearchActivityViolation", newViolation)
}

export const useAddPersonnelMonitoringViolation = () => {
    const queryClient = useQueryClient()

    return useMutation((newViolation) => addPersonnelMonitoringViolation(newViolation), {
        onSuccess: () => {
            queryClient.invalidateQueries("violation")
        }
    })
}

export const useAddContractorsMonitoringViolation = () => {
    const queryClient = useQueryClient()

    return useMutation((newViolation) => addContractorsMonitoringViolation(newViolation), {
        onSuccess: () => {
            queryClient.invalidateQueries("violation")
        }
    })
}

export const useAddInformationSearchActivityViolation = () => {
    const queryClient = useQueryClient()

    return useMutation((newViolation) => addInformationSearchActivityViolation(newViolation), {
        onSuccess: () => {
            queryClient.invalidateQueries("violation")
        }
    })
}

export const useUpdatePersonnelMonitoringViolation = () => {
    const queryClient = useQueryClient()

    return useMutation((newViolation) => updatePersonnelMonitoringViolation(newViolation), {
        onSuccess: () => {
            queryClient.invalidateQueries("violation")
        }
    })
}

export const useUpdateContractorsMonitoringViolation = () => {
    const queryClient = useQueryClient()
    
    return useMutation((newViolation) => updateContractorsMonitoringViolation(newViolation), {
        onSuccess: () => {
            queryClient.invalidateQueries("violation")
        }
    })
}

export const useUpdateInformationSearchActivityViolation = () => {
    const queryClient = useQueryClient()

    return useMutation((newViolation) => updateInformationSearchActivityViolation(newViolation), {
        onSuccess: () => {
            queryClient.invalidateQueries("violation")
        }
    })
}