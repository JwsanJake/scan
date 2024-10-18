import { useParams } from "react-router-dom"
import { useCompanyDirector } from "@/Queries/Company"
import { columns } from "../../CompanyMultiForm/CompanyAffiliations/Columns"
import { Spin, Table } from "antd"


export const CompanyDirector = () => {
    const { id } = useParams()

    const {
        data : director,
        isFetching : directorFetching,
    } = useCompanyDirector(id)

    return (
        <>
            {directorFetching 
                ? <Spin/>
                : <CompanyDirectorView director={director} />
            }
        </>
    )
}

const CompanyDirectorView = ({ director }) => {

    return (
        <Table columns={columns} dataSource={director}/>
    )
}