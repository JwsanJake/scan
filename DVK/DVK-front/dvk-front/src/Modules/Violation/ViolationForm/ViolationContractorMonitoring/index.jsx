import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAddContractorsMonitoringViolation, useUpdateContractorsMonitoringViolation} from "@/Mutators/Violation/mutator"
import { Input } from "@/shared/components/Input"
import DatePickerAntd from "@/shared/components/DatePicker"
import { Space, Select, Button, Typography } from "antd"
const { Text } = Typography
import { showSuccess, showError } from "@/utils/toast"


const ViolationContractorMonitoring = ({ violation }) => {
    const { eventIdentifier } = useRelations()
    const navigate = useNavigate()

    const methods = useForm({
        defaultValues: {
            ...violation,
            viola
        }
    })

    const addCMViolation = useAddContractorsMonitoringViolation()
    const updateCMViolation = useUpdateContractorsMonitoringViolation()

    const onSubmit = methods.handleSubmit(data => {
        if (violation != null) {
            try {
                updateCMViolation.mutate(data, {
                    onSuccess: () => {
                        showSuccess("Данные о нарушении обновлены")
                        navigate(`/violations`)
                    },

                })
            }
            catch (error) {
                showError(error)
            }
        }
    })

}
export default ViolationContractorMonitoring