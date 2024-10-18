import { api } from "@/utils/api"
import { useMutation, useQueryClient } from "react-query"


const downloadFiles = async (download) => {
    return await api.post("/person/downloadFiles", download)
}

export const useDownloadFiles = async () => {
    const queryClient = useQueryClient()

    return useMutation((file) => downloadFiles(file), {
        onSuccess: () => {
            queryClient.invalidateQueries("person")
        }
    })
}

// export const downloadMutation = useMutation({
//     mutationFn: (download) => {
//       return api.post('/person/downloadFiles', download)
//     },
// })