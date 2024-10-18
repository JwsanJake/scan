import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "react-query"


const deleteFile = async (filepath) => {
    return await api.delete(`/File/DeleteFiles?filename=${filepath}`)
}


export const useDeleteFile = (queryParam) => {
    const queryClient = useQueryClient()

    return useMutation((file) => deleteFile(file), {
        onSuccess: () => {
            queryClient.invalidateQueries("personCareer")
        }
    })
}