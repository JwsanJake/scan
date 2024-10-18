import { Button } from "antd"
import { useParams } from "react-router-dom"
import { usePersonAllDataById } from "@/Queries/Person"
import { personReport } from "@/utils/personReport"
import { useUserInfo } from "@/shared/hooks/useUserInfo"


export const PersonReport = () => {
    const { id } = useParams()

    const {
        data : person,
    } = usePersonAllDataById(id)

    const user = useUserInfo()
    
    const downloadReport = () => {
        personReport(person, user)
    }

    return (
        <>
            <Button onClick={downloadReport}>Скачать отчет</Button>
        </>
    )
}