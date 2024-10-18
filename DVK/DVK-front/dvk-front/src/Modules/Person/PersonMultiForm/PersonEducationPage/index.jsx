import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { usePersonEducationByID } from "@/Queries/Person"
import PersonEducationModal from "./PersonEducationModal"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { mapEducation } from "@/Mappers/Person/mapper"
import FilesInput from "@/shared/components/FilesInput"
import { Space, Button, Table } from "antd"
import { columns } from "./Columns"
import { addFilesToFormData } from "@/utils/formData"
import { useAddEducationDocuments } from "@/Mutators/Person/mutators"
import { showSuccess, showError } from "@/utils/toast"
import { filterArray } from "@/utils/filterFiles"


export const PersonEducationPage = () => {
    const { id } = useParams()
    const { data : education, isFetched : educationFetched } = usePersonEducationByID(id)
 
    const edu = education === undefined || education === '' || Object.keys(education).length == 0 ? null : education
    return (
        <>
            <PersonEducationForm education={educationFetched ? edu : null}/>
        </>
    )
}

const PersonEducationForm = ({ education = null }) => {
    const { id } = useParams() 
    const { next, prev } = useMultitab()
    console.log(education)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [currentEdu, setCurrentEdu] = useState(false)
    const [file, setIsUploaded] = useState(false)

    const methods = useForm ({
        defaultValues: education != null ? education.mainInfo : education
    })

    const addPersonEducation = () => {
        setAddModal(true)
	}

    const editPersonEducation = (record) => {
        setCurrentEdu(record)
        setEditModal(true)
    }

    const addDocuments = useAddEducationDocuments()

    const onSubmit = methods.handleSubmit(data => {

        let formData = new FormData()

        data.education_files != null ? addFilesToFormData(formData, data.education_files, "education_files") : null

        formData.append("identifier", id)

        try {
            addDocuments.mutate(formData, {
                onSuccess: () => {
                    showSuccess("Вложения добавлены")
                },
                onError: () => {
                    showError("Не удалось добавить вложения")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const handleFileEvent = (files, field) => {
        if (files != null) {
            setIsUploaded(true)
        }
        field.onChange(files)
    }
    
    return (
        <>
            <Space>
                <Button onClick={addPersonEducation}>Добавить образование</Button>
            </Space>
            
            <Table 
                columns={columns} 
                dataSource={education != null  ? education.mainInfo : []}
                style={{ marginTop: "15px" }}
                onRow={(record) => {
                    return {
                        onClick: event => editPersonEducation(record)
                    }
                }}
                
            />

            <Space direction="vertical">
            <Space>

            {education != null &&
            <form 
                onReset={methods.reset}
            >
                <Controller 
                    name="education_files"
                    control={methods.control}
                    render={({ field }) => (
                        <FilesInput
                            name="education_files"
                            onChange={(e) => handleFileEvent(e, field)}
                            files={filterArray(education, "education")}
                            label="Вложите документы"
                            //isUpload={true}
                        />
                    )}
                />
            </form>}
            
            {file != false &&
            <Button onClick={onSubmit} type="primary">Сохранить документ</Button>}
            </Space>
          
            <Space style={{ marginTop: "30px"}}>
                <Button onClick={prev} type="primary">Назад</Button>
                <Button onClick={next} type="primary">Перейти</Button> 
            </Space>
            </Space>

            {addModal && (
                <PersonEducationModal 
                    onClose={() => setAddModal(false)}
                />
            )}

            {editModal && (
                <PersonEducationModal 
                    education={mapEducation(currentEdu)}
                    onClose={() => setEditModal(false)}
                />
            )}
        </>
    )
}
