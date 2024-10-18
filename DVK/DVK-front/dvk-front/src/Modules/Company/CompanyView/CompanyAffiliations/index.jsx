import { useParams } from "react-router-dom"
import { useCompanyAffiliated } from "@/Queries/Company"
import { columns } from "../../CompanyMultiForm/CompanyAffiliations/Columns"
import { Spin, Table } from "antd"


export const CompanyAffiliations = () => {
    const { id } = useParams()

    const {
        data : affiliations,
        isFetching : affiliationsFetching,
    } = useCompanyAffiliated(id)

    return (
        <>
            {affiliationsFetching
                ? <Spin />
                : <CompanyAffiliationsView affiliations={affiliations} />
            }
        </>
    )
}

const CompanyAffiliationsView = ({ affiliations }) => {

    return (
        <Table columns={columns} dataSource={affiliations} />
    )
}