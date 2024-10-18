import { useState } from "react"
import { useParams } from "react-router-dom"
import PersonFamilyModal from "./PersonFamilyModal"
import { usePersonFamilyMember } from "@/Queries/Person"
import { mapFamilyMember } from "@/Mappers/Person/mapper"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { Table, Space, Button } from "antd"
import { columns } from "./Columns"


export const PersonFamilyStatusPage = () => {
    const { id } = useParams()
    const { data: familyStatus, isFetched: familyStatusFetched } = usePersonFamilyMember(id)

    return (
        <>
            <PersonFamilyStatusForm familyMembers={familyStatusFetched ? familyStatus : null}/>
        </>
    )
}

const PersonFamilyStatusForm = ({ familyMembers = null }) => {
    const { next, prev } = useMultitab()

    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [currentMember, setCurrentMember] = useState(null)

    const addFamilyMember = () => {
        setAddModal(true)
    }

    const editPersonFamilyMembers = (record) => {
        setCurrentMember(record)
        setEditModal(true)
    }


    return (
        <>
            <Button onClick={addFamilyMember}>Добавить члена семьи</Button>
            <Table 
                columns={columns} 
                dataSource={familyMembers != null ? familyMembers : []}
                style={{ marginTop: "15px" }}
                onRow={(record) => {
                    return {
                        onClick: event => editPersonFamilyMembers(record)
                    }
                }}
            />
            <Space style={{ marginTop: "30px" }}>
                <Button onClick={prev} type="primary">Назад</Button> 
                <Button onClick={next} type="primary">Перейти</Button> 
            </Space>

            {addModal && (
                <PersonFamilyModal 
                    onClose={() => setAddModal(false)}
                />
            )}

            {editModal && (
                <PersonFamilyModal 
                    familyMember={mapFamilyMember(currentMember)}
                    onClose={() => setEditModal(false)}
                />
            )}
        </>
    )
}