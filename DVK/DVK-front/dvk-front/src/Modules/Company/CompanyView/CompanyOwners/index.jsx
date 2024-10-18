import { useParams } from "react-router-dom"
import { useCompanyOwnersById } from "@/Queries/Company"
import { Spin, Table } from "antd"
import { columns } from "../../CompanyMultiForm/CompanyOwnersForm/Columns"


export const CompanyOwners = () => {
    const { id } = useParams()

    const {
        data : owners,
        isFetching : ownersFetching,
    } = useCompanyOwnersById(id)

    return (
        <>
            {ownersFetching
                ? <Spin/>
                : <CompanyOwnersView owners={owners}/>
            }
        </>
    )
}


const CompanyOwnersView = ({ owners }) => {

    return (
        <>
            <Table columns={columns} dataSource={owners}/>
        </>
    )
}