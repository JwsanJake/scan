import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import SearchBar from "@/shared/components/SearchBar"
import SearchDropdown from "@/shared/components/SearchBar/SearchDropdown"
import { ModalOverlay, ModalWrapper, ModalTitle, ModalContent } from "../../CompanyOwnersForm/OwnerModal/Styles"
import { useSearchedPersons } from "@/Queries/Person"
import { useSearchedCompanies } from "@/Queries/Company"
import { Tabs, Flex, Space, Tag, Select, Typography, Button } from "antd"
const { Title, Text } = Typography
import { useAddCompanyAffiliations } from "@/Mutators/Company/mutators"
import { useQueryClient } from "react-query"


const AffiliationModal = ({ onClose }) => {
    const { id } = useParams()

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm()

    const [searchedPersons, setSearchedPersons] = useState([])
    const [searchedCompanies, setSearchedCompanies] = useState([])
    
    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const [selectedCompaniesTag, setSelectedCompaniesTag] = useState(null)
  
    const dropdownListRef = useRef(null)
    const dropdownListRefPer = useRef(null)
    useOutsideClick(dropdownListRef, () => setSearchedCompanies())
    useOutsideClick(dropdownListRefPer, () => setSearchedPersons())

    const persons = useSearchedPersons()
    const companies = useSearchedCompanies()

    const affiliations = useAddCompanyAffiliations()
    const queryClient = useQueryClient()

    const onSubmit = handleSubmit(data => {

        data.identifier = id
        data.parentId = selectedPersonsTag != null 
            ? selectedPersonsTag.identifier : selectedCompaniesTag.identifier

        try {
            affiliations.mutate(data, {
                onSuccess: () => {
                    queryClient.invalidateQueries("companyAffiliated")
                    onClose(true)
                    showSuccess("Аффилированность успешно добавлена")
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
                                                value: 2,
                                                label: 'Аффилированность',
                                            },
                                            {
                                                value: 4,
                                                label: 'Дочерняя организация'
                                            }
                                        ]}
                                    />
                                )}
                            />
                        </form>
                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    </Space> 
                : null}
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
                        <Flex style={{ marginTop: "20px"}}>
                            <Tag color="blue">
                                <Text strong>{selectedPersonsTag.name}</Text>
                            </Tag>
                        </Flex>
                        
                    : null}

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
                                                    value: 2,
                                                    label: 'Аффилированность',
                                                },
                                                {
                                                    value: 1,
                                                    label: 'Собственник'
                                                }
                                            ]}
                                        />
                                    )}
                                />
                            </form>
                            <Button onClick={onSubmit} type="primary">Сохранить</Button>
                        </Space> 
                    : null}
                </>
        }
    ]

    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={3} style={{ marginLeft: "10%"}}>Связи</Title>
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
export default AffiliationModal

