import { useParams } from "react-router-dom"
import { usePersonFamilyMember } from "@/Queries/Person"
import { columns } from "../../PersonMultiForm/PersonFamilyStatusPage/Columns"
import { Spin, Table } from "antd"



export const PersonFamilyStatus = () => {
    const { id } = useParams()
    const {
        data : familyStatus,
        isFetching : familyStatusFetching
    } = usePersonFamilyMember(id)

    return (
        <>
            {familyStatusFetching 
                ? <Spin />
                : <PersonFamilyStatusView familyStatus={familyStatus}/>
            }
        </>
    )
}

const PersonFamilyStatusView = ({ familyStatus }) => {

    return (
        <Table 
            columns={columns}
            dataSource={familyStatus}
        />
    )
}