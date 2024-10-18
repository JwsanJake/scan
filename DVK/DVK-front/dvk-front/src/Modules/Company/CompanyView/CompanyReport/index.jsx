import { useParams } from "react-router-dom"
import { useCompanyAllDataById } from "@/Queries/Company"
import { companyReport } from "@/utils/companyReport"
import { Button } from "antd"


export const CompanyReport = () => {
    const { id } = useParams()

    const {
        data : company,
    } = useCompanyAllDataById(id)

    const downloadReport = () => {
        companyReport(company)
    }

    return (
        <>
            <Button onClick={() =>downloadReport()}>Скачать отчет</Button>
        </>
    )
}