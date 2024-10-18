export const filterData = (currentValue, persons, searchParameter) => {
   
    let filteredArray = []

    persons.filter(entry => {
        console.log(entry)
        if (entry.bin != null) {
            filteredArray.push(entry)
        }
    })
    console.log(filteredArray)

    if (searchParameter === 'iin') {
        const filteredData = filteredArray.filter(entry => 
            entry.BIN.includes(currentValue)
        )
        //console.log(filteredData)
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