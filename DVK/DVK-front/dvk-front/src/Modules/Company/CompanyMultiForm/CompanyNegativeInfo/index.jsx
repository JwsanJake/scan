import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useCompanyNegativeInfo } from "@/Queries/Company"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { useAddCompanyNegativeInfo, useUpdateCompanyNegativeInfo } from "@/Mutators/Company/mutators"
import { showSuccess, showError } from "@/utils/toast"
import { Layout, Flex, Spin, Space, Radio, Switch, Button, Typography } from 'antd'
const { Text } = Typography
import { Input } from "@/shared/components/Input"
import { addFilesToFormData } from "@/utils/formData"
import FilesInput from "@/shared/components/FilesInput"
import { useFileUpload } from "@/shared/hooks/useFileUpload"
import { filterArray } from "@/utils/filterFiles"


export const CompanyNegativeInfoPage = () => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()

    const {
        data: negativeInfo,
        isFetching: negativeFetching,
    } = useCompanyNegativeInfo(id, eventIdentifier)

    const negative = negativeInfo === undefined || negativeInfo === '' || Object.keys(negativeInfo).length == 0 ? null : negativeInfo

    return (
        <>
            {negativeFetching
                ? <Spin/>
                : <CompanyNegativeInfoForm negative={negative} />
            }
        </>
    )
}

const CompanyNegativeInfoForm = ({ negative = null }) => {
    const { id } = useParams()
    const { prev, reset: resetPage, parentIds } = useMultitab()
    const { eventIdentifier } = useRelations()
    const navigate = useNavigate()

    const [managementNegative, setManagementNegative] = useState(false)
    const [harmToCompany, setHarmToCompany] = useState(false)
    const [internationalSanctions, setInternationalSanctions] = useState(false)
    const [judicialSanctions, setJudicialSanctions] = useState(false)
    const [misrepresentations, setMisrepresentations] = useState(false)
    const [anticorruptionReservation, setAnticorruptionReservation] = useState(false)
    const [contractConditions, setContractConditions] = useState(false)
    const [corporationRequirements, setCorporationRequirements] = useState(false)

    const methods = useForm({
		defaultValues: negative != null ? negative.mainInfo : negative
	})

    const addNegative = useAddCompanyNegativeInfo()
    const updateNegative = useUpdateCompanyNegativeInfo()

    const parentId = parentIds.slice(-1)[0]

    const saved = (lastParent) => {
        if (!lastParent) {
            navigate(`/events/${eventIdentifier}`)

            return
        }
        navigate(`/companies/${lastParent}`)
        resetPage()
    }

    const onSubmit = methods.handleSubmit(data => {

        let formData = new FormData()

        data.management_negative_info_files != null ? addFilesToFormData(formData, data.management_negative_info_files, "management_negative_info_files") : null
        data.harm_to_companies_interests_files != null ? addFilesToFormData(formData, data.harm_to_companies_interests_files, "harm_to_companies_interests_files") : null
        data.international_sanctions_files != null ? addFilesToFormData(formData, data.international_sanctions_files, "international_sanctions_files") : null
        data.judicial_executive_authorities_sanctions_files != null ? addFilesToFormData(formData, data.judicial_executive_authorities_sanctions_files, "judicial_executive_authorities_sanctions_files") : null
        data.misrepresentations_files != null ? addFilesToFormData(formData, data.misrepresentations_files, "misrepresentations_files") : null
        data.anticorruption_reservation_files != null ? addFilesToFormData(formData, data.anticorruption_reservation_files, "anticorruption_reservation_files") : null
        data.inconsistency_of_contract_conditions_files != null ? addFilesToFormData(formData, data.inconsistency_of_contract_conditions_files, "inconsistency_of_contract_conditions_files") : null
        data.inconsistency_of_corporation_requirements_files != null ? addFilesToFormData(formData, data.inconsistency_of_corporation_requirements_files, "inconsistency_of_corporation_requirements_files") : null

        formData.append("identifier", id)
        formData.append("event_identifier", eventIdentifier)
        formData.append("management_negative_info", data.management_negative_info)
        formData.append("harm_to_companies_interests", data.harm_to_companies_interests != null ? data.harm_to_companies_interests : null)
        formData.append("international_sanctions", data.international_sanctions != null ? data.international_sanctions : null)
        formData.append("judicial_executive_authorities_sanctions", data.judicial_executive_authorities_sanctions != null ? data.judicial_executive_authorities_sanctions : null)
        formData.append("misrepresentations", data.misrepresentations != null ? data.misrepresentations : null)
        formData.append("anticorruption_reservation", data.anticorruption_reservation != null ? data.anticorruption_reservation : null)
        formData.append("inconsistency_of_contract_conditions", data.inconsistency_of_contract_conditions != null ? data.inconsistency_of_contract_conditions : null)
        formData.append("inconsistency_of_corporation_requirements", data.inconsistency_of_corporation_requirements != null ? data.inconsistency_of_corporation_requirements : null)


        try {
            if (negative != null) {
                updateNegative.mutate(formData, {
                    onSuccess: () => {
                        saved(parentId)
                        showSuccess("Данные о негативных сведениях обновлены")
                    },
                    onError: () => {
                        showError("Не удалось обновить негативные сведения")
                    }
                })
            }
            else {
                addNegative.mutate(formData, {
                    onSuccess: () => {
                        saved(parentId)
                        showSuccess("Данные о негативных сведениях добавлены")
                    },
                    onError: () => {
                        showError("Не удалось добавить негативные сведения")
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
    
        <Layout style={{ marginTop: "20px", padding: "20px", borderRadius: "10px"}}>
            <form
                onReset={methods.reset}
            >   
                <Flex vertical>
                    <Space>
                        {negative != null || managementNegative != false ?
                            (<>
                            <Input 
                                type="text"
                                name="management_negative_info"
                                label="Наличие сведений негативного характера в отношении контрагента, его учредителей и руководителей"
                                placeholder="Введите сведения"
                                errors={methods.errors}
                                register={methods.register}
                                width={'800px'}
                            />
                            <Controller
                                name="management_negative_info_files"
                                control={methods.control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <FilesInput 
                                        name="management_negative_info_files" 
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(negative, "management_negative_info")}
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
                                    <Text strong>Наличие сведений негативного характера в отношении контрагента, его учредителей и руководителей</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("management_negative_info", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setManagementNegative(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                    
                    <Space>
                        {negative != null || harmToCompany != false ? 
                            (<>
                                <Input 
                                    type="text"
                                    name="harm_to_companies_interests"
                                    label="Наличие аффилированности контрагента (по учредителю, руководителю) с субъектами, умышленные действия 
                                    которых причинили (создали условия для причинения) вред интересам компаний Казахмыс (имущественный, репутационный и проч.)"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="harm_to_companies_interests_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="harm_to_companies_interests_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "harm_to_companies_interests")}
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
                                <Text strong>Наличие аффилированности контрагента (по учредителю, руководителю) с субъектами, умышленные действия 
                                которых причинили (создали условия для причинения) вред интересам компаний Казахмыс (имущественный, репутационный и проч.)</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("harm_to_companies_interests", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setHarmToCompany(true) }>Имеется</Radio>
                                </Radio.Group>
                            </Space>
                            </>)
                        }
                    </Space>
                    
                    <Space>
                        {negative != null || internationalSanctions != false 
                        ? (<>
                                <Input 
                                    type="text"
                                    name="international_sanctions"
                                    label="Наличие международных санкций и мер контроля экспорта и импорта в отношении контрагента, его участников (в т.ч. акционеров), 
                                    конечных владельцев (при наличии сведений), банка контрагента"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="international_sanctions_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="international_sanctions_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "international_sanctions")}
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
                                <Text strong>Наличие международных санкций и мер контроля экспорта и импорта в отношении контрагента, его участников (в т.ч. акционеров), 
                                конечных владельцев (при наличии сведений), банка контрагента</Text>
                                <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("international_sanctions", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setInternationalSanctions(true) }>Имеется</Radio>
                                </Radio.Group>
                            </Space>
                        </>)}
                    </Space>
                    
                    <Space>
                        {negative != null || judicialSanctions != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="judicial_executive_authorities_sanctions"
                                    label="Наличие санкций судебных и исполнительных органов в отношении контрагента, его участников (акционеров), конечных владельцев (при наличии сведений)"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="judicial_executive_authorities_sanctions_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="judicial_executive_authorities_sanctions_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "judicial_executive_authorities_sanctions")}
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
                                    <Text strong>Наличие санкций судебных и исполнительных органов в отношении контрагента, его участников (акционеров), конечных владельцев (при наличии сведений)</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("judicial_executive_authorities_sanctions", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setJudicialSanctions(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                    <Space>
                        {negative != null || misrepresentations != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="misrepresentations"
                                    label="Наличие  недостоверных сведений, документов среди представленного контрагентом пакета документов"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="misrepresentations_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput  
                                            name="misrepresentations_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "misrepresentations")}
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
                                    <Text strong>Наличие  недостоверных сведений, документов среди представленного контрагентом пакета документов</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("misrepresentations", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setMisrepresentations(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                    <Space>
                        {negative != null || anticorruptionReservation != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="anticorruption_reservation"
                                    label="Наличие в тексте проекта договора антикоррупционной оговорки"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="anticorruption_reservation_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="anticorruption_reservation_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "anticorruption_reservation")}
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
                                    <Text strong>Наличие в тексте проекта договора антикоррупционной оговорки</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("anticorruption_reservation", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setAnticorruptionReservation(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                    <Space>
                        {negative != null || contractConditions != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="inconsistency_of_contract_conditions"
                                    label="Наличие сведений о несоответствии предмета и условий договора основанию заключения договора и выбора контрагента"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="inconsistency_of_contract_conditions_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="inconsistency_of_contract_conditions_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "inconsistency_of_contract_conditions")}
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
                                    <Text strong>Наличие сведений, отрицательно характеризующих компанию</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("inconsistency_of_contract_conditions", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setContractConditions(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                    <Space>
                        {negative != null || corporationRequirements != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="inconsistency_of_corporation_requirements"
                                    label="Наличие сведений о несоответствии способа выбора контрагента требованиям локальных актов корпорации, в том числе, в сфере противодействия коррупции"
                                    placeholder="Введите сведения"
                                    errors={methods.errors}
                                    register={methods.register}
                                    width={'800px'}
                                />
                                <Controller
                                    name="inconsistency_of_corporation_requirements_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="inconsistency_of_corporation_requirements_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "inconsistency_of_corporation_requirements")}
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
                                    <Text strong>Наличие сведений о несоответствии способа выбора контрагента требованиям локальных актов корпорации, в том числе, в сфере противодействия коррупции</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("inconsistency_of_corporation_requirements", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setCorporationRequirements(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                            </>)
                        }
                    </Space>
                </Flex>
                <Space style={{ marginTop: "20px"}}>
                    {negative != null ? 
                        <Button onClick={onSubmit} type="primary">Обновить</Button>
                        : <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    }
                    <Button onClick={prev} type="primary">Назад</Button>
                </Space>
            </form>
        </Layout>
    )
}
export default CompanyNegativeInfoForm