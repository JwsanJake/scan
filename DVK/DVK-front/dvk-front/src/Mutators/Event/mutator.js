import { useMutation, useQueryClient } from "react-query"
import { api } from "@/utils/api"


const addPersonnelCheck = async (newEvent) => {
    return await api.post("/event/addEventPersonnelCheck", newEvent)
}

const addContractorCheck = async (newEvent) => {
    return await api.post("/event/addEventContractorCheck", newEvent)
}

const addPersonnelMonitoring = async (newEvent) => {
    return await api.post("/event/addEventPersonnelMonitoring", newEvent)
}

const addContractorMonitoring = async (newEvent) => {
    return await api.post("/event/addEventContractorMonitoring", newEvent)
}

const addInformationSearchActivity = async (newEvent) => {
    return await api.post("/event/addEventInformationSearchActivity", newEvent) 
}

const updatePersonnelCheck = async (newEvent) => {
    return await api.put("/event/updateEventPersonnelCheck", newEvent)
}

const updateContractorCheck = async (newEvent) => {
    return await api.put("/event/updateEventContractorCheck", newEvent)
}

const updatePersonnelMonitoring = async (newEvent) => {
    return await api.put("/event/updatePersonnelMonitoring", newEvent)
}

const updateContractorMonitoring = async (newEvent) => {
    return await api.put("/event/updateEventContractorMonitoring", newEvent)
}

const updateInformationSearchActivity = async (newEvent) => {
    return await api.put("/event/updateInformationSearchActivity", newEvent)
}

export const useAddPersonnelCheck = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => addPersonnelCheck(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useAddContractorCheck = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => addContractorCheck(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useAddPersonnelMonitoring = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => addPersonnelMonitoring(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useAddContractorMonitoring = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => addContractorMonitoring(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useAddInformationSearchActivity = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => addInformationSearchActivity(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useUpdatePersonnelCheck = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => updatePersonnelCheck(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
            queryClient.invalidateQueries("notifications")
        }
    })
}

export const useUpdateContractorCheck = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => updateContractorCheck(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useUpdatePersonnelMonitoring = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => updatePersonnelMonitoring(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useUpdateContractorMonitoring = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => updateContractorMonitoring(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}

export const useUpdateInformationSearchActivity = () => {
    const queryClient = useQueryClient()

    return useMutation((newEvent) => updateInformationSearchActivity(newEvent), {
        onSuccess: () => {
            queryClient.invalidateQueries("event")
        }
    })
}