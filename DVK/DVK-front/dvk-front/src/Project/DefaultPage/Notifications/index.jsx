import React, { useState } from 'react';
import { useNotifications } from "@/Queries/Notification"
import { NotificationOutlined } from '@ant-design/icons'
import { Badge, Popover, Image, Spin } from 'antd'
import NotificationList from "../../NotificationList"

const Notifications = () => {
    const [open, setOpen] = useState(false)
    const { data : notificationsByUser, isFetching, isRefetching} = useNotifications()

    // console.log(notificationsByUser, isFetching, isRefetching)
    
    const notifications = notificationsByUser != undefined ? notificationsByUser : []
    
    const notificationCount = notifications != undefined ? notifications.length : 0


    const handleOpenChange = (newOpen) => {
        setOpen(newOpen)
    }

    return (
        <>
        {isFetching ? <Spin /> : (<>
        {notificationCount > 0 ?   
            (<Popover
                content= {<NotificationList notifications={notifications}/>}  
                title="Уведомления"
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
            >
                <Badge count={notificationCount}>
                    <NotificationOutlined
                        style={{
                        fontSize: 22,
                        }}
                    />
                </Badge>
            </Popover>) 
            : (<Badge>
                <NotificationOutlined
                    style={{
                    fontSize: 22,
                    }}
                />
            </Badge>)
        } </>)}
        </>
    );
}

export default Notifications