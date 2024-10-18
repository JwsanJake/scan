
export const generateCells = (length) => {

    const startCells = 65
    let cells = []

    let endingCell = startCells + length - 1
    for ( let i = startCells; i <= endingCell; i++ )
    {
        cells.push(String.fromCharCode(i))
    }
    return cells
}

export const mapColumns = (cells, columns) => {
    const columnKey = {}
        
    cells.forEach((cell, index) => {

        columnKey[cell] = columns[index]
    })

    return columnKey
}

export const mapRows = (cells, row) => {

    const rowKey = {}
    for (const newKey in cells) {
        const oldKey = cells[newKey]
        rowKey[newKey] = row[oldKey]
    }

    return rowKey
}
