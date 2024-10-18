import { Layout, Row, Col, Typography, Space, Card } from "antd"
import { useNavigate } from "react-router-dom"
const { Title } = Typography
import { UserOutlined } from '@ant-design/icons'
import { TeamOutlined } from '@ant-design/icons'
import { InboxOutlined } from '@ant-design/icons'
import { AlertOutlined } from '@ant-design/icons'
import { SettingOutlined } from '@ant-design/icons'


const MainPage = () => {
    const navigate = useNavigate()

    const clickToPage = (value) => {
        navigate(value)
    }

    return (
        <Layout style={{ margin: "140px", padding: "10px", borderRadius: "20px", background: "#F5F5F5"}}>
            <Row>
                <Col span={5} style={{margin: "10px"}}>
                    <Card onClick={() => clickToPage(`/persons`)} hoverable>
                        <UserOutlined style={{ fontSize: "32px"}}/>
                        <Title level={3}>Лица</Title>
                    </Card> 
                </Col>
                <Col span={5} style={{margin: "10px"}}>
                    <Card onClick={() => clickToPage(`/companies`)} hoverable>
                        <TeamOutlined style={{ fontSize: "32px"}}/>
                        <Title level={3}>Организации</Title>
                    </Card>
                </Col>
                <Col span={5} style={{margin: "10px"}}>
                    <Card onClick={() => clickToPage(`/events`)} hoverable>
                        <InboxOutlined style={{ fontSize: "32px"}}/>
                        <Title level={3}>Мероприятия</Title>
                    </Card>
                </Col>
                <Col span={5} style={{margin: "10px"}}>
                    <Card onClick={() => clickToPage(`/violations`)} hoverable>
                        <AlertOutlined style={{ fontSize: "32px" }}/>
                        <Title level={3}>Нарушения</Title>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: "40px"}}>
                <Col span={5} style={{margin: "10px"}}>
                    <Card onClick={() => clickToPage(`/admin/users`)} hoverable>
                        <SettingOutlined style={{ fontSize: "32px"}}/>
                        <Title level={3}>Администрирование</Title>
                    </Card> 
                </Col>
            </Row>
        </Layout>
    )
}
export default MainPage