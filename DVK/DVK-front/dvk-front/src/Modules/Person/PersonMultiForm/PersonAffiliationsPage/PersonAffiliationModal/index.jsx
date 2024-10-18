import React, { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { showSuccess, showError } from "@/utils/toast"
import SearchBar from "@/shared/components/SearchBar"
import SearchDropdown from "@/shared/components/SearchBar/SearchDropdown"
import { useAddPersonAffiliation } from "@/Mutators/Person/mutators"
import { useSearchedPersons } from "@/Queries/Person"
import { useSearchedCompanies } from "@/Queries/Company"
import { Tabs, Tag, Select, Typography, Button, Flex, Space, Input, Divider } from "antd"
const { Search } = Input
import { useQueryClient } from "react-query"
const { Title, Text } = Typography
import CompanyCreateModal from "./CompanyCreateModal"
import PersonCreateModal from "./PersonCreateModal"

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

const PersonAffiliationModal = ({ onClose }) => {
    const { id } = useParams()

    const {
        handleSubmit,
        control,
        reset,
    } = useForm()

    const [searchedPersons, setSearchedPersons] = useState([])
    const [searchedCompanies, setSearchedCompanies] = useState([])

    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const [selectedCompaniesTag, setSelectedCompaniesTag] = useState(null)

    const dropdownListRef = useRef(null)
    const dropdownListRefPer = useRef(null)
    useOutsideClick(dropdownListRefPer, () => setSearchedPersons([]))
    useOutsideClick(dropdownListRef, () => setSearchedCompanies([]))

    const persons = useSearchedPersons()
    const companies = useSearchedCompanies()

    const addAffiliation = useAddPersonAffiliation()
    const queryClient = useQueryClient()

    const onSubmit = handleSubmit(data => {
        data.identifier = id
        data.affIdentifier = selectedCompaniesTag != null 
            ? selectedCompaniesTag.identifier : selectedPersonsTag.identifier

        try {
            addAffiliation.mutate(data, {
                onSuccess: () => {
                    queryClient.invalidateQueries("personAffiliations")
                    onClose(true)
                    showSuccess("Аффилированность добавлена")
                },
                onError: () => {
                    showError("Не удалось добавить аффилированность")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const [placeholder, setPlaceholder] = useState("Поиск по названию")
    const [searchParameter, setSearchParameter] = useState("company_title")
    const [value, setSearchValue] = useState(null)

    const [isModalOpen, setModalOpen] = useState(true)
    const [isPersonCreate, setIsPersonCreate] = useState(true)

    const [dataSource, setDataSource] = useState(companies)

    const addNewCompany = () => {
        if (isModalOpen === true) {
            setModalOpen(false)
        } 
        else {
            setModalOpen(true)
        }
    }

    const addNewPerson = () => {
        if (isPersonCreate === true) {
            setIsPersonCreate(false)
        }
        else {
            setIsPersonCreate(true)
        }
    }
    
    const filterData = (currentValue) => {
        console.log(companies.data)
        if (searchParameter === "company_title") {
            const filteredData = companies.data.filter(entry =>
                entry.name.includes(currentValue)
            )

            return filteredData
        }
        if (searchParameter === "bin") {
            const filteredData = companies.data.filter(entry =>
                entry.BIN.includes(currentValue)
            )

            return filteredData
        }
    }

    const items = [
        {
            key: 1,
            label: 'Компании',
            children:
                <>
                    <Space>
                        <SearchBar 
                            placeholder="Поиск по компаниям"
                            searchedPerson = {setSearchedCompanies}
                            persons={companies ? companies.data : []}
                        />
                        <Button onClick={addNewCompany} type="primary">
                            {isModalOpen != false ? "Добавить новую" : "Скрыть добавление" }
                        </Button>
                    </Space>
                    
                    {/* <Space>
                        <Search 
                            placeholder="Поиск существующей компании"
                            value={value}
                            style={{ width: "280px" }}
                            onChange={e => {
                                const currValue = e.target.value
                                setSearchValue(currValue)
                                const filteredData = filterData(currValue)
                                setDataSource(filteredData)
                            }}
                        />
                        <Select
                            style={{ width: '200px' }}
                            placeholder={placeholder}
                            options={options}
                            onChange={e => setSearchParameter(e)} 
                        />

                        <Button onClick={addNewCompany} type="primary">
                            {isModalOpen != false ? "Добавить новую" : "Скрыть добовление" }
                        </Button>
                    </Space> */}
                    
                    {searchedCompanies && searchedCompanies.length > 0
                        &&
                        <div ref={dropdownListRef}>
                            <SearchDropdown 
                                persons={searchedCompanies}
                                setSelectedPersonsTag={setSelectedCompaniesTag}
                                selectedPersonsTag={selectedCompaniesTag}
                                searchedPersons={setSearchedPersons}
                            />
                        </div>}

                    {selectedCompaniesTag != null ?
                        <Flex style={{ marginTop: "20px"}}>
                            <Tag color="blue">
                                <Text strong>{selectedCompaniesTag.name}</Text>
                            </Tag>
                        </Flex>
                    : null}

                    {selectedCompaniesTag != null ?
                        <Space direction="vertical" style={{ marginTop: "20px"}}>
                            <Text>Характер связи</Text>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                onReset={reset}
                            >
                                <Controller 
                                    name="affType"
                                    control={control}
                                    rules={{ required: true }}
                                    render={( { field } ) => (
                                        <Select
                                            placeholder="Выберите характер связи"
                                            {...field}
                                            options={[
                                                {
                                                    value: 1,
                                                    label: 'Собственник',
                                                },
                                                {
                                                    value: 2,
                                                    label: 'Аффилированность',
                                                },
                                                {
                                                    value: 3,
                                                    label: 'Руководитель',
                                                },
                                            ]}
                                        />
                                    )}
                                />
                            </form>
                            <Button onClick={onSubmit} type="primary">Сохранить</Button>
                        </Space> 

                        
                    : ''}

                    {isModalOpen != true && 
                        <>
                            <Divider />
                            <CompanyCreateModal />
                        </>
                    }
                </>
        },
        {
            key: 2,
            label: 'Лица',
            children:
                <>
                    <Space>
                        <SearchBar 
                            placeholder="Поиск по лицам"
                            searchedPerson = {setSearchedPersons}
                            persons={persons ? persons.data : []}
                        />
                        <Button onClick={addNewPerson} type="primary">
                            {isPersonCreate != false ? "Добавить лицо" : "Скрыть добавление" }
                        </Button>
                    </Space>
                    
                    {searchedPersons && searchedPersons.length > 0
                        &&
                        <div ref={dropdownListRefPer}>
                            <SearchDropdown 
                                persons={searchedPersons}
                                setSelectedPersonsTag={setSelectedPersonsTag}
                                selectedPersonsTag={selectedPersonsTag}
                                searchedPersons={setSearchedPersons}
                            />
                        </div>}
                    
                    {selectedPersonsTag != null ?
                        <Flex style={{ marginTop: "20px"}}>
                            <Tag color="blue">
                                {selectedPersonsTag.name}
                            </Tag>
                        </Flex>
                    : ''}

                    {selectedPersonsTag != null ?
                        <Space direction="vertical" style={{ marginTop: "20px"}}>
                            <Text>Характер связи</Text>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                onReset={reset}
                            >
                                <Controller 
                                    name="affType"
                                    control={control}
                                    rules={{ required: true }}
                                    render={( { field } ) => (
                                        <Select
                                            placeholder="Выберите характер связи"
                                            {...field}
                                            options={[
                                                {
                                                    value: 5,
                                                    label: 'Родственные связи',
                                                },
                                            ]}
                                        />
                                    )}
                                />
                            </form>
                            <Button onClick={onSubmit} type="primary">Сохранить</Button>
                        </Space> 
                    : ''}

                    {isPersonCreate != true &&
                        <>
                            <Divider />
                            <PersonCreateModal />
                        </>
                        
                    }
                </>
        }
    ]

    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={3} style={{ marginLeft: "20px"}}>Аффилированность</Title>
                <ModalContent>

                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                    />
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default PersonAffiliationModal



