import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { useRelations } from "@/shared/hooks/useRelations"
import { companyReport } from "@/utils/companyReport"
import { Spin, Card, Typography, Space, Button } from "antd"
const { Text } = Typography
import { SettingOutlined } from '@ant-design/icons'
import moment from "moment"


export const CompanyViolations = () => {
    const { id } = useParams

    const {
        data : violations,
        isFetching : violationsFetching
    } = useContractorViolations(id)

    return (
        <>
            {violationsFetching
                ? <Spin/>
                : <CompanyViolationsView violations={violations}/>
            }
        </>
    )
}

const CompanyViolationsView = ({ violations }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    

    return (
        <>
            {violations.map((item) => (
                <Card
                    title=""
                >

                </Card>
            ))}
        </>
    )
}