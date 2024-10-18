import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAddPersonnelMonitoringViolation, useUpdatePersonnelMonitoringViolation} from "@/Mutators/Violation/mutator"
import { useViolationCategories, useViolationKinds } from "@/Queries/Violation"
import { Input } from "@/shared/components/Input"
import DatePickerAntd from "@/shared/components/DatePicker"
import { Space, Select, Button, Typography } from "antd"
const { Text } = Typography
import { showSuccess, showError } from "@/utils/toast"



const ViolationPersonnelMonitoring = ({ event }) => {
    const { eventIdentifier } = useRelations()
    const [violationCategoryId, setViolationCategoryId] = useState(null)
    const navigate = useNavigate()

    const methods = useForm({
        defaultValues: { 
            ...event,
            violation_event_id: event ===  null ? eventIdentifier : null//event.violation_event_id
        },
    })

    const addPMViolation = useAddPersonnelMonitoringViolation()
    const updatePMViolation = useUpdatePersonnelMonitoringViolation()
    const violationCategories = useViolationCategories()
    const violationKinds = useViolationKinds(violationCategoryId)

    const onSubmit = methods.handleSubmit(data => {

        if (event != null) {
            try {
                updatePMViolation.mutate(data, {
                    onSuccess: () => {
                        showSuccess("Данные о нарушении обновлены")
                        navigate(`/violations`)
                    },
                    onError: () => {
                        showError("Не удалось обновить данные о нарушении")
                    }
                })
            }
            catch (error) {
                showError(error)
            }
        }
        else {
            try {
                addPMViolation.mutate(data, {
                    onSuccess: () => {
                        showSuccess("Данные о нарушении обновлены")
                        navigate(`/violations`)
                    },
                    onError: () => {
                        showError("Не удалось обновить данные о нарушении")
                    }
                })
            }
            catch (error) {
                showError(error)
            }
        }
    })
    

    return (
        <form 
            onReset={methods.reset}
        >
            <Space>
                <Space direction="vertical">
                    
                    <DatePickerAntd
                        name="violation_register_date"
                        rules={{ required: "required" }}
                        control={methods.control}
                        placeholder="Введите дату учета нарушения"
                        label="Дата учета нарушения"
                    />
                    <Input 
                        type="text"
                        name="violation_description"
                        label="Описание нарушения"
                        placeholder="Введите дату учета нарушения"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    
                    <Space direction="vertical">
                        <Text>Показатель:</Text>
                        
                        <Controller 
                            name="violation_marker"
                            control={methods.control}
                            rules={{ required: true }}
                            render={( { field }) => (
                                <Select
                                    {...field}
                                    placeholder="Выберите показатель"
                                    style={{ width: 300 }}
                                    options={[
                                        { value: 'Выявление нарушения', label: 'Выявление нарушения' },
                                        { value: 'Предотвращение нарушения', label: 'Предотвращение нарушения' },
                                    ]}
                                />
                            )}
                        />
                    </Space>
                    
                    <Space direction="vertical">
                        <Text>Категория нарушений</Text>
                        <Controller 
                            name="violation_category"
                            control={methods.control}
                            render={( {field} ) => (
                                <Select
                                    {...field}
                                    placeholder="Выберите категорию нарушений"
                                    style={{ width: 300 }}
                                    options={violationCategories != null ? violationCategories : null}
                                />
                            )}
                        />
                        
                    </Space>
            
                    <Space direction="vertical">
                        <Text>Вид нарушения</Text>
                        <Controller 
                            name="kind_of_violation"
                            control={methods.control}
                            render={({ field }) => (
                                <Select
                                    placeholder="Выберите вид нарушения"
                                    style={{ width: 300 }}
                                    options={violationKinds}
                                />
                            )}
                        />
                    </Space>

                    <Input 
                        type="text"
                        name="violation_amount"
                        label="Сумма по нарушению"
                        placeholder="Введите сумму по нарушению"
                        errors={methods.errors}
                        register={methods.register}
                    />
                   
                    <Space direction="vertical">
                        <Text>Ущерб</Text>
                        <Controller 
                            name="violation_damage"
                            control={methods.control}
                            render={({ field }) => (
                                <Select
                                    placeholder="Выберите ущерб"
                                    style={{ width: 300 }}
                                    mode="combobox"
                                
                                    allowClear
                                    optionLabelProp="children"
                                    options={[
                                        { value: 'Причиненный', label: 'Причиненный' },
                                        { value: 'Предотвращенный', label: 'Предотвращенный' },
                                    ]}
                                />
                            )}
                        />=
                    </Space>

                    <Input 
                        type="text"
                        name="violation_damage_sum"
                        label="Сумма ущерба"
                        placeholder="Введите сумму ущерба"
                        errors={methods.errors}
                        register={methods.register}
                    />

                </Space> 

                <Space direction="vertical">
                    <Input 
                        type="text"
                        name="violation_shortage"
                        label="Сумма недостачи"
                        placeholder="Введите сумму недостачи"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    <Input 
                        type="text"
                        name="violation_surplus"
                        label="Сумма излишков"
                        placeholder="Введите сумму излишков"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    <Input 
                        type="text"
                        name="violation_damage_compensation"
                        label="Возмещение ущерба"
                        placeholder="Введите возмещение ущерба"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    <Input 
                        type="text"
                        name="violation_penalty_sanctions"
                        label="Штрафные санкции"
                        placeholder="Введите штрафные санкции"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    <Input 
                        type="text"
                        name="violation_penalty_sanctions_sum"
                        label="Сумма штрафных санкций"
                        placeholder="Введите сумму штрафных санкций"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    <Input 
                        type="text"
                        name="violation_summ"
                        label="Возмещение штрафных санкций"
                        placeholder="Введи"
                        errors={methods.errors}
                        register={methods.register}
                    />

                    <Space>
                        <Text>Меры реагирования</Text>
                        <Controller 
                            name="violation_response_measures"
                            control={methods.control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Выберите меры реагирования"

                                />
                            )}
                        />
                        
                    </Space>

                    <Space>
                        <Text>Отношение в правоохранительные органы</Text>
                        <Controller 
                            name="sdsd"
                            control={methods.control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    style={{ width: 300 }}
                                    options={[
                                        { value: 'зарегистрировано в ЕРДР', label: 'зарегистрировано в ЕРДР' },
                                        { value: 'Направлено ходатайство, жалоба', label: 'Направлено ходатайство, жалоба' },
                                        { value: 'окончено и направлено в суд с обвинительным актом', label: 'окончено и направлено в суд с обвинительным актом' },
                                        { value: 'осуждено лиц судом', label: 'осуждено лиц судом' },
                                        { value: 'прекращено в отношении лица, судом по нереабилитирующим основаниям', label: 'прекращено в отношении лица, судом по нереабилитирующим основаниям' },
                                        { value: 'прекращено по нереабилитирующим основаниям в ходе досудебного расследования', label: 'прекращено по нереабилитирующим основаниям в ходе досудебного расследования' },
                                        { value: 'прекращено по реабилитирующим основаниям', label: 'прекращено по реабилитирующим основаниям' },
                                        { value: 'прерван срок досудебного расследования', label: 'прерван срок досудебного расследования' },
                                        { value: 'вещественные доказательства', label: 'вещественные доказательства' },
                                    ]}
                                />
                            )}
                        />
                    </Space>
                </Space>
                <Button 
                    type="primary"
                    onClick={onSubmit}
                >
                    Сохранить
                </Button>
            </Space>
        </form>
    )
}
export default ViolationPersonnelMonitoring