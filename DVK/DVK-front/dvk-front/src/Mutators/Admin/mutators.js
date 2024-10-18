import { useMutation, useQueryClient } from "react-query"
import { api } from "@/utils/api"

const addFactory = async (newFactory) => {
    return await api.post("/admin/addFactory", newFactory)
}

const addDirection = async (newDirection) => {
    return await api.post("/admin/addDirection", newDirection)
}

const addSubdivision = async (newSubdivision) => {
    return await api.post("/admin/addSubdivision", newSubdivision)
}

const addPosition = async (newPosition) => {
    return await api.post("/admin/addPosition", newPosition)
}

const addUser = async (newUser) => {
    return await api.post("/admin/addUser", newUser)
}

export const useAddFactory = () => {

    const queryClient = useQueryClient()

    return useMutation((newFactory) => addFactory(newFactory), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("factory")
        }
    })
}

export const useAddDirection = () => {

    const queryClient = useQueryClient()

    return useMutation((newDirection) => addDirection(newDirection), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("Direction")
        }
    })
}

export const useAddSubdivision = () => {

    const queryClient = useQueryClient()

    return useMutation((newSubdivision) => addSubdivision(newSubdivision), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("subdivision")
        }
    })
}

export const useAddPosition = () => {

    const queryClient = useQueryClient()

    return  useMutation((newPosition) => addPosition(newPosition), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("position")
        }
    })
}

export const useAddUser = () => {

    const queryClient = useQueryClient()

    return useMutation((newUser) => addUser(newUser), {
        onSuccess: (response) => {
            queryClient.invalidateQueries("user")
        }
    })
}