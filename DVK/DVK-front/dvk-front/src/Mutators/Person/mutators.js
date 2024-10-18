import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "react-query"


const addPerson = async (newPerson) => {
    return await api.post("/person/addPerson", newPerson)
}

const addPersonEducation = async (education) => {
    return await api.post("/person/addPersonEducation", education)
}

const addEducationDocuments = async (documents) => {
    return await api.post("/file/uploadFiles", documents)
}

const addPersonFamilyMember = async (familyMember) => {
    return await api.post("/person/addPersonFamilyMember", familyMember)
}

const addPersonCareer = async (newPersonCareer) => {
    return await api.post("/person/addPersonCareer", newPersonCareer)
}

const addCareerDocuments = async (documents) => {
    return await api.post("/file/uploadFiles", documents)
}

const addPersonFinancialSolvency = async (financialSolvency) => {
    return await api.post("/person/addPersonFinancialSolvency", financialSolvency)
}

const addPersonAffiliation = async (affiliation) => {
    return await api.post("/person/addPersonAffiliations", affiliation)
}

const addPersonNegativeInfo = async (negativeInfo) => {
    return await api.post("/person/addPersonNegativeInfo", negativeInfo)
}

const updatePerson = async (person) => {
    return await api.put("/person/updatePerson", person)
}

const updatePersonEducation = async (education) => {
    return await api.put("/person/updatePersonEducation", education)
}

const updatePersonFamilyMember = async (familyMember) => {
    return await api.put("/person/updatePersonFamilyMember", familyMember)
}

const updatePersonCareer = async (career) => {
    return await api.put("/person/updatePersonCareer", career)
}

const updatePersonFinancialSolvency = async (newPersonFinancialSolvency) => {
    return await api.put("/person/updatePersonFinancialSolvency", newPersonFinancialSolvency)
}

const updatePersonNegativeInfo = async (negativeInfo) => {
    return await api.put("/person/updatePersonNegativeInfo", negativeInfo)
}

const getPersonReport = async (identifier) => {
    return await api.post("/person/GetPersonAllDataById", identifier)
}

export const useGetPersonReport = () => {
    const queryClient = useQueryClient()

    return useMutation((identifier) => getPersonReport(identifier), {
        onSuccess: () => {
            queryClient.invalidateQueries("personReport")
        }
    })
}

export const useAddPerson = () => {
    const queryClient = useQueryClient()

    return useMutation((newPerson) => addPerson(newPerson), {
        onSuccess: () => {
            queryClient.invalidateQueries("person")
        }
    })
}

export const useAddPersonEducation = () => {
    const queryClient = useQueryClient()

    return useMutation((newEducation) => addPersonEducation(newEducation), {
        onSuccess: () => {
            queryClient.invalidateQueries("personEducation")
        }
    })
}

export const useAddEducationDocuments = () => {
    const queryClient = useQueryClient()

    return useMutation((documents) => addEducationDocuments(documents), {
        onSuccess: () => {
            queryClient.invalidateQueries("educationDocuments")
        }
    })
}

export const useAddPersonFamilyMember = () => {
    const queryClient = useQueryClient()

    return useMutation((newPersonFamilyMember) => addPersonFamilyMember(newPersonFamilyMember), {
        onSuccess: () => {
            queryClient.invalidateQueries("personFamilyMembers")
        }
    })
}

export const useAddPersonCareer = () => {
    const queryClient = useQueryClient()

    return useMutation((personCareer) => addPersonCareer(personCareer), {
        onSuccess: () => {
            queryClient.invalidateQueries("personCareer")
        }
    })
}

export const useAddCareerDocuments = () => {
    const queryClient = useQueryClient()

    return useMutation((documents) => addCareerDocuments(documents), {
        onSuccess: () => {
            queryClient.invalidateQueries("careerDocuments")
        }
    })
}

export const useAddPersonFinancialSolvency = () => {
    const queryClient = useQueryClient()

    return useMutation((personFinSolvency) => addPersonFinancialSolvency(personFinSolvency), {
        onSuccess: () => {
            queryClient.invalidateQueries("personFinSolvency")
        }
    })
}

export const useAddPersonAffiliation = () => {
    const queryClient = useQueryClient()

    return useMutation((personAffiliation) => addPersonAffiliation(personAffiliation), {
        onSuccess: () => {
            queryClient.invalidateQueries("personAfiliation")
        }
    })
}

export const useAddPersonNegativeInfo = () => {
    const queryClient = useQueryClient()

    return useMutation((personNegativeInfo) => addPersonNegativeInfo(personNegativeInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries("personNegativeInfo")
        }
    })
}

export const useUpdatePerson = () => {
    const queryClient = useQueryClient()

    return useMutation((person) => updatePerson(person), {
        onSuccess: () => {
            queryClient.invalidateQueries("person")
        }
    })
}

export const useUpdatePersonEducation = () => {
    const queryClient = useQueryClient()

    return useMutation((education) => updatePersonEducation(education), {
        onSuccess: () => {
            queryClient.invalidateQueries("personEducation")
        }
    })
}

export const useUpdatePersonFamilyMember = () => {
    const queryClient = useQueryClient()

    return useMutation((familyMember) => updatePersonFamilyMember(familyMember), {
        onSuccess: () => {
            queryClient.invalidateQueries("personFamilyMembers")
        }
    })
}

export const useUpdatePersonCareer = () => {
    const queryClient = useQueryClient()

    return useMutation((career) => updatePersonCareer(career), {
        onSuccess: () => {
            queryClient.invalidateQueries("personCareer")
        }
    })
}


export const useUpdatePersonFinancialSolvency = () => {
    const queryClient = useQueryClient()

    return useMutation((personFinSolvency) => updatePersonFinancialSolvency(personFinSolvency), {
        onSuccess: () => {
            queryClient.invalidateQueries("personFinancialSolvency")
        }
    })
}

export const useUpdatePersonNegativeInfo = () => {
    const queryClient = useQueryClient()

    return useMutation((personNegativeInfo) => updatePersonNegativeInfo(personNegativeInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries("personNegativeInfo")
        }
    })
}

