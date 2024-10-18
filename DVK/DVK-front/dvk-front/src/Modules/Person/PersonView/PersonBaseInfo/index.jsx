import { usePersonByIdView } from "@/Queries/Person"
import { useParams, useNavigate } from "react-router-dom"
import { Spin, Card, Space, Typography } from "antd"
const { Text } = Typography


export const PersonBaseInfo = () => {
    const { id } = useParams()

    const { 
        data : person, 
        isFetching : personFetching,
    } =  usePersonByIdView(id)

    return (
        <>
            {personFetching 
                ? <Spin/>
                : <PersonBaseInfoView person={person}/>
            }
        </>
    )
}

const PersonBaseInfoView = ({ person }) => {
    const { id } = useParams()
    const navigate = useNavigate()

    const clickToPage = () => {
        navigate(`/persons/${id}`)
    }

    return (
        <Card
            title={person.last_name + " " + person.first_name + " " + person.middle_name}
            bordered="true"
            style={{
                width: 800
            }}
        >
            <Space direction="vertical">
                <Space>
                    <Text strong>Дата рождения:</Text>
                    <p>{person.birthdate}</p>
                </Space>
                <Space>
                    <Text strong>Место рождения:</Text>
                    <p>{person.birthplace}</p>
                </Space>
                <Space>
                    <Text strong>Документ, удостоверяющий личность:</Text>
                    <p>{person.identification}</p>
                </Space>
                <Space>
                    <Text strong>ИИН:</Text>
                    <p>{person.iin}</p>
                </Space>
                <Space>
                    <Text strong>Гражданство:</Text>
                    <p>{person.citizenship}</p>
                </Space>
                <Space>
                    <Text strong>Семейное положение:</Text>
                    <p>{person.family_status}</p>
                </Space>
                <Space>
                    <Text strong>Номер телефона:</Text>
                    <p>{person.phone_number}</p>
                </Space>
                <Space>
                    <Text strong>Адрес прописки:</Text>
                    <p>{person.legal_address}</p>
                </Space>
                <Space>
                    <Text strong>Фактический адрес:</Text>
                    <p>{person.actual_address}</p>
                </Space>
            </Space>
        </Card>
    )
}