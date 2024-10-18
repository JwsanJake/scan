import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCompanyAffiliated } from "@/Queries/Company"
import { useMultitab } from "@/shared/hooks/useMultitab"
import AffiliationModal from "./AffiliationModal"
import { Table, Space, Button } from "antd"
import { columns } from "./Columns"


export const CompanyAffiliationsPage = () => {
    const { id } = useParams()

    const {
        data: affiliations,
        isFetched: affiliationsFetched,
    } = useCompanyAffiliated(id)

    return (
        <CompanyAffiliations affiliations={affiliationsFetched ? affiliations : null}/>
    )
}


const CompanyAffiliations = ({ affiliations = null}) => {
    const { id } = useParams()
    const { next, prev, addParent, addAffType, reset : resetPage } = useMultitab()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isUpdateModalOpen, setUpdateModal] = useState(false)
    const navigate = useNavigate()

    const onModalClose = () => {
        setModalOpen(false)
    }

    const onPrev = () => {
        prev()
    }

    const addCompany = () => {
        addAffType(2)
        addParent(id)
        
        resetPage()
        navigate('/companies/add')
    }

    const addPerson = () => {
        navigate(`/companies/add`)
    }

    return (
        <>
            <Space>
                <Button onClick={addCompany}>+ Добавить аффилированную организацию</Button>
                <Button onClick={addPerson}>+ Добавить аффилированное лицо</Button>
                <Button onClick={() => setModalOpen(true)} type="primary">Поиск из базы</Button>
            </Space>

            <Table 
                columns={columns} 
                dataSource={affiliations != null ? affiliations : []}
                style={{ marginTop: "20px" }}
                onRow={(record) => {
                    return {
                        onClick: event => setUpdateModal(true)
                    }
                }}
            />
    
            <Button onClick={onPrev} type="primary">Назад</Button>
            <Button onClick={next} type="primary">Перейти</Button>
      
            {isModalOpen && (
                <AffiliationModal 
                    onClose={onModalClose}
                />
            )}

            {

            }
        </>
    )
}
export default CompanyAffiliations
