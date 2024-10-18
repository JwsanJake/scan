import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Tag, Select, Typography, Button, Flex, Space, Switch } from "antd"
const { Title, Text } = Typography
import { filterArray } from "@/utils/filterFiles"
import DatePickerAntd from "@/shared/components/DatePicker"
import { StyledInput } from "@/shared/components/Input/Styles"
import styled from "styled-components"
import { CloseCircleOutlined } from '@ant-design/icons'
import FilesInput from "@/shared/components/FilesInput"



const CompanyCreateModal = () => {
    const { id } = useParams()

    const {
        handleSubmit,
        control,
        errors,
        reset,
        register
    } = useForm()

    const [activity, setActivity] = useState([])
    const [license, setLicense] = useState([])
    const [inputActivity, setInputActivity] = useState(null)
    const [inputLicense, setInputLicense] = useState(null)
    const [isManufacture, setIsManufacture] = useState(null)
    const [isDealer, setIsDealer] = useState(null)

    const onSubmit = handleSubmit(data => {
        let formData = new FormData()

        if(activity.length > 0) {
            activity.forEach((item, index) => {
                formData.append(`kindOfActivities[${index}].activity_name`, item.activity_name)
            })
        }

        if(license.length > 0) {
            license.forEach((item, index) => {
                formData.append(`licenses[${index}].license_name`, item.license_name)
            })
        }

        data.manufacture_doc_files != null ? addFilesToFormData(formData, data.manufacture_doc_files, "manufacture_doc_files") : null
        data.dealer_doc_files != null ? addFilesToFormData(formData, data.dealer_doc_files, "dealer_doc_files") : null
        data.manufacture_doc_files != null ? addFilesToFormData(formData, data.manufacture_doc_files, "manufacture_doc_files") : null
        data.dealer_doc_files != null ? addFilesToFormData(formData, data.dealer_doc_files, "dealer_doc_files") : null
        data.company_form_files != null ? addFilesToFormData(formData, data.company_form_files, "company_form_files") : null
        data.constituent_files != null ? addFilesToFormData(formData, data.constituent_files, "constituent_files") : null
        data.reference_files != null ? addFilesToFormData(formData, data.reference_files, "reference_files") : null
        data.registration_certificate_files != null ? addFilesToFormData(formData, data.registration_certificate_files, "registration_certificate_files") : null
        data.company_additional_files != null ? addFilesToFormData(formData, data.company_additional_files, "company_additional_files") : null

        formData.append("company_title", data.company_title)

        // if (isForeign === true) {
        //     formData.append("bin", data.iin)
        // }

        // if (isForeign === false){
        //     formData.append("bin", data.bin)
        // }

        formData.append("legal_address", data.legal_address)
        formData.append("actual_address", data.actual_address)
        formData.append("first_registration_date", data.first_registration_date)
        formData.append("last_registration_date", data.last_registration_date)
        formData.append("is_manufacture", isManufacture === false ? 1 : 0)
        formData.append("is_dealer", isDealer === false ? 1 : 0)

        try {
            addCompanyBaseInfo.mutate(formData, {
                onSuccess: () => {
                    showSuccess("Установочные данные компании добавлены")
                },
                onError: () => {
                    showError("Не удалось добавить установочные данные")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const addActivity = (e) => {

        if (e.key === "Enter") {
            setActivity(prevActivity => [...prevActivity, { activity_name : e.target.value }])
            setInputActivity(null)
        }
    }

    const addLicense = (e) => {
        if (e.key === "Enter") {
            setLicense(prevLicense => [...prevLicense, { license_name : e.target.value }])
            setInputLicense(null)
        }
    }

    const deleteActivity = (item) => {
        const arr = activity

        setActivity(arr.filter((arrItem) => arrItem.id !== item.id))
    }

    const deleteLicense = (item) => {
        const arr = license

        setLicense(arr.filter((arrItem) => arrItem.id !== item.id))
    }

    const handleFileEvent = (file, field) => {
        field.onChange(file)
    }

    const onManufacture = (item) => {
        setIsManufacture(item)
    }

    const onDealer = (item) => {
        setIsDealer(item)
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onReset={reset}
            >
                <Space align="top">
                    <Space direction="vertical">
                        <Input 
                            type="text"
                            name="company_title"
                            label="Наименование организации"
                            placeholder="Введите наименование организации"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Необходимо ввести наименование организации"
                            }}
                        />
                        <Input 
                            type="text"
                            name="legal_address"
                            label="Юридический адрес"
                            placeholder="Введите юридический адресс"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Необходимо ввести юридический адрес"
                            }}
                        />
                        <Input 
                            type="text"
                            name="actual_address"
                            label="Фактический адрес"
                            placeholder="Введите фактический адрес"
                            errors={errors}
                            register={register}
                        />
                        <DatePickerAntd
                            name="first_registration_date"
                            label="Дата первичной регистрации"
                            placeholder="Введите дату первичной регистрации"
                            control={control}
                            width="300px"
                        />
                        <DatePickerAntd 
                            name="last_registration_date"
                            label="Дата последней регистрации"
                            placeholder="Введите дату последней регистрации"
                            control={control}
                            width="300px"
                        />

                        <Space style={{ marginTop: "20px" }}>
                            <Button onClick={onSubmit} type="primary">
                                Сохранить
                            </Button>
                        </Space>
                    </Space>

                    <Space direction="vertical">
                        <Text strong>Виды деятельности</Text>
                        <Space.Compact style={{ width: '100%' }}>
                            <StyledInput 
                                value={inputActivity}
                                onKeyDown={(e) => addActivity(e)}
                                onChange={(e) => setInputActivity(e.target.value)}
                                placeholder="Введите и нажмите Enter"
                            />
                        </Space.Compact>

                        <Space direction="vertical" style={{ marginTop: "15px" }}>
                            {activity.length > 0 &&
                                activity.map(function(item) {
                                    return (
                                        <TagContainerGreen>
                                            {item.activity_name}
                                            <CloseCircleOutlined 
                                                onClick={() => deleteActivity(item)}
                                            />
                                        </TagContainerGreen>
                                    )
                                })
                            }
                        </Space>

                        <Space direction="vertical">
                            <Text strong>Лицензии</Text>
                            <Space.Compact style={{ width: '100%' }}>
                                <StyledInput 
                                    value={inputLicense}
                                    onKeyDown={((e) => addLicense(e))}
                                    onChange={(e) => setInputLicense(e.target.value)}
                                    placeholder="Введите и нажмите Enter"
                                />
                            </Space.Compact>

                            <Space direction="vertical">
                                {license.length > 0 &&
                                    license.map(function(item) {

                                        return (
                                            <TagContainer key={item}>
                                                {item.license_name}
                                                <CloseCircleOutlined onClick={() => deleteLicense(item)}/>
                                            </TagContainer>
                                        )
                                    })
                                }
                            </Space>
                        </Space>

                        <Space direction="vertical">
                            <Space direction="vertical">
                                <Text strong>Наличие статуса завода-изготовителя</Text>
                                <Switch 
                                    defaultChecked={isManufacture} 
                                    onChange={onManufacture}
                                />

                                <Controller 
                                    name="manufacture_doc_files"
                                    control={control}
                                    render={({ field }) => (
                                        <FilesInput
                                            name="manufacture_doc_files"
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(null, "manufacture")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Text strong>Наличие дилерства, представительства</Text>
                                <Switch defaultChecked={isDealer} onChange={onDealer}/>

                                <Controller 
                                    name="dealer_doc_files"
                                    control={control}
                                    render={({ field }) => (
                                        <FilesInput
                                            name="dealer_doc_files"
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(null, "dealer")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </Space>
                        </Space>

                        
                    </Space>
                    <Space direction="vertical">

                        <Space direction="vertical">
                            <Title level={4}>Вложения</Title>

                            <Controller 
                                name="company_form_files"
                                control={control}
                                render={({ field }) => (
                                    <FilesInput
                                        name="company_form_files"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(null, "company_form")}
                                        label="Вложите анкету"
                                    />
                                )}
                            />

                            <Controller 
                                name="constituent_files"
                                control={control}
                                render={({ field }) => (
                                    <FilesInput
                                        name="constituent_files"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(null, "constituent")}
                                        label="Вложите учредительные документы"
                                    />
                                )}
                            />

                            <Controller 
                                name="reference_files"
                                control={control}
                                render={({ field }) => (
                                    <FilesInput
                                        name="reference_files"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(null, "reference")}
                                        label="Вложите справки"
                                    />
                                )}
                            />

                            <Controller 
                                name="registration_certificate_files"
                                control={control}
                                render={({ field }) => (
                                    <FilesInput
                                        name="registration_certificate_files"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(null, "registration_certificate")}
                                        label="Вложите свидетельство о регистрации"
                                    />
                                )}
                            />

                            <Controller 
                                name="company_additional_files"
                                control={control}
                                render={({ field }) => (
                                    <FilesInput
                                        name="company_additional_files"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        files={filterArray(null, "company_additional")}
                                        label="Дополнительные вложения"  
                                    />
                                )}
                            />
                        </Space>
                    </Space>
                </Space>
            </form>
        </>
    )
}
export default CompanyCreateModal

const TagContainer = styled.div`
    padding: 5px;
    background-color: #F8C471;
    border: 1px solid black;
    width: auto;
    margin: 5px;
    border-radius: 5px;
`

const TagContainerGreen = styled.div`
    padding: 5px;
    background-color: #28B463;
    border: 1px solid black;
    width: auto;
    margin: 5px;
    border-radius: 5px;
`