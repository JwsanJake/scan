import React, { useState } from "react"
import { clearUploadInput, uploadMultipleFiles, deleteFilesFromUploaded } from "@/utils/formData"
import { convertToShortName } from "@/utils/fileFormat" 

export const useFileUpload = () => {
    

    const handleUploadFiles = (files) => {

        
        const limitExceeded = uploadMultipleFiles(files)

        if (limitExceeded.status) {
            showError(`Максимум вложений из 10`)
        } else {

            files = files.map((file) => {
                const shortName = convertToShortName(file.name)

                return new File([file], shortName)
            }) 
            console.log(files)
            //setUploadedFiles([...uploadedFiles, ...files])
            
        }
        return files

    }

    const deleteFile = (file, files) => {
        const changedFiles = deleteFilesFromUploaded(files, file)

        return changedFiles
    }

    return {  handleUploadFiles, deleteFile }
}