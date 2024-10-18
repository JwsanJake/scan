export const modifyExecutorInfo = (data) => {

    let name = ""
    const executor = name.concat(data.last_name, " ", 
        data.first_name.slice(0,1), ".", data.middle_name != null ? data.middle_name.slice(0,1) : "", ".")
    const subdivision = data.subdivision_name

    return {
        executor,
        subdivision,
    }
}