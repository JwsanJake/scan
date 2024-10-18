
export const getAllColumns = (data) => {
    console.log(data)
    const allColumns = {}

    data.forEach((row)=> {
        Object.keys(row).forEach((key) => {
            allColumns[key]=true
        })
    });

    return Object.keys(allColumns).map((key) => {
        return {
            name: key, checked: true
        }
    })
} 


export const filterData = (data, columns) => {

    return data.map((row) => {
        const filteredRow = {}

        for (const key in row) {
            if (columns.includes(key)) {
                filteredRow[key] = row[key]
            }
        }
        return filteredRow
    })
}

export const filterColumns = (columns) => {

    return columns.filter((column) => column.checked === true).map((column)=> 
        column.name    
    ) 

}