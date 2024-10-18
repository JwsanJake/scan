import { useUserName } from "@/Queries/Auth"


export const useUserInfo = () => {
    const { data: userInfo } = useUserName()

    return {
        userInfo
    }
}