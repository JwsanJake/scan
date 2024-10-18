import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { MultipleUploadContainer, StyledInput, FileWrapper, FileAttach, FileText } from "./Styles"
import { UploadOutlined, FileOutlined, DeleteOutlined } from '@ant-design/icons'
import { clearUploadInput, uploadMultipleFiles, deleteFilesFromUploaded } from "@/utils/formData"
import { Flex, Space, Modal, Typography, Button } from "antd"
const { Text } = Typography
const confirm = Modal.confirm
import { useDownloadFiles } from "@/Mutators/Secondary"
import { useMutation, useQueryClient } from "react-query"
import { api } from "@/utils/api"
import { useDeleteFile } from "../../../Mutators/Files/mutator"


const FilesInput = ({ name, onChange, files, label, queryParam }) => {
    const [uploadedFiles, setUploadedFiles] = useState(files != null ? files : [])
    const downloadFile = useDownloadFiles()

    const downloadMutation = useMutation({
        mutationFn: (download) => {
            return api.post(`/File/DownloadFiles?filename=${download}`,  { responseType : "blob"})
        },
    })

    const deleteMutation = useMutation({
        mutationFn: (download) => {
            return api.delete(`/File/deleteFiles?filename=${download}`)
        },
    })

    const deleteFile = useDeleteFile()

    const clearFile = (event) => {
        clearUploadInput(event)
    }

    const onInputChange = (event) => {  
        const files = Array.from(event.target.files)
        setUploadedFiles([...uploadedFiles, ...files])
        onChange(files)
    }

    const onDownload = (filename) => {
        downloadMutation.mutate(filename, {
            onSuccess: (response) => {
                const fileBlob = new Blob([response.data], { type: "application/pdf" })
                const fileURL =  window.URL.createObjectURL(fileBlob)

                let link = document.createElement("a")
                link.href = fileURL
                link.download = filename
                link.click()
            }
        })
    }

    const mutateee = (filename) => {
        //const queryClient = useQueryClient()

                deleteMutation.mutate(filename, {
                    onSuccess: () => {
                        //queryClient.invalidateQueries(`${queryParam}`)
                    }
                })
    }

    const showConfirm = (filename) => {
        confirm({
            title: 'Вы действительно хотите удалить вложение?',
            //content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                
                //mutateee(filename)
                deleteFile.mutate(filename, {
                    onSuccess: () => {

                    }
                })
            },
            onCancel() {},
        })
    }

    return (
        <>
            <Flex style={{ marginLeft: "20px", marginTop: "20px"}}>   
                    <Space>
                        <label htmlFor={name} >
                            <UploadOutlined 
                                style={{ padding: "4px", fontSize: "20px", border: "1px solid #1677FF", borderRadius: "6px", marginRight: "6px"}}
                            />
                            {uploadedFiles.length === 0 && <Text>{label}</Text>}
                        </label>
                        <StyledInput
                            id={name}
                            name={name}
                            type="file"
                            multiple
                            onClick={(e) => clearFile(e)}
                            onChange={(e) => onInputChange(e)}
                        />
                    </Space>
                    <Space>
                        {uploadedFiles.map((file) => (
                            <FileAttach key={file.name}>
                                <FileOutlined style={{ fontSize: "18px"}}/>
                                <Text type="link" onClick={() => onDownload(file.name)}>{file.name}</Text>
                                <DeleteOutlined onClick={() => showConfirm(file.name)} style={{ fontSize: "18px" }}/>
                            </FileAttach>
                        ))}
                        {/* {isUpload === true && uploadedFiles.length > 0 && 
                            <Button type="primary">Сохранить документы</Button>} */}
                    </Space>
            </Flex>
        </>
    )
}
export default FilesInput