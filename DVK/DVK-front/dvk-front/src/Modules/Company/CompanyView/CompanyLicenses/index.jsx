import { useParams } from "react-router-dom"
import { useCompanyLicenses } from "@/Queries/Company"
import { Spin, Table } from "antd"


export const CompanyLicenses = () => {
    const { id } = useParams()

    const {
        data : licenses,
        isFetching : licensesFecthing,
    } = useCompanyLicenses(id)

    return (
        <>
            {licensesFecthing
                ? <Spin />
                : <CompanyLicensesView licenses={licenses}/>
            }
        </>
    )
}

const CompanyLicensesView = ({ licenses }) => {

    return (
        <>
            <Table columns={columns} dataSource={licenses}/>
        </>
    )
}

const columns = [
    {
        title: 'Номер / название лицензии',
        dataIndex: 'license_name',
        key: 'license_name'
    },
]