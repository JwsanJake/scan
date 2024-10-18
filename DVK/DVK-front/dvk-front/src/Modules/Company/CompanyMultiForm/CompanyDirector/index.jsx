import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DirectorModal from "./DirectorModal"
import { useCompanyDirector } from "@/Queries/Company"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { Table, Space, Button } from "antd"
import { columns } from "../CompanyOwnersForm/Columns"

export const CompanyDirectorPage = () => {
    const { id } = useParams()

    const { 
        data: director,
        isFetched: directorFetched,
    } = useCompanyDirector(id)
    
    return (
        <>
            {directorFetched && <CompanyDirector director={director}/> }
        </>
    )
}


const CompanyDirector = ({ director = null }) => {
    const { id } = useParams()
    const { next, prev } = useMultitab()
    const [isModalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()

    const onModalClose = () => {
		setModalOpen(false)
	}

    const addPerson = () => {
        navigate(`/companies/${id}/director/add`)
    }

    return (
        <>
            <Space style={{ marginTop: "20px" }}>
                <Button onClick={addPerson}>+ Добавить руководителя</Button>
                <Button onClick={() => setModalOpen(true)} type="primary"> Поиск из базы</Button>
            </Space>
            <Table 
                columns={columns} 
                dataSource={director != null ? director : []}
                style={{ marginTop: "20px" }}
                onRow={(record) => {
                    console.log(record)
                    return {
                        onClick: event => navigate(`/companies/${id}/director/${record.identifier}`)
                    }
                }}
            />
            <Button onClick={prev} type="primary">Назад</Button>
            <Button onClick={next} type="primary">{director != null ? 'Перейти' : 'Сохранить'}</Button>
         

            {isModalOpen && (
				<DirectorModal
					onClose={onModalClose}
				/>
			)}
        </>
    )
}