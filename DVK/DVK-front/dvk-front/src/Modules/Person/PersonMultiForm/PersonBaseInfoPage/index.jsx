import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { useRelations } from "@/shared/hooks/useRelations"
import { usePersonById, useAllCountries } from "@/Queries/Person"
import { useAddPerson, useUpdatePerson } from "@/Mutators/Person/mutators"
import { Input } from "@/shared/components/Input"
import SelectAntd from "@/shared/components/Select"
import DatePickerAntd from "@/shared/components/DatePicker"
import { Spin, Space, Button, Flex, Layout, Typography } from "antd"
const { Title } = Typography
import { showSuccess, showError } from "@/utils/toast"
import FilesInput from "@/shared/components/FilesInput"
import { addFilesToFormData } from "@/utils/formData"
import { filterArray } from "@/utils/filterFiles"


export const PersonBaseInfoPage = ({}) => {
    const { id } = useParams()
    
    const mode = id != null ? 'edit' : 'add'

    const { 
        data : person, 
        isFetched : personFetched,
        isFetching : personFetching,
    } = usePersonById(id)

    return (
        <>
            {mode === 'add' ? 
                (<PersonBaseInfoForm mode={mode} />) 
                : ( <> {personFetching  
                ? <Spin/> 
                : <PersonBaseInfoForm person={personFetched && person} mode={mode} /> }</>) }
        </>
    )
}

const familyStatus = [
    { value: "Женат/замужем", label: "Женат/замужем"},
    { value: "Холост/не замужем", label: "Холост/не замужем"},
    { value: "Разведен/разведена", label: "Разведен/разведена"},
    { value: "Вдовец/вдова", label: "Вдовец/вдова"}
]

const PersonBaseInfoForm = ({ person, mode, parentId }) => {
    const { id } = useParams()
    const { next } = useMultitab()
    const { eventIdentifier } = useRelations()
    const navigate = useNavigate()

    const methods = useForm ({
        defaultValues: person != null ? person.mainInfo : person
    })
    
    const countries = useAllCountries()
    const addPersonBaseInfo = useAddPerson()
    const updatePersonBaseInfo = useUpdatePerson()

    const onSubmit = methods.handleSubmit(data => {
        data.event_identifier = eventIdentifier 

        let formData = new FormData()

        data.identity_card_files != null ? addFilesToFormData(formData, data.identity_card_files, "identity_card_files") : null
        data.application_files != null ? addFilesToFormData(formData, data.application_files, "application_files") : null
        data.questionary_files != null ? addFilesToFormData(formData, data.questionary_files, "questionary_files") : null
        data.additional_files != null ? addFilesToFormData(formData, data.additional_files, "additional_files") : null

        formData.append("event_identifier", eventIdentifier)
        formData.append("last_name", data.last_name != null ? data.last_name : null)
        formData.append("first_name", data.first_name != null ? data.first_name : null)
        formData.append("middle_name", data.middle_name != null ? data.middle_name : null)
        formData.append("birthplace", data.birthplace != null ? data.birthplace : null)
        formData.append("birthdate", data.birthdate != null ? data.birthdate : null)
        formData.append("identification", data.identification != null ? data.identification : null)
        formData.append("iin", data.iin != null ? data.iin : null)
        formData.append("citizenship", data.citizenship != null ? data.citizenship : null)
        formData.append("family_status", data.family_status != null ? data.family_status : null)
        formData.append("phone_number", data.phone_number != null ? data.phone_number : null)
        formData.append("legal_address", data.legal_address != null ? data.legal_address : null)
        formData.append("actual_address", data.actual_address != null ? data.actual_address : null)
        formData.append("identifier", id)

        
        try {
            if (person != null) {
              
                updatePersonBaseInfo.mutate(formData, {
                    onSuccess: () => {
                        next()
                        showSuccess('Анкетные данные по лицу обновлены')
                    },
                    onError: () => {
                        showError("Не удалось обновить анкетные данные")
                    }
                })
            }
            else {
                addPersonBaseInfo.mutate(formData, {
                    onSuccess: (response) => {
                        navigate(`/persons/${response.data}`)
                        next()
                        showSuccess('Анкетные данные по лицу добавлены')
                    },
                    onError: () => {
                        showError("Не удалось добавить анкетные данные")
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

    return (
        <Layout
            style={{
                marginTop: "20px", padding: "20px", borderRadius: "10px"
            }}
        >
            <form
                onReset={methods.reset}
            >
                <Space align="top">
                    <Space direction="vertical">
                        <Input
                            type="text"
                            name="last_name"
                            label="Фамилия"
                            placeholder="Заполните фамилию"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести фамилию"
                            }}
                            required
                        />  
                        <Input
                            type="text"
                            name="first_name"
                            label="Имя"
                            placeholder="Заполните Имя"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести имя"
                            }}
                            required
                        />            
                        <Input
                            type="text"
                            name="middle_name"
                            label="Отчество"
                            placeholder="Заполните отчество"
                            register={methods.register}
                        /> 
                        <DatePickerAntd 
                            name="birthdate"
                            rules={{ required: "required" }}
                            control={methods.control}
                            placeholder="Выберите дату рождения"
                            label="Дата рождения"
                        />
                        <Input
                            type="text"
                            name="birthplace"
                            label="Место рождения"
                            placeholder="Заполните место рождения"
                            register={methods.register}
                        />
                        <SelectAntd
                            name="family_status"
                            placeholder="Выберите статус"
                            label="Семейное положение"
                            control={methods.control}
                            options={familyStatus}
                        />

                        <Space style={{ marginTop: "20px" }}>
                            {mode === "add" ? 
                                <Button onClick={onSubmit} type="primary">Сохранить</Button> 
                                    : 
                                    <>
                                        {/* <Button onClick={next} type="primary">Перейти</Button>  */}
                                        <Button onClick={onSubmit} type="primary">Обновить</Button> 
                                    </>
                            }
                        </Space>
                    </Space>

                    <Space direction="vertical">
                        <Input
                            type="text"
                            name="identification"
                            label="Документ, удостоверяющий личность"
                            placeholder="Заполните документ, удостоверяющий личность"
                            errors={methods.errors}
                            register={methods.register}
                        />
                 
                        <Input
                            type="text"
                            name="iin"
                            label="ИИН"
                            placeholder="Заполните ИИН"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести ИИН",
                                minLength: {
                                    value: 12,
                                    message: "Количество символов должно быть равным 12",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Количество символов должно быть равным 12",
                                }
                            }}
                        />
                        
                        <SelectAntd
                            name="citizenship"
                            placeholder="Выберите страну"
                            label="Гражданство"
                            control={methods.control}
                            options={countries != null ? countries.data : null }
                        />
                        <Input
                            type="text"
                            name="phone_number"
                            label="Телефонный номер"
                            placeholder="Заполните телефонный номер"
                            errors={methods.errors}
                            register={methods.register}
                        />
                        <Input
                            type="text"
                            name="legal_address"
                            label="Адрес прописки"
                            placeholder="Заполните адрес прописки"
                            errors={methods.errors}
                            register={methods.register}
                        />
                        <Input
                            type="text"
                            name="actual_address"
                            label="Адрес фактического проживания"
                            placeholder="Заполните адрес фактического проживания"
                            errors={methods.errors}
                            register={methods.register}
                        />

                    </Space>

                    <Space direction="vertical" align="start">
                        <Title level={4}>Вложения</Title>
                
                        <Controller
                            name="identity_card_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput
                                    name="identity_card_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(person, "identity_card")}
                                    label="Вложите удостоверение"
                                />
                            )}
                        />
                        <Controller
                            name="application_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput
                                    name="application_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(person, "application")}
                                    label="Вложите заявление"
                                />
                            )}
                        />
                        <Controller
                            name="questionary_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput
                                    name="questionary_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(person, "questionary")}
                                    label="Вложите анкету"
                                />
                            )}
                        />
                        <Controller
                            name="additional_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput
                                    name="additional_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(person, "additional")}
                                    label="Дополнительные вложения"
                                />
                            )}
                        />
                    </Space>
                </Space>
            </form>
        </Layout>
    )
}