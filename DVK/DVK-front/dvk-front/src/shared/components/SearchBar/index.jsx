import { useState, useMemo } from "react"
import { StyledSearchBar, StyledSearchBarInput } from "./Styles"


const SearchBar = ({ searchedPerson, persons, placeholder }) => {
    const [input, setInput] = useState("")
    //console.log(persons)
    let filteredArray = []

    // persons.filter(entry => {
    //     if (entry.iin != null) {
    //         filteredArray.push(entry)
    //     }
    // })
    useMemo(() => {
        if (input == '') {
            return 
        }

        const filteredPersons = persons
        .filter((res) => res.iin.includes(input))
        .map((res) => ({ id: res.id, BIN: res.iin, name: res.name, identifier: res.identifier }))

        searchedPerson(filteredPersons)
        
    }, [input])

    const handleChange = (value) => {
        setInput(value)
    }

    return (
        <StyledSearchBar>
            <StyledSearchBarInput 
                placeholder={placeholder}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </StyledSearchBar>
    )
}
export default SearchBar


