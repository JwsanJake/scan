import React from "react"
import Factories from "./Users/Factories"
import Directions from "./Users/Directions"
import Subdivisions from "./Users/Subdivisions"
import Positions from "./Users/Positions"
import Users from "./Users/Users"
import { Tabs } from "antd"

const items = [
    {
        key: 1,
        label: "Предприятия",
        children: 
            <Factories/>
    },
    {
        key: 2,
        label: "Направление/линия",
        children: 
            <Directions />
    },
    {
        key: 3,
        label: "Структурные единицы",
        children: 
            <Subdivisions />
    },
    {
        key: 4,
        label: "Должности",
        children: 
            <Positions />
    },
    {
        key: 5,
        label: "Пользователи",
        children: 
            <Users />
    },
]

const Admin = () => {

    return (
        <>
            <Tabs 
                defaultActiveKey="1"
                items={items}
            />
        </>
    )
}
export default Admin