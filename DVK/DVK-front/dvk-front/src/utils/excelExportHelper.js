import * as ExcelJS from "exceljs"

export const exportExcelFile = (data, columns, sheetName) => {

    // Object.keys(data[0]).forEach(key => {
    //     console.log(key)
    // })

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Отчет")
    
    sheet.getRow(1).border = {
        top: { style: "thick", color: { argb: "black" }},
        left: { style: "thick", color: { argb: "black" }},
        bottom: { style: "thick", color: { argb: "black" }},
        right: { style: "thick", color: { argb: "black" }},
    }

    sheet.getRow(1).fill = {
        backgroundColor: { argb: "FFFF00" },
    }

    sheet.getRow(1).font = {
        name: "Times New Roman",
        family: 4,
        size: 16,
        bold: true,
    }

    //sheet.columns = columns
    


    data?.map(async (item, index) => {
        const rowNumber = index + 1

        sheet.addRow({
            last_name: item?.last_name,
            first_name: item?.first_name,
            middle_name: item?.middle_name,
            birthdate: item?.birthdate,
            iin: item?.iin,
            citizenship: item?.citizenship,
            family_status: item?.family_status
        })
    })

    workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
            type: ""
        })
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = url
        anchor.download = 'download.xlsx'
        anchor.click()
        window.URL.revokeObjectURL(url)
    })
}

