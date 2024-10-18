import React, { useState } from "react"
import { useAllSubdivisions } from "@/Queries/Admin"
import { columns } from "@/Modules/Admin/Users/Subdivisions/Columns"
import SubdivisionAddModal from "./SubdivisionAddModal"
import { Table, Spin, Button } from "antd"

const Subdivisions = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        data: subdivisions,
        isFetching: subdivisionsFetching,
        isRefetching: subdivisionsRefetching
    } = useAllSubdivisions()

    const addSubdivisionModal = () => {
        setModalOpen(true)
    }

    const onModalClose = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Button onClick={addSubdivisionModal} type="primary">Добавить структурную единицу</Button>

            {subdivisionsFetching && !subdivisionsRefetching ? (
                <Spin/>
            ):(
                <Table
                    columns={columns}
                    dataSource={subdivisions.data}
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: event => navigate(`/persons/view/${record.identifier}`),
                    //     }
                    // }}
                />
            )} 

            {isModalOpen && (
                <SubdivisionAddModal 
                    onClose={onModalClose}
                />
            )}
        </>
    )
}
export default Subdivisions