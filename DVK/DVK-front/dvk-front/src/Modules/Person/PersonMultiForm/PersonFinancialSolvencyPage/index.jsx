import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { usePersonFinancialSolvency } from "@/Queries/Person"
import { useAddPersonFinancialSolvency, useUpdatePersonFinancialSolvency } from "@/Mutators/Person/mutators"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { useRelations } from "@/shared/hooks/useRelations"
import { showSuccess, showError } from "@/utils/toast"
import { Spin, Flex, Button, Typography, Space, Radio, Layout } from "antd"
import { Input } from "@/shared/components/Input"
const { Text } = Typography
import FilesInput from "@/shared/components/FilesInput"
import { addFilesToFormData } from "@/utils/formData"
import { filterArray } from "@/utils/filterFiles"

export const PersonFinancialSolvencyPage = () => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()

    const { 
        data: personFinSolvency, 
        isFetching: finSolvencyFetching,
    } = usePersonFinancialSolvency(id, eventIdentifier)

    const finSolvency = personFinSolvency === undefined || Object.keys(personFinSolvency).length === 0 || personFinSolvency === ''  ? null : personFinSolvency

    return (
        <>
            {finSolvencyFetching
                ? <Spin/>
                : <PersonFinancialSolvencyForm finSolvency={finSolvency} />
            }
        </>
    )
}

const PersonFinancialSolvencyForm = ({ finSolvency = null }) => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()

    const { next, prev } = useMultitab()
    const [taxDebt, setTaxDebt] = useState(false)
    const [legalEntity, setLegalEntity] = useState(false)
    const [enforcement, setEnforcement] = useState(false)
    const [departure, setDeparture] = useState(false)
    const [courtCases, setCourtCases] = useState(false)
    const [negative, setNegative] = useState(false)

    const methods = useForm({
        defaultValues: finSolvency!= null ? finSolvency.mainInfo : finSolvency,
        //defaultValues: finSolvency
    })
    console.log(finSolvency)
    const addPersonFinSolvency = useAddPersonFinancialSolvency()
    const updatePersonFinSolvency = useUpdatePersonFinancialSolvency()

    const onSubmit = methods.handleSubmit(data => {

        let formData = new FormData()

        data.tax_debt_files != null ? addFilesToFormData(formData, data.tax_debt_files, "tax_debt_files") : null
        data.legal_entity_files != null ? addFilesToFormData(formData, data.legal_entity_files, "legal_entity_files") : null
        data.enforcement_proceedings_files != null ? addFilesToFormData(formData, data.enforcement_proceedings_files, "enforcement_proceedings_files") : null
        data.KZ_departure_ban_files != null ? addFilesToFormData(formData, data.KZ_departure_ban_files, "KZ_departure_ban_files") : null
        data.court_cases_files != null ? addFilesToFormData(formData, data.court_cases_files, "court_cases_files") : null
        data.negative_info_files != null ? addFilesToFormData(formData, data.negative_info_files, "negative_info_files") : null

        formData.append("identifier", id)
        formData.append("event_identifier", eventIdentifier)
        formData.append("tax_debt", data.tax_debt != null ? data.tax_debt : null)
        formData.append("legal_entity", data.legal_entity != null ? data.legal_entity : null)
        formData.append("enforcement_proceedings", data.enforcement_proceedings != null ? data.enforcement_proceedings : null)
        formData.append("KZ_departure_ban", data.kZ_departure_ban != null ? data.kZ_departure_ban : null)
        formData.append("court_cases", data.court_cases != null ? data.court_cases : null)
        formData.append("negative_info", data.negative_info != null ? data.negative_info : null)
        
        
        try {
            if (finSolvency != null) {
                updatePersonFinSolvency.mutate(formData, {
                    onSuccess: () => {
                        next()
                        showSuccess("Данные о финансовой состоятельности обновлены")
                    },
                    onError: () => {
                        showError("Не удалось обновить данные о фин.состоятельности")
                    }
                })
            }
            else {
                addPersonFinSolvency.mutate(formData, {
                    onSuccess: () => {
                        next()
                        showSuccess("Данные о финансовой состоятельности добавлены")
                    },
                    onError: () => {
                        showError("Не удалось добавить данные о фин.состоятельности")
                    },
                })
            }
        }
        catch (error) {
            showError(error)
        }
    })
    
    const handleFileEvent = (files, field) => {
        field.onChange(files)
    }

    const onRadioChange = (inputId, value) => {

        if (value === "Не имеется") {
            methods.setValue(inputId, value)
        }
    }


    return (
        <Layout 
            style={{
                marginTop: "20px", padding: "20px", borderRadius: "10px"
            }}
        >
            <form
                onReset={methods.reset}
            >
                <Flex vertical >
                    <Space>
                        {finSolvency != null || taxDebt != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="tax_debt"
                                    label="Сведения о налоговых задолженностях"
                                    placeholder="Введите сведения о налоговых задолженностях"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="tax_debt_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="tax_debt_files" 
                                            onChange={(e) =>  handleFileEvent(e, field)}  
                                            files={filterArray(finSolvency, "tax_debt")} 
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                    <Text strong>Сведения о налоговых задолженностях</Text>
                                    <Radio.Group name="radiogroup">
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("tax_debt", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setTaxDebt(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>

                    <Space>
                        {finSolvency != null || enforcement != false ? 
                            (<>
                                <Input 
                                    type="text"
                                    name="enforcement_proceedings"
                                    label="Сведения об исполнительных производствах"
                                    placeholder="Введите сведения об исполнительных производствах"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="enforcement_proceedings_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="enforcement_proceedings_files" 
                                            onChange={(e) => handleFileEvent(e, field)} 
                                            files={filterArray(finSolvency, "enforcement_proceedings")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                    <Text strong>Сведения об исполнительных производствах</Text>
                                    <Radio.Group name="radiogroup" >
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("enforcement_proceedings", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setEnforcement(true)}>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>

                    <Space>
                        {finSolvency != null || departure != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="kZ_departure_ban"
                                    label="Сведения о наличии запрета на выезд из РК"
                                    placeholder="Введите сведения о наличии запрета на выезд из РК"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="KZ_departure_ban_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="KZ_departure_ban_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(finSolvency, "KZ_departure_ban")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения о запрете на выезд из РК</Text>
                                <Radio.Group name="radiogroup" >
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("KZ_departure_ban", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setDeparture(true)}>Имеется</Radio>
                                </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>

                    <Space>
                        {finSolvency != null || legalEntity != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="legal_entity"
                                    label="Сведения об участии в юр.лицах и ИП"
                                    placeholder="Введите сведения о"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="legal_entity_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="legal_entity_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(finSolvency, "legal_entity")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения об участии в юр.лицах</Text>
                                <Radio.Group name="radiogroup" >
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("legal_entity", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setLegalEntity(true)}>Имеется</Radio>
                                </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>

                    <Space>
                        {finSolvency != null || courtCases != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="court_cases"
                                    label="Сведения о судебных разбирательствах"
                                    placeholder="Введите сведения о судебных разбирательствах"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="court_cases_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="court_cases_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(finSolvency, "court_cases")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                    <Text strong>Сведения о судебных разбирательствах</Text>
                                    <Radio.Group name="radiogroup" >
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("court_cases", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setCourtCases(true)}>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                    <Space>
                        {finSolvency != null || negative != false ? 
                            (<>
                                <Input 
                                    type="text"
                                    name="negative_info"
                                    label="Сведения негативного характера"
                                    placeholder="Введите сведения негативного характера"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="negative_info_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="negative_info_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(finSolvency, "negative_info")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                    <Text strong>Сведения о негативного характера</Text>
                                    <Radio.Group name="radiogroup" >
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("negative_info", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setNegative(true)}>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                </Flex>
            </form>
            <Space style={{ marginTop: "20px" }}>
                <Button onClick={prev} type="primary">Назад</Button>
                {finSolvency != null 
                ? <Button onClick={onSubmit} type="primary">Обновить</Button>
                : <Button onClick={onSubmit} type="primary">Сохранить</Button>}
            </Space>
        </Layout>
    )
}

