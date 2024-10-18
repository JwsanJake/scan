import React, { useState, useMemo } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useAddPersonNegativeInfo, useUpdatePersonNegativeInfo } from "@/Mutators/Person/mutators"
import { useForm, Controller } from "react-hook-form"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { useRelations } from "@/shared/hooks/useRelations"
import { usePersonNegativeInfo } from "@/Queries/Person"
import { Input } from "@/shared/components/Input"
import { showSuccess, showError } from "@/utils/toast"
import { Flex, Button, Spin, Typography, Layout, Space, Radio } from "antd"
const { Text } = Typography
import { addFilesToFormData } from "@/utils/formData"
import FilesInput from "@/shared/components/FilesInput"
import { filterArray } from "@/utils/filterFiles"

export const OwnerNegativeInfoPage = () => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()

    const { 
        data: negativeInfo, 
        isFetching: negativeFetching,
    } = usePersonNegativeInfo(id, eventIdentifier)

    const negative = negativeInfo === undefined || negativeInfo === '' || Object.keys(negativeInfo).length === 0 ? null : negativeInfo

    return (
        <>
            {negativeFetching
                ? <Spin/>
                : <OwnerNegativeInfoForm negative={negative}/>
            }
        </>
    )
}

const OwnerNegativeInfoForm = ({ negative = null }) => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()
    const location = useLocation()
    const url = decodeURI(location.pathname).split('/')
    const { prev, reset: resetPage } = useMultitab()
    const navigate = useNavigate()

    const [administrative, setAdministrative] = useState(false)
    const [criminalRecord, setCriminalRecord] = useState(false)
    const [erdr, setERDR] = useState(false)
    const [criminalRemission, setCriminalRemission] = useState(false)
    const [personalSanctions, setPersonalSanctions] = useState(false)

    const methods = useForm({
		defaultValues: negative != null ? negative.mainInfo : negative
	})

    const addPersonNegativeInfo = useAddPersonNegativeInfo()
    const updatePersonNegativeInfo = useUpdatePersonNegativeInfo()

    const onSubmit = methods.handleSubmit(data => {
        
        let formData = new FormData()

        data.erdr_info_files != null ? addFilesToFormData(formData, data.erdr_info_files, "erdr_info_files") : null
        data.criminal_record_files != null ? addFilesToFormData(formData, data.criminal_record_files, "criminal_record_files") : null
        data.criminal_remission_files != null ? addFilesToFormData(formData, data.criminal_remission_files, "criminal_remission_files") : null
        data.personal_sanctions_files != null ? addFilesToFormData(formData, data.personal_sanctions_files, "personal_sanctions_files") : null
        data.administrative_responsibility_files  != null ? addFilesToFormData(formData, data.administrative_responsibility_files, "administrative_responsibility_files") : null

        formData.append("identifier", id)
        formData.append("event_identifier", eventIdentifier)
        formData.append("erdr_info", data.erdr_info != null ? data.erdr_info : null)
        formData.append("criminal_offense", data.criminal_offense != null ? data.criminal_offense : null)
        formData.append("administrative_responsibility", data.administrative_responsibility != null ? data.administrative_responsibility : null)
        formData.append("criminal_record", data.criminal_record != null ? data.criminal_record : null)
        formData.append("criminal_remission", data.criminal_remission != null ? data.criminal_remission : null)
        formData.append("personal_sanctions", data.personal_sanctions != null ? data.personal_sanctions : null)


        try {
            if (negative != null) {
                updatePersonNegativeInfo.mutate(formData, {
                    onSuccess: () => {
                        resetPage()
                        navigate(`/companies/${url[2]}`)
                        showSuccess("Негативная информация обновлена")
                    },
                    onError: () => {
                        showError("Не удалось обновить негативную информацию")
                    }
                })
            }
            else {
                addPersonNegativeInfo.mutate(formData, {
                    onSuccess: () => {
                        resetPage()
                        navigate(`/companies/${url[2]}`)
                        showSuccess("Негативная информация добавлена")
                    },
                    onError: () => {
                        showError("Не удалось добавить негативную информацию")
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
        <Layout style={{ marginTop: "20px", padding: "20px", borderRadius: "20px" }}>
            <form
                onReset={methods.reset}
            >   
                <Flex vertical>
                    <Space>
                            {negative != null || criminalRecord != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="criminal_record"
                                        label="Наличие непогашенной/не снятой судимости за уголовные правонарушения, совершенные умышленно"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                    />
                                    <Controller
                                        name="criminal_record_files"
                                        control={methods.control}
                                        defaultValue={[]}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="criminal_record_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "criminal_record")}
                                                label="Вложите документы"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Наличие непогашенной/не снятой судимости за уголовные правонарушения, совершенные умышленно</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("criminal_record", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setCriminalRecord(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                    </Space>

                    <Space>
                            {negative != null || erdr != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="erdr_info"
                                        label="Наличие зарегистрированных в ЕРДР правоохранительных органов материалов о совершении
                                        умышленных уголовных правонарушений, по которым не принято окончательное процессуальное решение"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                    />
                                    <Controller
                                        name="erdr_info_files"
                                        control={methods.control}
                                        defaultValue={[]}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="erdr_info_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "erdr_info")}
                                                label="Вложите документы"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Наличие зарегистрированных в ЕРДР правоохранительных органов материалов о совершении
                                        умышленных уголовных правонарушений, по которым не принято окончательное процессуальное решение</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("erdr_info", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setERDR(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                    </Space>

                    <Space>
                        {negative != null || administrative != false ?
                            (<>
                                <Input 
                                    type="text"
                                    name="administrative_responsibility"
                                    label="Сведения о наличии административной ответственности"
                                    placeholder="Введите сведения о наличии административной ответственности"
                                    errors={methods.errors}
                                    register={methods.register}
                                />
                                <Controller
                                    name="administrative_responsibility_files"
                                    control={methods.control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="administrative_responsibility_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(negative, "administrative_responsibility")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </>) 
                            : (<>
                                <Space direction="vertical" style={{marginTop: "10px"}}>
                                    <Text strong>Сведения о наличии административной ответственности</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                    <Radio value={"Не имеется"} onChange={(e) => onRadioChange("administrative_responsibility", e.target.value)}>Не имеется</Radio>
                                    <Radio value={1} onClick={() => setAdministrative(true)}>Имеется</Radio>
                                    </Radio.Group>
                                </Space>
                                </>)
                        }
                    </Space> 

                    <Space>
                            {negative != null || criminalRemission != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="criminal_remission"
                                        label="Наличие в течении последнего года факта освобождения от уголовной ответственности 
                                        по не реабилитирующим основаниям, либо освобождения от наказания"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                    />
                                    <Controller
                                        name="criminal_remission_files"
                                        control={methods.control}
                                        defaultValue={[]}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="criminal_remission_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "criminal_remission")}
                                                label="Вложите документы"
                                            />
                                        )}
                                    />
                                </>) 
                                : (
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Наличие в течении последнего года факта освобождения от уголовной ответственности 
                                        по не реабилитирующим основаниям, либо освобождения от наказания
                                        </Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("criminal_remission", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setCriminalRemission(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>)
                            }
                    </Space>

                    <Space>
                            {negative != null || personalSanctions != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="personal_sanctions"
                                        label="Наличие наложенных политических, экономических и иных санкций"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                    />
                                    <Controller
                                        name="personal_sanctions_files"
                                        control={methods.control}
                                        defaultValue={[]}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="personal_sanctions_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "personal_sanctions")}
                                                label="Вложите документы"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<Space direction="vertical" style={{marginTop: "10px"}}>
                                    <Text strong>Наличие наложенных политических, экономических и иных санкций</Text>
                                    <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                        <Radio value={"Не имеется"} onChange={(e) => onRadioChange("personal_sanctions", e.target.value)}>Не имеется</Radio>
                                        <Radio value={1} onClick={() => setPersonalSanctions(true) }>Имеется</Radio>
                                    </Radio.Group>
                                </Space>)
                            }
                    </Space>
                </Flex>
          
                <Space style={{ marginTop: "20px"}}> 
                    <Button onClick={prev} type="primary">Назад</Button> 
                    <Button onClick={onSubmit} type="primary">Сохранить</Button>
                </Space>
            </form>
        </Layout>
    )
}