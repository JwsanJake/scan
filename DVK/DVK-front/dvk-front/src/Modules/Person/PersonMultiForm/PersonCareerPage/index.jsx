import { useState } from "react"
import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import PersonCareerModal from "./PersonCareerModal"
import { usePersonCareer } from "@/Queries/Person"
import { mapCareer } from "@/Mappers/Person/mapper"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { Table, Space, Button } from "antd"
import { columns } from "./Columns"
import { addFilesToFormData } from "@/utils/formData"
import { useAddCareerDocuments } from "@/Mutators/Person/mutators"
import FilesInput from "@/shared/components/FilesInput"
import { filterArray } from "@/utils/filterFiles"
import { showSuccess, showError } from "@/utils/toast"


export const PersonCareerPage = () => {
    const { id } = useParams()
    const { data: personCareer, isFetched: personCareerFetched } = usePersonCareer(id)

    return (
        <>
            <PersonCareerForm career={personCareerFetched ? personCareer : null}/>
        </>
    )
}

const PersonCareerForm = ({ career = null }) => {
    const { id } = useParams()
    const { next, prev } = useMultitab()

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [currentCareer, setCurrentCareer] = useState(false)
    const [file, setIsUploaded] = useState(false)

    const methods = useForm()

    const addPersonCareer = () => {
        setAddModal(true)
    }

    const editPersonCareer = (record) => {
        setCurrentCareer(record)
        setEditModal(true)
    }

    const addDocuments = useAddCareerDocuments()

    const onSubmit = methods.handleSubmit(data => {

        let formData = new FormData()

        data.career_files != null ? addFilesToFormData(formData, data.career_files, "career_files") : null

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
            <Button onClick={addPersonCareer}>Добавить место работы</Button>
            <Table 
                columns={columns} 
                dataSource={career != null ? career.mainInfo : []}
                style={{ marginTop: "15px" }}
                onRow={(record) => {
                    return {
                        onClick: event => editPersonCareer(record)
                    }
                }}
            />    

            <Space direction="vertical">
                <Space>
                    {career != null &&
                    <form>
                        <Controller 
                            name="career_files"
                            control={methods.control}
                            render={({ field }) => (
                                <FilesInput
                                    name="career_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(career != null ? career : null, "career")}
                                    label="Вложите документы"
                                    isUpload="true"
                                    queryParam="personCareer"
                                />
                            )}
                        />
                    </form>}

                    {file != false &&
                        <Button onClick={onSubmit} type="primary">Сохранить документ</Button>
                    }
                </Space>
            
            
            <Space style={{ marginTop: "20px" }}>
                <Button onClick={prev} type="primary">Назад</Button>
                <Button onClick={next} type="primary">Перейти</Button>
            </Space> 
            </Space>

            {addModal && (
                <PersonCareerModal 
                    onClose={() => setAddModal(false)}
                />
            )}

            {editModal && (
                <PersonCareerModal 
                    career={mapCareer(currentCareer)}
                    onClose={() => setEditModal(false)}
                />
            )}
        </>
    )
}