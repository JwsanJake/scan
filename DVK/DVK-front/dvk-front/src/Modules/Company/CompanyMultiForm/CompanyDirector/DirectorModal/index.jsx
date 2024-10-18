import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { 
    ModalOverlay, 
    ModalWrapper, 
    ModalTitle, 
    ModalContent, 
} from "./Styles"
import SearchBar from "@/shared/components/SearchBar"
import SearchDropdown from "@/shared/components/SearchBar/SearchDropdown"
import { useAddCompanyDirector } from "@/Mutators/Company/mutators"
import { useAddCompanyAffiliations } from "@/Mutators/Company/mutators"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { useSearchedPersons } from "@/Queries/Person"
import { showSuccess, showError } from "@/utils/toast"
import { Flex, Typography, Tag, Button } from 'antd'
const { Title, Text } = Typography

const DirectorModal = ({ onClose }) => {
    const { id } = useParams()
    const [searchedPersons, setSearchedPersons] = useState([])
    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const dropdownListRef = useRef(null)
    useOutsideClick(dropdownListRef, () => setSearchedPersons())

    const persons = useSearchedPersons()
    const director = useAddCompanyAffiliations() // useAddCompanyDirector()

    const onSubmit = () => {
        let data = {}
        data.identifier = id
        data.parentId = selectedPersonsTag.identifier
        data.affType = 3

        director.mutate(data, {
            onSuccess: () => {
                onClose(true)
                showSuccess("Руководитель успешно добавлен")
            },
            onError: () => {
                showError("Не удалось добавить руководителя")
            }
        })
    }

    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>  
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={3} style={{ marginLeft: "20px"}}>Руководитель</Title>
                <ModalContent>
                
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
                            <Flex style={{ marginTop: "20px"}}>
                                <Tag color="blue" style={{ marginTop: "30px"}}>
                                    <Text strong>{selectedPersonsTag.name}</Text>
                                </Tag> 
                            </Flex>
                            <Button 
                                onClick={onSubmit} 
                                type="primary"
                                style={{ marginTop: "20px" }}
                            >
                                Добавить
                            </Button>
                        </>
                        : ''}
             

                   
                </ModalContent>
                
            </ModalWrapper>
        </>
    )
}
export default DirectorModal