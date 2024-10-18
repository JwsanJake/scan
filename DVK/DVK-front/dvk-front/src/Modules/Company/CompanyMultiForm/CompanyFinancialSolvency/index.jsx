import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAddCompanyFinSolvency, useUpdateCompanyFinancialSolvency } from "@/Mutators/Company/mutators"
import { useCompanyFinancialSolvency } from "@/Queries/Company"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { showSuccess, showError } from "@/utils/toast"
import { Input } from "@/shared/components/Input"
import { Spin, Flex, Button, Radio, Checkbox, Switch, Space, Typography, Layout } from 'antd'
const { Text } = Typography
import FilesInput from "@/shared/components/FilesInput"
import { addFilesToFormData } from "@/utils/formData"
import { filterArray } from "@/utils/filterFiles"
 

export const CompanyFinancialSolvencyPage = () => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()

    const { 
        data : companyFinSolvency, 
        isFetching : companyFetching,
    } = useCompanyFinancialSolvency(id, eventIdentifier)

    const finSolvency = companyFinSolvency === undefined || companyFinSolvency === '' || Object.keys(companyFinSolvency).length == 0 ? null : companyFinSolvency

    return (
        <>
            {companyFetching 
                ? <Spin />
                : <CompanyFinancialSolvencyForm  finSolvency={finSolvency}/> 
            }
        </>
    )
}


const CompanyFinancialSolvencyForm = ({ finSolvency = null }) => {
    const { id } = useParams()
    const { prev, next } = useMultitab()
    const { eventIdentifier } = useRelations()
    
    const [taxPayment, setTaxPayment] = useState(false)
    const [taxDebt, setTaxDebt] = useState(false)
    const [enforcement, setEnforcement] = useState(false)
    const [courtCases, setCourtCases] = useState(false)
    const [criminalAdministrative, setCriminalAdministrative] = useState(false)
    const [unscrupulousParticipant, setUnscrupulosParticipant] = useState(false)
    const [balanceArrest, setBankBalanceArrest] = useState(false)
    const [negative, setNegative] = useState(false)

    const methods = useForm({
        defaultValues: finSolvency != null ? finSolvency.mainInfo : finSolvency
	})

    const addCompanyFinSolvency = useAddCompanyFinSolvency()
    const updateCompanyFinSolvency = useUpdateCompanyFinancialSolvency()
    
    const onSubmit = methods.handleSubmit(data => {

        let formData = new FormData()

        data.tax_payment_last_year_files != null ? addFilesToFormData(formData, data.tax_payment_last_year_files, "tax_payment_last_year_files") : null
        data.tax_debt_info_files != null ? addFilesToFormData(formData, data.tax_debt_info_files, "tax_debt_info_files") : null
        data.enforcement_proceedings_info_files != null ? addFilesToFormData(formData, data.enforcement_proceedings_info_files, "enforcement_proceedings_info_files") : null
        data.court_cases_info_files != null ? addFilesToFormData(formData, data.court_cases_info_files, "court_cases_info_files") : null
        data.criminal_administrative_сases_info_files != null ? addFilesToFormData(formData, data.criminal_administrative_сases_info_files, "criminal_administrative_сases_info_files") : null
        data.unscrupulous_participant_of_state_procurements_files != null ? addFilesToFormData(formData, data.unscrupulous_participant_of_state_procurements_files, "unscrupulous_participant_of_state_procurements_files") : null
        data.arrest_of_bank_balance_files != null ? addFilesToFormData(formData, data.arrest_of_bank_balance_files, "arrest_of_bank_balance_files") : null
        data.negative_info_files != null ? addFilesToFormData(formData, data.negative_info_files, "negative_info_files") : null
        
        formData.append("identifier", id)
        formData.append("event_identifier", eventIdentifier)
        formData.append("tax_payment_last_year", data.tax_payment_last_year != null ? data.tax_payment_last_year : null)
        formData.append("tax_debt_info", data.tax_debt_info != null ? data.tax_debt_info : null)
        formData.append("enforcement_proceedings_info", data.enforcement_proceedings_info != null ? data.enforcement_proceedings_info : null)
        formData.append("court_cases_info", data.court_cases_info != null ? data.court_cases_info : null)
        formData.append("criminal_administrative_cases_info", data.criminal_administrative_cases_info != null ? data.criminal_administrative_cases_info : null)
        formData.append("unscrupulous_participant_of_state_procurements", data.unscrupulous_participant_of_state_procurements != null ? data.unscrupulous_participant_of_state_procurements : null)
        formData.append("arrest_of_bank_balance", data.arrest_of_bank_balance != null ? data.arrest_of_bank_balance : null)
        formData.append("negative_info", data.negative_info != null ? data.negative_info : null)
        
        
        try {
            if (finSolvency != null) {
                updateCompanyFinSolvency.mutate(formData, {
                    onSuccess: () => {
                        next()
                        showSuccess("Данные о финансовой состоятельности добавлены")
                    },
                    onError: () => {
                        showError("Не удалось добавить данные о финансовой состоятельности")
                    }
                })
            }
            else {
                addCompanyFinSolvency.mutate(formData, {
                    onSuccess: () => {
                        next()
                        showSuccess("Данные о финансовой состоятельности обновлены")
                    },
                    onError: () => {
                        showError("Не удалось обновить данные о финансовой состоятельности")
                    }
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
                <Flex vertical>
                <Space>
                    {finSolvency != null || taxPayment != false ? 
                        (<>
                            <Input 
                                type="text"
                                name="tax_payment_last_year"
                                label="Сведения о налогах за последний год"
                                placeholder="Введите сведения о налогах за последний год"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller
                                name="tax_payment_last_year_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="tax_payment_last_year_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "tax_payment_last_year")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                        </>) 
                        : (<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения о налогах за последний год</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("tax_payment_last_year", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setTaxPayment(true) }>Имеется</Radio>
                                </Radio.Group>
                            </Space>
                        </>
                    )}
                </Space>

                <Space>
                    {finSolvency != null || taxDebt != false ? 
                    (<>
                        <Input 
                            type="text"
                            name="tax_debt_info"
                            label="Сведения о налоговой задолженности в отношении контрагента и/или его уредителей, руководителя"
                            placeholder="Введите сведения о налоговой задолженности"
                            errors={methods.errors}
                            register={methods.register}
                            width="600px"
                        />
                        <Controller
                            name="tax_debt_info_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput 
                                    name="tax_debt_info_files" 
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "tax_debt")}
                                    label="Вложите документы"
                                />
                            )}
                        />
                        {methods.formState.errors.files && (
                            <div>{methods.formState.errors.files.message}</div>
                        )}
                    </>) 
                    : (<>
                        <Space direction="vertical" style={{marginTop: "10px"}}>
                        <Text strong>Сведения о налоговой задолженности в отношении контрагента и/или его уредителей, руководителя</Text>
                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("tax_debt_info", e.target.value)}>Не имеется</Radio>
                            <Radio value={1} onClick={() => setTaxDebt(true)}>Имеется</Radio>
                        </Radio.Group>
                        </Space>
                    </>)}
                </Space>
                
                <Space>
                    {finSolvency != null || enforcement != false ? 
                        (<>
                            <Input 
                                type="text"
                                name="enforcement_proceedings_info"
                                label="Сведения о наличии исполнительных производств в отношении контрагента и/или его учредителей, руководителя"
                                placeholder="Введите сведения об исполнительных производствах"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller
                                name="enforcement_proceedings_info_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="enforcement_proceedings_info_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "enforcement_proceedings")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                            {methods.formState.errors.files && (
                                <div>{methods.formState.errors.files.message}</div>
                            )}
                        </>)
                        :(<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                            <Text strong>Сведения о наличии исполнительных производств в отношении контрагента и/или его учредителей, руководителя</Text>
                            <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                <Radio value={"Не имеется"} onChange={(e) => onRadioChange("enforcement_proceedings_info", e.target.value)}>Не имеется</Radio>
                                <Radio value={1} onClick={() => setEnforcement(true)}>Имеется</Radio>
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
                                name="court_cases_info"
                                label="Сведения о наличии судебных разбирательств в отношении контрагента и/или его учредителей, руководителя"
                                placeholder="Введите сведения о судебных разбирательствах"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller 
                                name="court_cases_info_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="court_cases_info_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "court_cases")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                            {methods.formState.errors.files && (
                                <div>{methods.formState.errors.files.message}</div>
                            )}
                        </>) 
                        : (<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                            <Text strong>Сведения о наличии судебных разбирательств в отношении контрагента и/или его учредителей, руководителя</Text>
                            <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                <Radio value={"Не имеется"} onChange={(e) => onRadioChange("court_cases_info", e.target.value)}>Не имеется</Radio>
                                <Radio value={1} onClick={() => setCourtCases(true)}>Имеется</Radio>
                            </Radio.Group>
                            </Space>
                        </>)
                    } 
                </Space>
                
                <Space>
                    {finSolvency != null || criminalAdministrative != false ?
                        (<>
                            <Input 
                                type="text"
                                name="criminal_administrative_cases_info"
                                label="Сведения о наличии гражданских, административных, уголовных дел в отношении контрагента и/или его учредителей, руководителя"
                                placeholder="Введите сведения об уголовной ответственности"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller 
                                name="criminal_administrative_сases_info_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="criminal_administrative_сases_info_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "criminal_administrative")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                            {methods.formState.errors.files && (
                                <div>{methods.formState.errors.files.message}</div>
                            )}
                        </>) 
                        : (<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения о наличии гражданских, административных, уголовных дел в отношении контрагента и/или его учредителей, руководителя</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("criminal_administrative_cases_info", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setCriminalAdministrative(true)}>Имеется</Radio>
                                </Radio.Group>
                            </Space>
                        </>)
                    }   
                </Space>
                
                <Space>
                    {finSolvency != null || unscrupulousParticipant != false ?
                        (<>
                            <Input 
                                type="text"
                                name="unscrupulous_participant_of_state_procurements"
                                label="Сведения о наличии контрагента в реестре недобросовестных участников гос.закупок"
                                placeholder="Введите сведения об административной ответственности"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller 
                                name="unscrupulous_participant_of_state_procurements_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="unscrupulous_participant_of_state_procurements_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "unscrupulous_participant")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                            {methods.formState.errors.files && (
                                <div>{methods.formState.errors.files.message}</div>
                            )}
                        </>) 
                        : (<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения об административной ответственности</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("unscrupulous_participant_of_state_procurements", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setUnscrupulosParticipant(true)}>Имеется</Radio>
                                </Radio.Group>
                            </Space>
                        </>)
                    }
                </Space>

                <Space>
                    {finSolvency != null || balanceArrest != false ?
                        (<>
                            <Input 
                                type="text"
                                name="arrest_of_bank_balance"
                                label="Сведения о наличии арестов на банковские счета, имущество контрагента и/или его учредителей, руководителя"
                                placeholder="Введите сведения об административной ответственности"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller 
                                name="arrest_of_bank_balance_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="arrest_of_bank_balance_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "arrest_of_bank_balance")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                            {methods.formState.errors.files && (
                                <div>{methods.formState.errors.files.message}</div>
                            )}
                        </>) 
                        : (<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения об административной ответственности</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("arrest_of_bank_balance_info", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setBankBalanceArrest(true)}>Имеется</Radio>
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
                                label="Сведения негативного характера в отношении контрагента и/или его учредителей, руководителя"
                                placeholder="Введите сведения негативного характера"
                                errors={methods.errors}
                                register={methods.register}
                                width="600px"
                            />
                            <Controller 
                                name="negative_info_files"
                                control={methods.control}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="negative_info_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(finSolvency, "negative_info")}
                                        label="Вложите документы"
                                    />
                                )}
                            />
                            {methods.formState.errors.files && (
                                <div>{methods.formState.errors.files.message}</div>
                            )}
                        </>) 
                        : (<>
                            <Space direction="vertical" style={{marginTop: "10px"}}>
                                <Text strong>Сведения негативного характера в отношении контрагента и/или его учредителей, руководителя</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px"}}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("negative_info", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setNegative(true)}>Имеется</Radio>
                                </Radio.Group>
                            </Space>
                        </>)
                    }
                </Space>
                </Flex>
                
                <Space style={{ marginTop:  "20px" }}>
                    <Button onClick={prev} type="primary">Назад</Button>
                    {finSolvency != null ? 
                        <>
                            <Button onClick={onSubmit} type="primary">Обновить</Button>
                        </>
                        : 
                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    }
                </Space>
            </form>
        </Layout>
    )
}
export default CompanyFinancialSolvencyForm