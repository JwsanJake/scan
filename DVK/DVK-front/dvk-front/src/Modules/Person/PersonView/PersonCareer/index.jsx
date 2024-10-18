import { useParams } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { usePersonCareer } from "@/Queries/Person"
import { columns } from "../../PersonMultiForm/PersonCareerPage/Columns"
import { Table, Spin } from "antd"
import { filterArray } from "@/utils/filterFiles"
import FilesInputView from "@/shared/components/FilesInputView"

export const PersonCareer = () => {
    const { id } = useParams()
    const { data: career, isFetching: careerFetching } = usePersonCareer(id)

    const car = career === undefined || career === '' || Object.keys(career).length == 0 ? null : career
    console.log(career)
    return (
        <>
            {careerFetching
                ? <Spin/>
                : <PersonCareerView career={car} />
            }
        </>
    )
}

const PersonCareerView = ({ career }) => {
    const methods = useForm ({
        defaultValues: career != null ? career.mainInfo : career
    })

    return (
        <>
            <Table 
                columns={columns} 
                dataSource={career != null ? career.mainInfo : []}
            />

{/* <FilesInputView
                        name="career_files"
                        onChange={(e) => handleFileEvent(e, field)}
                        files={filterArray(career, "career")}
                    /> */}


                    <FilesInputView
                        name="career_files"
                        onChange={(e) => handleFileEvent(e, field)}
                        files={filterArray(career, "career")}
                    />
        </>
    )
} 