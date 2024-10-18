import React, { useState } from "react"

import { useForm, Controller } from "react-hook-form"
import { usePersonById, useAllCountries } from "@/Queries/Person"
import { useAddPerson } from "@/Mutators/Person/mutators"
import { Space, Button, Typography } from "antd"
const { Title } = Typography
import { Input } from "@/shared/components/Input"
import DatePickerAntd from "@/shared/components/DatePicker"
import SelectAntd from "@/shared/components/Select"
import FilesInput from "@/shared/components/FilesInput"
import { filterArray } from "@/utils/filterFiles"


const familyStatus = [
    { value: "Женат/замужем", label: "Женат/замужем"},
    { value: "Холост/не замужем", label: "Холост/не замужем"},
    { value: "Разведен/разведена", label: "Разведен/разведена"},
    { value: "Вдовец/вдова", label: "Вдовец/вдова"}
]

const PersonCreateModal = () => {

    const methods = useForm()

    const countries = useAllCountries()
    const addPersonBaseInfo = useAddPerson()

    const onSubmit = () => {
        let formData = new FormData()

        data.identity_card_files != null ? addFilesToFormData(formData, data.identity_card_files, "identity_card_files") : null
        data.application_files != null ? addFilesToFormData(formData, data.application_files, "application_files") : null
        //data.questionary_files != null ? addFiles

        formData.append("identifier")
        formData.append("last_name", data.last_name != null ? data.last_name : null)
        formData.append("first_name", data.first_name != null ? data.first_name : null)
        formData.append("middle_name", data.middle_name != null ? data.middle_name : null)
        formData.append("birthplace", data.birthplace != null ? data.birthplace : null)
        formData.append("birthdate", data.birthdate != null ? data.birthdate : null)
        formData.append("identification", data.identification != null ? data.identification : null)
        formData.append("iin", data.iin != null ? data.iin : null)
        formData.append("citizenship", data.citizenship)

        try {
            addPersonBaseInfo.mutate(formData, {
                onSuccess: (response) => {
                    
                },
                onError: () => {
                    showError("Не удалось добавить анкетные данные")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    }

    const handleFileEvent = (files, field) => {
        field.onChange(files)
    }


    return (
        <>
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
                                requied: "Необходимо ввести фамилию"
                            }}
                            requied
                        />
                        <Input 
                            type="text"
                            name="first_name"
                            label="Имя"
                            placeholder="Заполните имя"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести имя"
                            }}
                            requied
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

                        <Space>
                            <Button onClick={onSubmit} type="primary">
                                Сохранить
                            </Button>
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
                                    message: "Количество символов должно быть равным 12"
                                }
                            }}
                        />
                        <SelectAntd 
                            name="citizenship"
                            placeholder="Выберите страну"
                            label="Гражданство"
                            control={methods.control}
                            options={countries != null ? countries.data : null}
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

                    <Space direction="vertical">
                        <Title level={4} style={{ marginLeft: "15px" }}>Вложения</Title>
                        <Controller 
                            name="identity_card_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput
                                    name="identity_card_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(null, "identity_card")}
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
                                    files={filterArray(null, "application")}
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
                                    files={filterArray(null, "questionary")}
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
                                    files={filterArray(null, "additional")}
                                    label="Дополнительные вложения"  
                                />
                            )}
                        />
                    </Space>
                </Space>
            </form>
        </>
    )
}
export default PersonCreateModal