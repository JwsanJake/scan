import { useParams } from "react-router-dom"
import { usePersonAffiliations } from "@/Queries/Person"
import { Table, Spin } from "antd"
import { columns } from "../../PersonMultiForm/PersonAffiliationsPage/Columns"


export const PersonAffiliations = () => {
    const { id } = useParams()

    const {
        data: affiliations,
        isFetching: affiliationsFetching,
    } = usePersonAffiliations(id)

    return (
        <>
            {affiliationsFetching
                ? <Spin />
                : <PersonAffiliationsView affiliations={affiliations} />
            }
        </>
    )
}

const PersonAffiliationsView = ({ affiliations }) => {

    return (
        <Table 
            columns={columns}
            dataSource={affiliations}
        />
    )
}