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
import { Tabs, Tag, Select, Typography, Button } from "antd"
import { useQueryClient } from "react-query"
const { Title } = Typography


const OwnerAffiliationModal = ({ onClose }) => {
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

    const items = [
        {
            key: 1,
            label: 'Компании',
            children:
                <>
                    <SearchBar 
                        placeholder="Поиск по компаниям"
                        searchedPerson = {setSearchedCompanies}
                        persons={companies ? companies.data : []}
                    />
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
                        <Tag color="blue">
                            {selectedCompaniesTag.name}
                        </Tag>
                    : ''}
                    {selectedCompaniesTag != null ?
                        <>
                            <div>Характер связи</div>
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
                                                    value: 2,
                                                    label: 'Аффилированность',
                                                },
                                            ]}
                                        />
                                    )}
                                />

                                <Button onClick={onSubmit} type="primary">Сохранить</Button>
                            </form>
                        </> 
                    : ''}
                </>
        },
        {
            key: 2,
            label: 'Лица',
            children:
                <>
                    <SearchBar 
                        placeholder="Поиск по лицам"
                        searchedPerson = {setSearchedPersons}
                        persons={persons ? persons.data : []}
                    />
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
                        <Tag color="blue">
                            {selectedPersonsTag.name}
                        </Tag>
                    : ''}

                    {selectedPersonsTag != null ?
                        <>
                            <div>Характер связи</div>
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

                                <Button onClick={onSubmit} type="primary">Сохранить</Button>
                            </form>
                        </> 
                    : ''}
                </>
        }
    ]

    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={3}>Аффилированность</Title>
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
export default OwnerAffiliationModal



