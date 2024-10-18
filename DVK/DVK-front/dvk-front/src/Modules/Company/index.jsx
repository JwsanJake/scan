import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAllCompanies } from "@/Queries/Company"
import { columns } from "./Columns"
import { Spin, Table, Button, Input, Space, Flex, Select } from "antd"
const { Search } = Input
import { DownloadOutlined } from '@ant-design/icons'
import CompanyReportModal from "./CompanyReportModal"

const options = [
    {
        value: 'company_title',
        label: 'Поиск по названию компании'
    },
    {
        value: 'bin',
        label: 'Поиск по БИН'
    },
]

const Company = () => {
    const {
        data: companies,
        isFetching: companyFetching,
    } = useAllCompanies()

    return (
        <>
            {companyFetching
                ? <Spin/>
                : <CompanyList companies={companies}/>
            }
        </>
    )
}
export default Company


const CompanyList = ({ companies }) => {
    const navigate = useNavigate()
    const [isCompanyReportModalOpen, setCompanyReportModalOpen] = useState(false)
    const [placeholder, setPlaceholder] = useState("Поиск по имени")
    const [searchParameter, setSearchParameter] = useState("company_title")

    const [dataSource, setDataSource] = useState(companies)
    const [value, setSearchValue] = useState(null)

    const allCompanyData = useAllCompanies()

    const onCompanyReportModalClose = () => {
        setCompanyReportModalOpen(false)
    }

    const filterData = (currentValue) => {
        if (searchParameter === "company_title") {
            const filteredData = companies.filter(entry =>
                entry.company_title.includes(currentValue)
            )

            return filteredData
        }
        if (searchParameter === "bin") {
            const filteredData = companies.filter(entry =>
                entry.bin.includes(currentValue)
            )

            return filteredData
        }
    }

    return (
        <>
            <Space direction="vertical">
                <Button
                    onClick={() => setCompanyReportModalOpen(true)}
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size="medium"
                >
                    Сформировать отчет
                </Button>
                <Space>
                    <Search
                        placeholder="Введите поисковый запрос"
                        value={value}
                        style={{ width: "300px"}}
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
                onRow={(record) => {
                            return {
                                onClick: event => navigate(`/companies/view/${record.identifier}`),
                            }
                        }}
                        style={{ marginTop: "20px"}}
                    />
       
            {isCompanyReportModalOpen && (
                <CompanyReportModal
                    onClose={onCompanyReportModalClose}
                    data={allCompanyData.data}
                />
            )}
        </>
    )
}

