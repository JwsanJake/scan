import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAllPersons } from "@/Queries/Person"
import PersonReportModal from "./PersonReportModal"
import { useAllPersonsData } from "@/Queries/Person"
import { columns } from "./Columns"
import { Spin, Button, Table, Space, Input, Select } from "antd"
const { Search } = Input
import { DownloadOutlined } from '@ant-design/icons'

const options = [
    {
        value: 'iin',
        label: 'Поиск по ИИН'
    },
    {
        value: 'fio',
        label: 'Поиск по ФИО'
    },
    {
        value: "identifier",
        label: "Поиск по идентификатору"
    }
]

const Person = () => {

    const {
        data: persons,
        isFetching: personsFetching,
    } = useAllPersons()

    return (
        <>
            {personsFetching
                ? <Spin />
                : <PersonList persons={persons.data}/>
            }
        </>
    )
}
export default Person


const PersonList = ({ persons }) => {
    const navigate = useNavigate()
    const [isPersonReportModalOpen, setPersonReportModalOpen] = useState(false) 
    const [placeholder, setPlaceholder] = useState("Поиск по ИИН")
    const [searchParameter, setSearchParameter] = useState("iin")

    const [dataSource, setDataSource] = useState(persons != null ? persons : null)
    const [value, setSearchValue] = useState(null)

    const allPersonData = useAllPersonsData()

    const onPersonReportModalClose = () => {
        setPersonReportModalOpen(false)
    }


    const filterData = (currentValue) => {
        let filteredArray = []
        persons.filter(entry => {
            if (entry.iin != null) {
                filteredArray.push(entry)
            }
        })

        if (searchParameter === "iin") {
            const filteredData = filteredArray.filter(entry => 
                entry.iin.includes(currentValue)
                
            )

            return filteredData
        }

        if (searchParameter === 'fio') {
            const filteredData = filteredArray.filter(entry => 
                entry.last_name.includes(currentValue) || 
                entry.first_name.includes(currentValue)
            )

            return filteredData
        }

        if (searchParameter === 'identifier') {
            const filteredData = filteredArray.filter(entry =>
                entry.identifier.includes(currentValue)
            )

            return filteredData
        }
    }

    return (
        <>
            <Space direction="vertical">
                <Button 
                    onClick={() => setPersonReportModalOpen(true)}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />} 
                    size="medium"
                >
                    Сформировать отчет
                </Button>

                <Space>
                    <Search 
                        placeholder='Введите поисковый запрос'
                        value={value}
                        style={{ width: '300px'}}
                        onChange={e => {
                            const currValue = e.target.value
                            setSearchValue(currValue)
                            const filteredData = filterData(currValue)
                            setDataSource(filteredData)
                        }}
                    />
                    <Select 
                        style={{ width: '300px' }}
                        placeholder={placeholder}
                        options={options}
                        onChange={e => setSearchParameter(e)}
                    />   
                </Space>
            </Space>
            <Table 
                columns={columns} 
                dataSource={dataSource}
                style={{ marginTop: '20px' }}
                onRow={(record) => {
                    return {
                        onClick: event => navigate(`/persons/view/${record.identifier}`),
                    }
                }}
            />

            {isPersonReportModalOpen && (
                <PersonReportModal 
                    onClose={onPersonReportModalClose}
                    data={allPersonData.data.data}
                />
            )}
        </>
    )
}