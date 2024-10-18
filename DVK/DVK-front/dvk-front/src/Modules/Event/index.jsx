import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAllEvents } from "@/Queries/Event"
import { columns } from "./Columns"
import { Spin, Table, Button, Input } from "antd"
const { Search } = Input
import { DownloadOutlined } from '@ant-design/icons'


const Event = () => {
    const navigate = useNavigate()

    const {
        data: events,
        isFetching: eventFetching,
        isRefetching: eventRefetching,
    } = useAllEvents()
    
    const clickToPage = () => {
        navigate(`/events/add`)
    }

    return (
        <>
            <Button 
                onClick={clickToPage}
                type="primary"
            >
                Добавить мероприятие
            </Button>
            
            {eventFetching && !eventRefetching ? (
                <Spin />
            ):(
                <Table
                    columns={columns}
                    dataSource={events.data}
                    onRow={(record) => {
                        return {
                            onClick: event => navigate(`/events/view/${record.identifier}`),
                        }
                    }}
                    rowClassName={(record, index) => (record.event_conclusion === "Согласовано" ? "red" : "green")}
                />
            )}
        </>
    )
}
export default Event