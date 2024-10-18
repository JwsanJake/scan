import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Row, Col, Layout, Menu, theme, Button, Avatar, Dropdown, Typography } from 'antd'
const { Header, Content, Sider } = Layout
const { Text } = Typography
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { navigationItems }   from "./items"
import { useStateContext } from "@/shared/context/ContextProvider"
import { useResponseInterceptor } from "@/utils/api"
import { EnterOutlined } from '@ant-design/icons'
import { removeAuthToken } from "@/utils/token"
import { useUserName } from "../../Queries/Auth"
import Notifications from "./Notifications"


const DefaultPage = () => {
    const [collapsed, setCollapsed] = useState(true)

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const { notification } = useStateContext()

    const response = useResponseInterceptor()
    const { data: userInfo } = useUserName()

    const navigate = useNavigate()

    const handleClick = ({ key }) => {
        const  parentKey  = navigationItems.find((item) => {
            return item.children.find(child => child.key === parseInt(key))
        })  

        const link = parentKey.children.find(child => child.key === parseInt(key))

        if (link) {
            navigate(link.link)
        }
    }

    const items = [
        {
            label: 'Профиль',
            key: 1,
        },
        {
            label: 'Выйти',
            icon: React.createElement(EnterOutlined),
            key: 2,
            onClick: () => {
                logout()
            }
        },
    ]

    const logout = () => {
        removeAuthToken()
        navigate(`/login`)
    }

    const clickToPage = () => {
        navigate(`/main`)
    }



    return (
        <Layout horizontal="true" style={{height:"100vh"}}>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={collapsed}
                width={240}
            >
                <div className="demo-logo-vertical">
                    <Col 
                        onClick={clickToPage}
                        style={{ marginTop: "20px", marginLeft: "25px"}} 
                    >
                        {collapsed ? <></> : <img style={{ width: '180px', height: '60px', transition: 'all 0.2s', }} src="/Kazakhmys.png"/>}
                    </Col>
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={navigationItems}
                        onClick={handleClick}
                        style={{ marginTop: "20px" }}
                    />
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '12px',
                            width: 32,
                            height: 32,
                            color: "white",
                            margin: "20px",
                            position: 'absolute',
                            bottom: 0,
                            zIndex: 1,
                            transition: 'all 0.2s',
                        }}
                    />
                </div>
                
            </Sider>

            <Layout>
                <Header
                    style={{
                        background: "000000E0",
                    }}
                >
                    <Row
                        justify="end" align="middle"
                    >
                        <Col style={{ marginRight: "20px"}}>
                            <Text>
                                Добро пожаловать,  {userInfo  ? (userInfo.userName != null ? userInfo.userName.first_name : "Пользователь") : "Пользователь"}
                            </Text>
                        </Col>
                        <Col style={{ marginRight: "20px"}}>
                            <Notifications />
                        </Col>
                       
                        <Dropdown
                            menu={{
                                items
                            }}
                            trigger={['click']}
                        >
                            <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
                                U
                            </Avatar>
                        </Dropdown>
                    </Row>
                </Header>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                    { notification }
                </Content>
            </Layout>
        </Layout>
    )
}
export default DefaultPage