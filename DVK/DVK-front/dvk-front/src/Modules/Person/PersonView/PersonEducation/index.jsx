import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { usePersonEducationByID } from "@/Queries/Person"
import { Table, Spin } from "antd"
import { columns } from "../../PersonMultiForm/PersonEducationPage/Columns"
import FilesInput from "@/shared/components/FilesInput"
import { filterArray } from "@/utils/filterFiles"
import FilesInputView from "@/shared/components/FilesInputView"


export const PersonEducation = () => {
    const { id } = useParams()
    const { 
        data : education, 
        isFetching : educationFetching
    } = usePersonEducationByID(id)

    const edu = education === undefined || education === '' || Object.keys(education).length == 0 ? null : education

    return (
        <>
            {educationFetching 
                ? <Spin/>
                : <PersonEducationView education={education} />
            }
        </>
    )
}

const PersonEducationView = ({ education = null }) => {
    const methods = useForm ({
        defaultValues: education != null ? education.mainInfo : education
    })
    return (
        <>
            <Table 
                columns={columns}
                dataSource={education != null ? education.mainInfo : education}
            />
            <Controller 
                name="education_files"
                control={methods.control}
                render={({ field }) => (
                    <FilesInputView
                        name="education_files"
                        onChange={(e) => handleFileEvent(e, field)}
                        files={filterArray(education, "education")}
                    />
                )}
            />
        </>
    )
}