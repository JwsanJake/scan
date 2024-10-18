import React, { useState } from "react"
import { useAllDirections } from "@/Queries/Admin"
import { Spin } from "antd"
import { columns } from "./Columns"
import DirectionAddModal from "./DirectionAddModal"
import { Table, Button } from 'antd'

const Directions = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        data: directions,
        isFetching: directionsFetching,
        isRefetching: directionsRefetching,
    } = useAllDirections()

    const onModalClose = () => {
        setModalOpen(false)
    }
    return (
        <>
            <Button onClick={()=> setModalOpen(true)} type="primary">Добавить направление/линию</Button>

            {directionsFetching && !directionsRefetching ? (
                <Spin style={{ width: '50%'}}/>
            ):(
                <Table
                    columns={columns}
                    dataSource={directions}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: event => navigate(`/persons/view/${record.identifier}`),
                    //     }
                    // }}
                />
            )}

            {isModalOpen && (
                <DirectionAddModal 
                    onClose={onModalClose}
                />
            )}
        </>
    )
}
export default Directions