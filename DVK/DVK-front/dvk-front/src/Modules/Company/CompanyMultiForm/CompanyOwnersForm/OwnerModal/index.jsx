import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { 
    ModalOverlay, 
    ModalWrapper, 
    ModalTitle, 
    ModalContent 
} from "./Styles"
import SearchBar from "@/shared/components/SearchBar"
import SearchDropdown from "@/shared/components/SearchBar/SearchDropdown"
import { useSearchedPersons } from "@/Queries/Person"
import { useSearchedCompanies } from "@/Queries/Company"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { Tag, Tabs, Button, Flex, Typography  } from "antd"
const { Text } = Typography
import { useAddCompanyAffiliations } from "@/Mutators/Company/mutators"
import { useAddCompanyOwner } from "@/Mutators/Company/mutators"
import { showSuccess, showError } from "@/utils/toast"
import { useQueryClient } from "react-query"


const OwnerModal = ({ onClose }) => {
    const { id } = useParams()

    const [searchedPersons, setSearchedPersons] = useState()
    const [searchedCompanies, setSearchedCompanies] = useState()
    
    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const [selectedCompaniesTag, setSelectedCompaniesTag] = useState(null)

    
    const dropdownListRef = useRef(null)
    useOutsideClick(dropdownListRef, () => setSearchedCompanies())

    const persons = useSearchedPersons()
    const companies = useSearchedCompanies()

    const owners = useAddCompanyAffiliations() //useAddCompanyOwner()
    const queryClient = useQueryClient()
    
    const onSubmit = () => {
        let data = {}
        data.identifier = id
        data.parentId = selectedPersonsTag != null 
        ? selectedPersonsTag.identifier : selectedCompaniesTag.identifier
        data.affType = 1

        try {
            owners.mutate(data, {

                onSuccess: () => {
                    queryClient.invalidateQueries("companyOwners")
                    onClose(true)
                    showSuccess("Собственник успешно добавлен")
                },
                onError: () => {
                    showError("Не удалось добавить собственника")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    }


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
                    <>
                        <Flex style={{ marginTop: "20px" }}>
                            <Tag color="blue" style={{ marginTop: "30px" }}>
                                <Text strong>{selectedCompaniesTag.name}</Text>
                            </Tag>
                        </Flex>

                        <Button 
                            onClick={onSubmit} 
                            type="primary"
                            style={{ marginTop: "20px"}}
                        >
                            Добавить
                        </Button>
                    </>
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
                        <div ref={dropdownListRef}>
                            <SearchDropdown 
                                persons={searchedPersons}
                                setSelectedPersonsTag={setSelectedPersonsTag}
                                selectedPersonsTag={selectedPersonsTag}
                                searchedPersons={setSearchedPersons}
                            />
                        </div>}
                    
                    {selectedPersonsTag != null ?
                        <>
                            <Flex style={{ marginTop: "20px" }}>
                                <Tag color="blue">
                                    <Text strong>{selectedPersonsTag.name}</Text>
                                </Tag>
                            </Flex>
                            
                            <Button 
                                onClick={onSubmit} 
                                type="primary"
                                style={{ marginTop: "20px" }}
                            >
                                Сохранить
                            </Button>
                        </>
                    : null}
                </>
        }
    ]
    
    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>

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
export default OwnerModal