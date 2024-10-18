import { useNavigate, useParams } from "react-router-dom"
import { useCompanyByIdView } from "@/Queries/Company"
import { Spin, Card, Space, Typography } from "antd"
const { Text } = Typography
import { SettingOutlined } from '@ant-design/icons'
import moment from "moment"


export const CompanyBaseInfo = () => {
    const { id } = useParams()

    const {
        data : company,
        isFetching : companyFetching,
    } = useCompanyByIdView(id)

    return (
        <>
            {companyFetching 
                ? <Spin/>
                : <CompanyBaseInfoView company={company.mainInfo} />
            }
        </>
    )
}

const CompanyBaseInfoView = ({ company }) => {
    const { id } = useParams()

    const navigate = useNavigate()

    const clickToPage = () => {
        navigate(`/companies/${id}`)
    }

    return (
            <Card
                title={company.company_title}
                bordered="true"
                style={{
                    width: 800
                }}
            >
                <Space direction="vertical">
                    <Space>
                        <Text strong>БИН</Text>
                        <p>{company.bin}</p>
                    </Space>
                    <Space>
                        <Text strong>Юридический адрес:</Text>
                        <p>{company.legal_address}</p>
                    </Space>
                    <Space>
                        <Text strong>Фактический адрес:</Text>
                        <p>{company.actual_address}</p>
                    </Space>
                    <Space>
                        <Text strong>Дата первичной регистрации:</Text>
                        <p>{moment(company.first_registration_date).format("DD-MM-YYYY")}</p>
                    </Space>
                    <Space>
                        <Text strong>Дата последней перерегистрации:</Text>
                        <p>{moment(company.last_registration_date).format("DD-MM-YYYY")}</p>
                    </Space>
                    <Space>
                        <Text strong>Наличие статуса завода-изготовителя:</Text>
                        <p>{company.is_manufacture === 1 ? "имеется" : "не имеется"}</p>
                    </Space>
                    <Space>
                        <Text strong>Наличие дилерства представительства:</Text>
                        <p>{company.is_dealer === 1 ? "имеется" : "не имеется"}</p>
                    </Space>
                </Space>
            </Card>
    )
}