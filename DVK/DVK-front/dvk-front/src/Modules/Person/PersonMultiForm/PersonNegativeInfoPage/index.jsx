import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAddPersonNegativeInfo, useUpdatePersonNegativeInfo } from "@/Mutators/Person/mutators"
import { useForm, Controller } from "react-hook-form"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { useRelations } from "@/shared/hooks/useRelations"
import { usePersonNegativeInfo } from "@/Queries/Person"
import { Input } from "@/shared/components/Input"
import { showSuccess, showError } from "@/utils/toast"
import { Flex, Button, Spin, Typography, Space, Radio, Layout } from "antd"
const { Text } = Typography
import { addFilesToFormData } from "@/utils/formData"
import FilesInput from "@/shared/components/FilesInput"
import { useLocationParameters } from "@/shared/hooks/useLocationParameters"
import { filterArray } from "@/utils/filterFiles"

export const PersonNegativeInfoPage = () => {
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
                : <PersonNegativeInfoForm negative={negative}/>
            }
        </>
    )
}

const PersonNegativeInfoForm = ({ negative = null }) => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()
    const { parentId } = useLocationParameters()
    const { prev, reset: resetPage } = useMultitab()
    const navigate = useNavigate()

    const [erdr, setERDR] = useState(false)
    const [criminalOffense, setCriminalOffense] = useState(false)
    const [administrative, setAdministrative] = useState(false)
    const [disengagement, setDisengagement] = useState(false)
    const [unreimbursedDamage, setUnreimbursedDamage] = useState(false)
    const [familyTies, setFamilyTies] = useState(false)
    const [disciplinary, setDisciplinary] = useState(false)
    const [suspension, setSuspension] = useState(false)
    const [termination, setTermination] = useState(false)
    const [dbCheck, setDbCheck] = useState(false)
    const [policeCheck, setPoliceCheck] = useState(false)
    const [familyNegative, setFamilyNegative] = useState(false)

    const methods = useForm({
		defaultValues: negative != null ? negative.mainInfo : negative,
        //defaultValues: negative
	})

    const addPersonNegativeInfo = useAddPersonNegativeInfo()
    const updatePersonNegativeInfo = useUpdatePersonNegativeInfo()

    const onNavigate = () => {
        if (parentId != null) {
            navigate(`/companies/${parentId}`)
        }
        else {
            if (eventIdentifier != null) {
                navigate(`/events/${eventIdentifier}`)
            }
            else {
                navigate(`/persons`)
            }
            
        }
    }

    const onSubmit = methods.handleSubmit(data => {
        
        let formData = new FormData()

        data.erdr_info_files != null ? addFilesToFormData(formData, data.erdr_info_files, "erdr_info_files") : null
        data.criminal_offense_files != null ? addFilesToFormData(formData, data.criminal_offense_files, "criminal_offense_files") : null
        data.administrative_responsibility_files  != null ? addFilesToFormData(formData, data.administrative_responsibility_files, "administrative_responsibility_files") : null
        data.disengagement_files != null ? addFilesToFormData(formData, data.disengagement_files, "disengagement_files") : null
        data.unreimbursed_damage_files != null ? addFilesToFormData(formData, data.unreimbursed_damage_files, "unreimbursed_damage_files") : null
        data.presense_of_family_ties_files != null ? addFilesToFormData(formData, data.presense_of_family_ties_files, "presense_of_family_ties_files") : null
        data.presence_of_disciplinary_action_files != null ? addFilesToFormData(formData, data.presence_of_disciplinary_action_files, "presence_of_disciplinary_action_files") : null
        data.suspension_from_work_files != null ? addFilesToFormData(formData, data.suspension_from_work_files, "suspension_from_work_files") : null
        data.termination_of_contract_files != null ? addFilesToFormData(formData, data.termination_of_contract_files, "termination_of_contract_files") : null
        data.db_data_check_files != null ? addFilesToFormData(formData, data.db_data_check_files, "db_data_check_files") : null
        data.police_data_check_files != null ? addFilesToFormData(formData, data.police_data_check_files, "police_data_check_files") : null
        data.family_negative_info_files != null ? addFilesToFormData(formData, data.family_negative_info_files, "family_negative_info_files") : null

        formData.append("event_identifier", eventIdentifier)
        formData.append("erdr_info", data.erdr_info != null ? data.erdr_info : null)
        formData.append("criminal_offense", data.criminal_offense != null ? data.criminal_offense : null)
        formData.append("disengagement", data.disengagement != null ? data.disengagement : null)
        formData.append("administrative_responsibility", data.administrative_responsibility != null ? data.administrative_responsibility : null)
        formData.append("unreimbursed_damage", data.unreimbursed_damage != null ? data.unreimbursed_damage : null)
        formData.append("presense_of_family_ties", data.presense_of_family_ties != null ? data.presense_of_family_ties : null)
        formData.append("presence_of_disciplinary_action", data.presence_of_disciplinary_action != null ? data.presence_of_disciplinary_action : null)
        formData.append("suspension_from_work", data.suspension_from_work != null ? data.suspension_from_work : null)
        formData.append("termination_of_contract", data.termination_of_contract != null ? data.termination_of_contract : null)
        formData.append("db_data_check", data.db_data_check != null ? data.db_data_check : null)
        formData.append("police_data_check", data.police_data_check != null ? data.police_data_check : null)
        formData.append("family_negative_info", data.family_negative_info != null ? data.family_negative_info : null)
        formData.append("identifier", id)

        console.log(formData.entries())

        try {
            if (negative != null) {
                updatePersonNegativeInfo.mutate(formData, {
                    onSuccess: () => {
                        resetPage()
                        onNavigate()
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
                        onNavigate()
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
        console.log("sdsd")
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
                    {/* <Flex vertical> */}
                        <Space>
                            {negative != null || criminalOffense != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="criminal_offense"
                                        label="Сведения о наличии у кандидата/работника непогашенной/неснятой в установленном законом порядке 
                                        судимости за умышленно совершенные уголовные правонарушения и/или наличие оснований, препятствующих 
                                        приему на работу, прямо указанных в приговоре суда"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="criminal_offense_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="criminal_offense_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "criminal_offense")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>)
                                :(<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения о наличии у кандидата/работника непогашенной/неснятой в установленном законом порядке 
                                        судимости за умышленно совершенные уголовные правонарушения и/или наличие оснований, препятствующих 
                                        приему на работу, прямо указанных в приговоре суда</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value="Не имеется" onChange={(e) => onRadioChange("criminal_offense", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setCriminalOffense(true) }>Имеется</Radio>
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
                                        label="Сведения о наличие зарегистрированных в ЕРДР правоохранительных органов материалов в отношении 
                                        кандидата о совершении последним умышленных уголовных правонарушений, по которым не принято 
                                        окончательное процессуальное решение"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="erdr_info_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="erdr_info_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "erdr_info")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения о наличие зарегистрированных в ЕРДР правоохранительных органов материалов в отношении 
                                            кандидата о совершении последним умышленных уголовных правонарушений, по которым не принято 
                                            окончательное процессуальное решение</Text>
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
                                        width="600px"
                                    />
                                    <Controller
                                        name="administrative_responsibility_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="administrative_responsibility_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "administrative_responsibility")}
                                                label="Вложите документ"
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
                            {negative != null || disengagement != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="disengagement"
                                        label="Сведения об освобождение кандидата от наказания за совершение умышленного уголовного правонарушения либо прекращение
                                            в отношении него уголовного преследования по не реабилитирующим основаниям, а также осуждение за совершение уголовного проступка, 
                                            если с момента принятого решения не прошел 1 год"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="disengagement_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="disengagement_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "disengagement")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения об освобождение кандидата от наказания за совершение умышленного уголовного правонарушения либо прекращение
                                            в отношении него уголовного преследования по не реабилитирующим основаниям, а также осуждение за совершение уголовного проступка, 
                                            если с момента принятого решения не прошел 1 год</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("disengagement", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setDisengagement(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>
                        <Space>
                            {negative != null || unreimbursedDamage != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="unreimbursed_damage"
                                        label='Сведения о наличии невозмещенного  материального ущерба, причиненного кандидатом предприятиям 
                                        Группы компаний "Казахмыс"'
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="unreimbursed_damage_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="unreimbursed_damage_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "unreimbursed_damage")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения о наличии невозмещенного  материального ущерба, причиненного кандидатом предприятиям 
                                        Группы компаний "Казахмыс"</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("unreimbursed_damage", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setUnreimbursedDamage(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>

                        <Space>
                            {negative != null || familyTies != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="presense_of_family_ties"
                                        label="Сведения о наличии близких родственных связей с непосредственным руководителем или подчиненным, 
                                            за исключением случаев урегулирования конфликта интересов со стороны работодателя"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="presense_of_family_ties_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="presense_of_family_ties_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "presense_of_family_ties")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения о наличии близких родственных связей с непосредственным руководителем или подчиненным, 
                                        за исключением случаев урегулирования конфликта интересов со стороны работодателя</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("presense_of_family_ties", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setFamilyTies(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>
                    {/* </Flex> */}

                    {/* <Flex vertical> */}
                        <Space>
                            {negative != null || disciplinary != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="presence_of_disciplinary_action"
                                        label="Сведения о наличии действующего дисциплинарного взыскания за противоправные действия, 
                                        повлекшие причинение материального ущерба или иного вреда предприятию, а равно неоднократное 
                                        (не менее 3-х в течение последних 6 месяцев) привлечение лица к дисциплинарной и/или материальной 
                                        ответственности (при назначении кандидата на вышестоящую должность)"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="presence_of_disciplinary_action_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="presence_of_disciplinary_action_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "presense_of_disciplinary_action")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения о наличии действующего дисциплинарного взыскания за противоправные действия, 
                                        повлекшие причинение материального ущерба или иного вреда предприятию, а равно неоднократное 
                                        (не менее 3-х в течение последних 6 месяцев) привлечение лица к дисциплинарной и/или материальной 
                                        ответственности (при назначении кандидата на вышестоящую должность)</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("presence_of_disciplinary_action", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setDisciplinary(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                            
                        </Space>

                        <Space>
                            {negative != null || suspension != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="suspension_from_work"
                                        label="Истечение менее одного года с момента отстранения кандидата от работы по результатам 
                                            расследования причин групповых несчастных случаев и несчастных случаев со смертельным исходом, 
                                            препятствующее назначению на вышестоящую и руководящую должность"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="suspension_from_work_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="suspension_from_work_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "suspension_from_work")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Истечение менее одного года с момента отстранения кандидата от работы по результатам 
                                            расследования причин групповых несчастных случаев и несчастных случаев со смертельным исходом, 
                                            препятствующее назначению на вышестоящую и руководящую должность</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("suspension_from_work", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setSuspension(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>

                        <Space>
                            {negative != null || termination != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="termination_of_contract"
                                        label="Сведения о расторжении с кандидатом трудового договора на предыдущем месте работы по отрицательным основаниям"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="termination_of_contract_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="termination_of_contract_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "termination_of_contract")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения о расторжении с кандидатом трудового договора на предыдущем месте работы по отрицательным основаниям</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("termination_of_contract", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setTermination(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>

                        <Space>
                            {negative != null || dbCheck != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="db_data_check"
                                        label="Проверка по БД"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="db_data_check_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="db_data_check_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "db_data_check")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Проверка по БД</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("db_data_check", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setDbCheck(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space> 

                        <Space>
                            {negative != null || policeCheck != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="police_data_check"
                                        label="Проверка по данных П"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="police_data_check_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="police_data_check_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "police_data_check")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Проверка по данных П</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("police_data_check", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setPoliceCheck(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>

                        <Space>
                            {negative != null || familyNegative != false ?
                                (<>
                                    <Input 
                                        type="text"
                                        name="family_negative_info"
                                        label="Сведения негативного характера в отношении членов семьи, родственников"
                                        placeholder="Введите сведения"
                                        errors={methods.errors}
                                        register={methods.register}
                                        width="600px"
                                    />
                                    <Controller
                                        name="family_negative_info_files"
                                        control={methods.control}
                                        render={({ field }) => (
                                            <FilesInput 
                                                name="family_negative_info_files" 
                                                onChange={(e) => handleFileEvent(e, field)}
                                                files={filterArray(negative, "family_negative_info")}
                                                label="Вложите документ"
                                            />
                                        )}
                                    />
                                </>) 
                                : (<>
                                    <Space direction="vertical" style={{marginTop: "10px"}}>
                                        <Text strong>Сведения негативного характера в отношении членов семьи, родственников</Text>
                                        <Radio.Group name="radiogroup" style={{ marginLeft: "20px" }}>
                                            <Radio value={"Не имеется"} onChange={(e) => onRadioChange("family_negative_info", e.target.value)}>Не имеется</Radio>
                                            <Radio value={1} onClick={() => setFamilyNegative(true) }>Имеется</Radio>
                                        </Radio.Group>
                                    </Space>
                                </>)
                            }
                        </Space>
                    {/* </Flex> */}
                </Flex>
                <Space style={{ marginTop: "20px" }}>
                    <Button onClick={prev} type="primary">Назад</Button> 
                    {negative != null ? 
                        <Button onClick={onSubmit} type="primary">Обновить</Button>
                        : <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    }
                </Space>
                
            </form>
        </Layout>
    )
}