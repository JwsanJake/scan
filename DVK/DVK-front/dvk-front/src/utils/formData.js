const checkFileFromPath = (path) => {
    return path instanceof File
}

export const addFileToFormData = (formData, file) => {
    if (checkFileFromPath(file)) {
        formData.append("files[0]", file)
    }

    return formData
}

export const addFilesToFormData = (formData, files, fieldKey) => {
    console.log(files)
    for (let i = 0; i < files.length; i++) {

        if (checkFileFromPath(files[i])) {
            
            formData.append(`${fieldKey}`, files[i])
       
        } else {
            formData.append(`${fieldKey}`, files[i].name)
        }
    }

    return formData
}

export const addFieldsToFormData = (formData, fields, arrayFields) => {
    for (const key in fields) {
        if (fields.hasOwnProperty(key) && !arrayFields.includes(key)) {
            formData.append(key, fields[key])
        }

        if (fields.hasOwnProperty(key) && Array.isArray(fields[key])) {
            formData.delete(key, fields[key])
            fields[key].forEach((value, index) => {
                formData.append(`${key}[${index}]`, value.id)
            })
        }
    }

    return formData
}

//--------

export const uploadMultipleFiles = (files) => {
    if (files.length > 10) {
        return {
            limit: 10,
            status: true,
        }
    }

    return {
        limit: 10,
        status: false
    }
}

export const deleteFilesFromUploaded = (uploaded, file) => {
    const changedFiles = Array.from(uploaded)

    changedFiles.splice(file, 1)

    return changedFiles
}

export const clearUploadInput = (inputEvent) => {
    inputEvent.currentTarget.value = null
}