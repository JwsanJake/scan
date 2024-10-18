import React from "react"
import { useNavigate } from "react-router-dom"
import { Space, Tag, Typography } from "antd"
const { Text } = Typography


const NotificationList = ({ notifications }) => {
    const navigate = useNavigate()

    const editEvent = (identifier) => {
        navigate(`/events/view/${identifier}`)
    }


    return (
        <>
            {notifications.length > 0 ?
            (<>
                <Space direction="vertical" style={{ minWidth: "400px"}}>
                    {notifications.map((notification, index) => (
                        <Space onClick={() => editEvent(notification.event_identifier)}>
                            <Tag style={{ padding: "10px 10px"}}>
                                <Space>
                                    {index + 1}
                                    <Text strong>{notification.event_Identifier}</Text>
                                    {/* <Text>{notification.last_name}</Text> */}
                                </Space>
                            </Tag>
                            <Tag style={{ padding: "10px 10px"}} color="blue">{notification.notification_Status}</Tag>
                        </Space>
                    ))}
                </Space>
                
            </>) 
            : (<Text>Ничего нет</Text>)}
        </>
    )
}
export default NotificationList