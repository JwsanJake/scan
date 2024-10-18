import { useState } from "react"
import { useParams } from "react-router-dom"
import OwnerAffiliationModal from "./OwnerAffiliationModal"
import { usePersonAffiliations } from "@/Queries/Person"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { Table, Button, Layout } from "antd"
import { columns } from "./Columns"


export const OwnerAffiliationsPage = () => {
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
            <Table columns={columns} dataSource={affiliations != null ? affiliations : []}/>
            <Button onClick={prev} type="primary">Назад</Button>
            <Button onClick={next} type="primary">Перейти</Button>

            {isModalOpen && (
                <OwnerAffiliationModal 
                    onClose={onModalClose}
                />
            )}
        </>
    )
}