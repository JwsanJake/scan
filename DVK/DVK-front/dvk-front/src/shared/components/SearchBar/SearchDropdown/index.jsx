import SearchResult from "@/shared/components/SearchBar/SearchResult"
import { StyledSearchDropdown } from "./Styles"


const SearchDropdown = ({
    persons, 
    setSelectedPersonsTag, 
    selectedPersonsTag, 
    searchedPersons
}) => {

    return (
        <StyledSearchDropdown>
            {persons.map((person) => (
                
                <SearchResult 
                    result={person}
                    key={person.id}

                    searchedPersons={searchedPersons}
                    setSelectedPersonsTag={setSelectedPersonsTag}
                    selectedPersonsTag={selectedPersonsTag}
                />
            ))}
        </StyledSearchDropdown>
    )
}
export default SearchDropdown
