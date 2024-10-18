import React, { useState } from "react"
import { useAllPositions } from "@/Queries/Admin"
import { columns } from "@/Modules/Admin/Users/Positions/Columns"
import PositionAddModal from "./PositionAddModal"
import { Table, Button } from 'antd'

const Positions = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        data: positions,
        isFetching: positionsFetching,
        isRefetching: positionsRefetching,
    } = useAllPositions()

    const addPositionModal = () => {
        setModalOpen(true)
    }

    const onModalClose = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Button onClick={addPositionModal} type="primary">Добавить должность</Button>

            {positionsFetching && !positionsRefetching ? (
                <div>Загрузка</div>
            ) : (
                <Table 
                    columns={columns}
                    dataSource={positions}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: event => navigate(`/persons/view/${record.identifier}`),
                    //     }
                    // }}
                />
            )}

            {isModalOpen && (
                <PositionAddModal 
                    onClose={onModalClose}
                />
            )}
        </>
    )
}
export default Positions