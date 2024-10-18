import { useState } from "react"
import { UploadContainer, StyledInput, FileWrapper, FileAttach, FileText } from "./Styles"
import { UploadOutlined, FileOutlined, DeleteOutlined } from '@ant-design/icons'
import { clearUploadInput, uploadMultipleFiles, deleteFilesFromUploaded } from "@/utils/formData"
import { Space } from "antd"
import { useMutation, useQueryClient } from "react-query"
import { api } from "@/utils/api"

const FilesInputView = ({ name, onChange, files }) => {
    const [uploadedFiles, setUploadedFiles] = useState(files != null ? files : [])

    const downloadMutation = useMutation({
        mutationFn: (download) => {
            return api.post(`/file/downloadFiles?filename=${download}`,  { responseType : "blob"})
        },
    })


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

    return (
        <Space>
            {uploadedFiles.map((file) => (
                <FileAttach key={file.name}>
                    <FileOutlined style={{ fontSize: "18px"}}/>
                    <FileText onClick={() => onDownload(file.name)}>{file.name}</FileText>
                </FileAttach>
            ))}
        </Space>
    )
}
export default FilesInputView