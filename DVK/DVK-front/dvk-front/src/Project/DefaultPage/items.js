import React from 'react'
import { ContainerOutlined, SettingOutlined } from '@ant-design/icons'

export const navigationItems = [
    {
        key: 1,
        icon: React.createElement(ContainerOutlined),
        label: 'Формы',
        children: [
            { 
                key: 20,
                label: "Лица",
                link: "/persons"
            },
            { 
                key: 21,
                label: "Компании",
                link: "/companies"
            },
            {
                key: 22,
                label: "Мероприятия",
                link: "/events"
            },
            {
                key: 23,
                label: "Нарушения",
                link: "/violations"
            },
        ]
    },
    {
        key: 2,
        icon: React.createElement(SettingOutlined),
        label: 'Администрирование',
        children: [
            { 
                key: 14,
                label: "Пользователи",
                link: "/admin/users",
            },
            // { 
            //     key: 15,
            //     label: "Справочники",
            //     link: "/admin/users"
            // }
        ]
    }
]
