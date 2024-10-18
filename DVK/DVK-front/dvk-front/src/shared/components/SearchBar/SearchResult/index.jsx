import { useState } from "react"
import { StyledSearchResult } from "./Styles"


const SearchResult = ({ result, key, 
        searchedPersons,
        setSelectedPersonsTag,
        selectedPersonsTag
    }) => {

        const onClick = (result) => {
            
            // const array = [...selectedPerson]
            // const existResident = selectedPerson.filter((res) => res.id === result.id)

            // if (existResident.length === 0) {
                
            //     array.push({ id: result.id,  })
            //     setSelectedPerson(array)
            // }
            searchedPersons(result)
            setSelectedPersonsTag(result)
        }


    return (
        <StyledSearchResult 
            onClick={(e) => onClick(result)}
        >
            {result.name + ' ' + '(' + result.BIN + ')'} 
        </StyledSearchResult>
    )
}
export default SearchResult