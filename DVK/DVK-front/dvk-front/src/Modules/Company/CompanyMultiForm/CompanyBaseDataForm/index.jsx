import { useForm, Controller } from "react-hook-form"
import React, { useState } from "react"
import { Input } from "@/shared/components/Input"
import { useAddCompanyBaseInfo, useAddCompanyOwner, useUpdateCompanyBaseInfo } from "@/Mutators/Company/mutators"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useCompanyById } from "@/Queries/Company"
import { useRelations } from "@/shared/hooks/useRelations"
import DatePickerAntd from "@/shared/components/DatePicker"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { showSuccess, showError } from "@/utils/toast"
import { Button, Layout, Flex, Switch, Typography, Spin, Space, Tag, Radio } from "antd"
const { Text, Title } = Typography
import { StyledInput } from "@/shared/components/Input/Styles"
import FilesInput from "@/shared/components/FilesInput"
import { addFilesToFormData } from "@/utils/formData"
import { CloseCircleOutlined } from '@ant-design/icons'
import styled from "styled-components"
import { filterArray } from "@/utils/filterFiles"


export const CompanyBaseInfoPage = () => {
    const { id } = useParams()
    const mode = id  ? 'edit' : 'add'

    const { 
        data : company, 
        isFetching : companyFetching,
    } = useCompanyById(id)


    return (
        <>
            {mode === 'add' ? 
                (<CompanyBaseDataForm mode={mode}/>) 
                : ( <> {companyFetching  
                ? <Spin/> 
                : 
                <CompanyBaseDataForm 
                    company={company}   
                    mode={mode}
                /> 
                }</>) }
        </>
    )
}


const CompanyBaseDataForm = ({ company = null, mode = 'add' }) => {
    const { next, parentIds, affiliationType } = useMultitab()
    const  { eventIdentifier }  = useRelations()

    const { id } = useParams()
    const navigate = useNavigate()
    const [isForeign, setIsForeign] = useState(false)
    const [activity, setActivity] = useState(mode === 'add' ? [] : (company.activities != null  ? company.activities : []))
    const [license, setLicense] = useState(mode === 'add' ? [] : (company.licenses != null  ? company.licenses : []))
    const [inputActivity, setInputActivity] = useState(null)
    const [inputLicense, setInputLicense] = useState(null)
    const [isManufacture, setIsManufacture] = useState(company != null ? company.mainInfo.manufacture : false)
    const [isDealer, setIsDealer] = useState(company != null ? company.mainInfo.dealer : false )

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {errors}
    } = useForm({
        defaultValues: mode === 'add' ? null : company.mainInfo
    })

    const addCompanyBaseInfo = useAddCompanyBaseInfo()
    const updateCompanyBaseInfo = useUpdateCompanyBaseInfo()
    const addCompanyOwner = useAddCompanyOwner()

    const addOwnerAffiliation = (identifier) => {
        if (parentIds != []) {
            let data = {}
            data.identifier = identifier
            data.parentId = parentIds.slice(-1)[0]
            data.affType = affiliationType
            addCompanyOwner.mutate(data)
        }
    }

    const onSubmit = handleSubmit(data => {
                
        let formData = new FormData()

        if(activity.length > 0) {

            activity.forEach((item, index )=> {
                formData.append(`kindOfActivities[${index}].activity_name`, item.activity_name)
            })
        }

        if(license.length > 0) {

            license.forEach((item, index )=> {
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

        if (parentIds.length == 0) {
            formData.append("event_identifier", eventIdentifier)
        }
       
        formData.append("company_title", data.company_title)

        if (isForeign === true ){
            formData.append("bin", data.iin)
        }
        if (isForeign === false){
            formData.append("bin", data.bin)
        }
        
        formData.append("legal_address", data.legal_address)
        formData.append("actual_address", data.actual_address)
        formData.append("first_registration_date", data.first_registration_date != null ? data.first_registration_date : null)
        formData.append("last_registration_date", data.last_registration_date != null ? data.last_registration_date : null)
        formData.append("is_manufacture", isManufacture === false ? 1 : 0)
        formData.append("is_dealer", isDealer === false ? 1 : 0)

        if (mode === "edit") {
            formData.append("identifier", id)
        }

        if (mode === "add") {
            try {
                addCompanyBaseInfo.mutate(formData, {
                    onSuccess: (response) => {
                        next(response.data)
                        addOwnerAffiliation(response.data)
                        navigate(`/companies/${response.data}`)
                        showSuccess("Установочные данные компании добавлены")
                    },
                    onError: () => {
                        showError("Не удалось добавить установочные данные")
                    },
                })
            }
            catch (error) {
                showError(error)
            }
        }
        else {
            try {
                updateCompanyBaseInfo.mutate(formData, {
                    onSuccess: () => {
                        next()
                        navigate(`/companies/${id}`)
                        showSuccess("Установочные данные компании обновлены")
                    },
                    onError: () => {
                        showError("Не удалось обновить установочные данные")
                    },
                })
            }
            catch (error) {
                showError(error)
            }
        }
       
    })

    const onChange = (checked) => {
        setIsForeign(checked)
    }

    const addActivity = (e) => {
 
        if (e.key === "Enter") {
            setActivity(prevActivity => [...prevActivity, { activity_name : e.target.value}])
            setInputActivity(null)
        }
    }

    const addLicense = (e) => {
        
        if (e.key === "Enter") {
            setLicense(prevLicense => [...prevLicense, { license_name : e.target.value}])
            setInputLicense(null)
        }
    }

    const deleteActivity = (item) => {
        const arr = activity
        // const foundItem = arr.find((arrItem) => arrItem.id === item.id)

        // arr.splice(foundItem, 1)
        // setActivity(arr)

        setActivity(arr.filter((arrItem) => arrItem.id !== item.id))
    }

    const deleteLicense = (item) => {
        const arr = license

        setLicense(arr.filter((arrItem) => arrItem.id !== item.id))
    }

    const onManufacture = (item) => {
        setIsManufacture(item)
    }

    const onDealer = (item) => {
        setIsDealer(item)
    }

    const handleFileEvent = (file, field) => {
        field.onChange(file)
    }

    return (
        <Layout style={{ marginTop: "5px", padding: "20px", borderRadius: "15px" }}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                onReset={reset}
            >   
                <Space>
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
                        <Space direction="vertical">
                            <Text>Компания не из Казахстана</Text>
                            <Switch defaultChecked={isForeign} onChange={onChange} />
                        </Space>
                        
                        <Space>
                            {isForeign === false ? (<>
                                <Input 
                                    type="type"
                                    name="bin"
                                    label="БИН"
                                    placeholder="Введите БИН организации"
                                    errors={errors}
                                    register={register}
                                    validationSchema={{
                                        required: "Необходимо ввести БИН организации",
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
                            </>)
                            : (<>
                                <Input 
                                    type="type"
                                    name="iin"
                                    label="Идентификационный номер"
                                    placeholder="Введите идентификационный номер организации"
                                    errors={errors}
                                    register={register}
                                    validationSchema={{
                                        required: "Необходимо ввести идентификационный номер организации",
                                    }}
                                />
                            </>)}
                        
                        </Space>
                        
                        <Input 
                            type="text"
                            name="legal_address"
                            label="Юридический адрес"
                            placeholder="Введите юридический адрес"
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
                            width={"300px"}
                        />
                        
                        <DatePickerAntd 
                            name="last_registration_date"
                            label="Дата последней регистрации"
                            placeholder="Введите дату последней регистрации"
                            control={control}
                            width={"300px"}
                        />

                        <Space style={{ marginTop: "20px"}}>
                            {mode === "add" ? 
                                <Button onClick={onSubmit} type="primary">Сохранить</Button> 
                                : 
                                <>
                                    {/* <Button onClick={onSubmit} type="primary">Обновить данные</Button> */}
                                    <Button onClick={next} type="primary">Перейти</Button> 
                                </>
                            }
                        </Space>
                    </Space>

                    <Space direction="vertical">
                        <Text>Виды деятельности</Text>
                        <Space.Compact style={{ width: '100%' }}>
                            <StyledInput 
                                value={inputActivity} 
                                onKeyDown={(e) => addActivity(e)} 
                                onChange={(e) => setInputActivity(e.target.value)}
                            />
                        </Space.Compact>
                        
                        <Space direction="vertical" style={{ marginTop: "15px"}}>
                            {activity.length > 0 && 
                                activity.map(function(item) {
                                    return (
                                        <TagContainerGreen key={item}>
                                            {item.activity_name}
                                            <CloseCircleOutlined onClick={() => deleteActivity(item)}/>
                                        </TagContainerGreen>
                                    )
                                })
                            }
                        </Space>

                        <Space direction="vertical" style={{ marginTop: "15px"}}>
                            Лицензии
                            <Space.Compact style={{ width: '100%' }}>
                                <StyledInput 
                                    value={inputLicense} 
                                    onKeyDown={(e) => addLicense(e)} 
                                    onChange={(e) => setInputLicense(e.target.value)}
                                />
                            </Space.Compact>

                            <Space direction="vertical" style={{ marginTop: "15px"}}> 
                            {license.length > 0 &&
                                license.map(function(item) {
                           
                                    return (
                                        <TagContainer key={item}
                                            //onClick={() => deleteLicense(item)}
                                        >
                                            {item.license_name}
                                            <CloseCircleOutlined onClick={() => deleteLicense(item)}/>
                                        </TagContainer>
                                    )
                                })
                            }
                            </Space>
                        </Space>
                        
                        <Space direction="vertical" style={{ marginTop: "20px"}}>
                            <Space direction="vertical">
                                <Text strong>Наличие статуса завода-изготовителя</Text>
                                <Switch defaultChecked={isManufacture} onChange={onManufacture}/>

                                <Controller 
                                    name="manufacture_doc_files"
                                    control={control}
                                    defaultValue={{}}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="manufacture_doc_files" 
                                            onChange={(e) => handleFileEvent(e, field)}
                                            files={filterArray(company, "manufacture")}
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
                                    defaultValue={{}}
                                    render={({ field }) => (
                                        <FilesInput 
                                            name="dealer_doc_files" 
                                            onChange={(e) => handleFileEvent(e, field)} 
                                            files={filterArray(company, "dealer")}
                                            label="Вложите документы"
                                        />
                                    )}
                                />
                            </Space>
                        </Space>
                    </Space>

                    <Space direction="vertical">
                        <Title level={4}>Вложения</Title>

                        <Controller
                            name="company_form_files"
                            control={control}
                            render={({ field }) => (
                                <FilesInput
                                    name="company_form_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(company, "company_form")}
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
                                    files={filterArray(company, "constituent")}
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
                                    files={filterArray(company, "reference")}
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
                                    files={filterArray(company, "registration_certificate")}
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
                                    files={filterArray(company, "company_additional")}
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
export default CompanyBaseDataForm


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