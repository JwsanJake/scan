import { useState } from "react"
import { useParams } from "react-router-dom"
import PersonAffiliationModal from "./PersonAffiliationModal"
import { usePersonAffiliations } from "@/Queries/Person"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { Table, Space, Button } from "antd"
import { columns } from "./Columns"



export const PersonAffiliationsPage = () => {
    const { id } = useParams()

    const { 
        data: affiliations, 
        isFetched: affiliationsFetched,
    } = usePersonAffiliations(id)

    return (
        <>
            <PersonAffiliationsForm affiliations={affiliationsFetched ? affiliations : null}/>
        </>
    )
}

const PersonAffiliationsForm = ({ affiliations = null }) => {
    const { next, prev } = useMultitab()
    const [isModalOpen, setModalOpen] = useState(false)

    const addPersonAffiliations = () => {
        setModalOpen(true)
    }

    const onModalClose = () => {
		setModalOpen(false)
	}

    return (
        <>
            <Button onClick={addPersonAffiliations}>Добавить связи</Button>
            <Table 
                columns={columns} 
                dataSource={affiliations != null ? affiliations : []}
                style={{ marginTop: "15px" }}
            />
            <Space style={{ marginTop: "30px" }}>
                <Button onClick={prev} type="primary">Назад</Button> 
                <Button onClick={next} type="primary">Перейти</Button> 
            </Space>

            {isModalOpen && (
                <PersonAffiliationModal 
                    onClose={onModalClose}
                />
            )}
        </>
    )
}
