import { useParams } from "react-router-dom"
import { useCompanyActivities } from "@/Queries/Company"
import { Spin, Table } from "antd"


export const CompanyActivities = () => {
    const { id } = useParams()

    const {
        data : activities,
        isFetching : activitiesFetching,
    } = useCompanyActivities(id)

    return (
        <>
            {activitiesFetching
                ? <Spin />
                : <CompanyActivitiesView activities={activities}/>
            }
        </>
    )
}

const CompanyActivitiesView = ({ activities }) => {

    return (
        <>
            <Table columns={columns} dataSource={activities}/>
        </>
    )
}

const columns = [
    {
        title: 'Наименование деятельности',
        dataIndex: 'activity_name',
        key: 'activity_name'
    },
]