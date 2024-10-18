import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useCompanyOwnersById } from "@/Queries/Company"
import  OwnerModal  from "./OwnerModal"
import { useMultitab } from "@/shared/hooks/useMultitab"
import { Table, Space, Button } from "antd"
import { columns } from "./Columns"
import moment from "moment"


export const CompanyOwnersPage = () => {
    const { id } = useParams()

    const { data : owners, isFetched : ownersFetched } = useCompanyOwnersById(id)

    return (
        <>
            <CompanyOwnersForm owners={ownersFetched ? owners : null} /> 
        </>
    )
}


const CompanyOwnersForm = ({ owners = null }) => {
    const { id } = useParams()
    const { next, prev, addParent, addAffType } = useMultitab()
    const { eventIdentifier } = useRelations()
    
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)

    const addCompany = () => {
        addParent(id)
        addAffType(1)
        prev()
		navigate(`/companies/add`)
	}

    const addPerson = () => {
        navigate(`/companies/${id}/owner/add`)
    }

    const onModalClose = () => {
		setModalOpen(false)
	}

    // const ff  = owners.map((item) => {
    //     console.log(item)
    //     let date = new Date(item.affiliation_detect_date)
    //     item.affiliation_detect_date_ = moment(date).format("DD-MM-YYYY")
    // })


    return (
        <>
            <Space style={{ marginTop: "20px" }}>
                <Button onClick={addCompany}>+ Добавить компанию</Button>
                <Button onClick={addPerson}>+ Добавить лицо</Button>
                <Button onClick={() => setModalOpen(true)} type="primary">Поиск из базы</Button>
            </Space>
            <Table 
                columns={columns} 
                dataSource={owners != null ? owners : []}
                style={{ marginTop: "20px" }}
                onRow={(record) => {
                    console.log(record)
                    return {
                        onClick: event => navigate(`/companies/${id}/owner/${record.identifier}`)
                    }
                }}
            />
            <Space>
                <Button onClick={prev} type="primary">Назад</Button>
                <Button onClick={next} type="primary">Перейти</Button>
            </Space>
            
            {isModalOpen && (
				<OwnerModal
					isOpen={isModalOpen}
					onClose={onModalClose}
				/>
			)}
        </>
    )
}
export default CompanyOwnersForm



