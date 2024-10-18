export const filterArray = (array, filter) => {
    if (array === null || array === undefined || Object.keys(array).length == 0) return 

    else {
        const filteredArr = array.files.filter(item => item.input_type === filter)
        let finishArr = filteredArr.map(item => ({ name: item.filepath }))
    
        return finishArr
    }
}
