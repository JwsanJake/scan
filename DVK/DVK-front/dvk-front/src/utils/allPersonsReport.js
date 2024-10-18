import * as ExcelJS from "exceljs"

export const allPersonsReport = (data, sheetName) => {

    const headerArray = []

    Object.keys(data[0]).forEach(key => {
        headerArray.push({ header: `${key}`, key: `${key}`, width: 20 })
    })

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Отчет")
    sheet.columns = headerArray
    
    data?.map(async (product) => {
        sheet.addRow(product)
    })

    workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
            type: ""
        })
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = url
        anchor.download = "download.xlsx"
        anchor.click()
        window.URL.revokeObjectURL(url)
    })
}