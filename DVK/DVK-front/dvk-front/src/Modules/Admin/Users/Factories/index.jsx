import React, { useState } from "react"
import { useAllFactories } from "@/Queries/Admin"
import { columns } from "@/Modules/Admin/Users/Factories/Columns"
import FactoryAddModal from "./FactoryAddModal"
import { Table, Spin, Button } from "antd"

const Factories = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        data: factories,
        isFetching: factoriesFetching,
        isRefetching: factoriesRefetching,
    } = useAllFactories()


    const onModalClose = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Button onClick={() => setModalOpen(true)} type="primary">Добавить предприятие</Button>

            {factoriesFetching && !factoriesRefetching ? (
                <Spin />
            ):(
                <Table
                    columns={columns}
                    dataSource={factories.data}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: event => navigate(`/persons/view/${record.identifier}`),
                    //     }
                    // }}
                />
            )}

            {isModalOpen && (
                <FactoryAddModal 
                    isOpen={isModalOpen}
                    onClose={onModalClose}
                />
            )}
        </>
    )
}
export default Factories