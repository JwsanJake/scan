import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { usePersonById, useAllCountries } from "@/Queries/Person"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAddPerson } from "@/Mutators/Person/mutators"
import { 
    useAddCompanyOwner, 
    useAddCompanyDirector, 
    useAddCompanyAffiliations 
} from "@/Mutators/Company/mutators"
import { Input } from "@/shared/components/Input"
import SelectAntd from "@/shared/components/Select"
import DatePickerAntd from "@/shared/components/DatePicker"
import { Spin, Button, Select, Layout, Space, Typography } from "antd"
const { Text, Title } = Typography
import { useMultitab } from "@/shared/hooks/useMultitab"
import { showSuccess, showError } from "@/utils/toast"
import FilesInput from "@/shared/components/FilesInput"
import { filterArray } from "@/utils/filterFiles"

const familyStatus = [
    { value: "Женат/замужем", label: "Женат/замужем"},
    { value: "Холост/не замужем", label: "Холост/не замужем"},
]

export const OwnerBaseInfoPage = ({ identifier, mode, affiliationType }) => {

    const {
        data : person,
        isFetched : personFetched,
        isFetching : personFetching,
    } = usePersonById(identifier)


    return (
        <>
            {mode === 'add' ?
                (<OwnerBaseInfoForm mode={mode} affiliationType={affiliationType}/>)
                : (<> {personFetching
                ? <Spin/>
                : <OwnerBaseInfoForm owner={personFetched && person} mode={mode} affiliationType={affiliationType}/>} </>
                )}
        </>
    )
}

const OwnerBaseInfoForm = ({ owner = null, mode, parentId, affiliationType }) => {
    const { id } = useParams()
    const { next } = useMultitab()
    const navigate = useNavigate()

    const methods = useForm ({
        defaultValues: owner != null ? owner.mainInfo : owner
    })

    const countries = useAllCountries()
    const addPersonBaseInfo = useAddPerson()
    const addCompanyOwner = useAddCompanyOwner()
    const addCompanyDirector = useAddCompanyDirector()
    const addCompanyAffiliated = useAddCompanyAffiliations()


    const onSubmit = methods.handleSubmit(data => {
        let formData = new FormData()

        data.additional_files != null ? addFilesToFormData(formData, data.additional_files, "additional_files") : null

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


        try {
            addPersonBaseInfo.mutate(formData, {
                onSuccess: (response) => {
                    data.identifier = id
                    data.parentId = response.data
                    // console.log(id)
                    // console.log(response.data)
                    if (affiliationType === 'director') {
                        addCompanyDirector.mutate(data)
                        navigate(`/companies/${id}/director/${response.data}`)
                        next()
                    }
                    if (affiliationType === 'owner') {
                        addCompanyOwner.mutate(data)
                        navigate(`/companies/${id}/owner/${response.data}`)
                        next()
                    }
                    if (affiliationType === 'affiliated') {
                        addCompanyAffiliated.mutate(data)
                        navigate(`/companies/${id}/affiliated/${response.data}`)
                        next()
                    }
                    showSuccess('Установочные данные по собственнику добавлены')
                },
                onError: () => {
                    showError('Не удалось добавить установочные данные')
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    return (
        <Layout style={{ marginTop: "20px", padding: "20px", borderRadius: "20px" }}>
            <form
                onReset={methods.reset}
            >
                    <Space>
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

                            <Space>
                                {mode === "add" ?
                                    <Button onClick={onSubmit} type="primary">Сохранить</Button>
                                    :
                                    <Button onClick={next} type="primary">Перейти</Button>
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
                            />
                            <SelectAntd
                                name="citizenship"
                                placeholder="Выберите страну"
                                label="Гражданство"
                                control={methods.control}
                                options={ countries != null ? countries.data : null }
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
                            <div>
                                <Controller
                                    name="additional_files"
                                    control={methods.control}
                                    render={({ field }) => (
                                        <FilesInput
                                            name="additional_files"
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(owner, "additional")}
                                            label="Дополнительные вложения"
                                        />
                                    )}
                                />
                            </div>
                        </Space>
                        
                    </Space>
                
                    
        
            </form>
        </Layout>
    )
}