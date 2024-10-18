import React from "react"
import { useNavigate } from "react-router-dom"
import { Spin, Table, Button, Input } from "antd"
import { useAllViolations } from "@/Queries/Violation"
import { columns } from "./Columns"

const Violation = () => {
    const navigate = useNavigate()

    const {
        data: violations,
        isFetching: violationFetching,
        isRefetching: violationRefetching,
    } = useAllViolations()

    const clickToPage = () => {
        navigate(`/violations/add`)
    }

    return (
        <>
            <Button
                onClick={clickToPage}
                type="primary"
            >
                Добавить нарушение
            </Button>
            {violationFetching && !violationRefetching ? (
                <Spin/>
            ):(
                <Table 
                    column={columns}
                    dataSource={violations}
                    onRow={(record) => {
                        return {
                            onClick: event => navigate()
                        }
                    }}
                />
            )}
        </>
    ) 
}
export default Violation