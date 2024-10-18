import * as ExcelJS from "exceljs"
import moment from "moment"

export const companyReport = (data, columns, sheetName) => {
    console.log(data)
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Отчет по контрагенту")
    let rowNumber = 22

    sheet.getColumn('A').width = 50
    sheet.getColumn('B').width = 50

    sheet.getCell("A1").value = `Отчет по контрагенту - ${data.mainInfo.company_title}`
    sheet.getCell("A1").font = { bold: true }
    sheet.mergeCells('A5:B5')
    sheet.getCell('B5').value = "Заключение"
    sheet.getCell('B5').font = { bold: true, size: 12 }
    sheet.getCell('B5').alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.mergeCells('A6:B6')
    sheet.getCell('B6').font = { bold: true, size: 10 }
    sheet.getCell('B6').alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.getCell('B6').value = "о результатах проверки проекта договора на предмет соответствия интересам экономической безопасности"

    sheet.getCell("A8").value = "Регистрационный номер проверки контрагента"
    sheet.getCell("A9").value = "Номер входящего документа"
    sheet.getCell("A10").value = "Дата начала проверки"
    sheet.getCell("A11").value = "Дата окончания проверки"
    sheet.getCell("A12").value = "Данные лица, проводившего проверку"
    sheet.getCell("A14").value = "Наименование контрагента"
    sheet.getCell('A14').font = { bold: true }
    sheet.getCell("A15").value = "БИН/ИИН"
    sheet.getCell("A16").value = "Дата первичной регистрации"
    sheet.getCell("A17").value = "Дата последней перерегистрации"
    sheet.getCell("A18").value = "Юридический адрес регистрации"
    sheet.getCell("A19").value = "Фактический адрес"
    sheet.getCell("A20").value = "Предмет договора"
    sheet.getCell("A21").value = "Сумма договора"

    sheet.getCell("B8").value = data.events.identifier
    sheet.getCell("B9").value = data.events.event_doc_ground
    sheet.getCell("B10").value = moment(data.events.event_start_date).format("DD-MM-YYYY")
    sheet.getCell("B11").value = moment(data.events.event_end_date).format("DD-MM-YYYY")
    sheet.getCell("B12").value = data.events.event_create_executor

    sheet.getCell("B14").value = data.mainInfo.company_title
    sheet.getCell("B15").value = data.mainInfo.bin
    sheet.getCell("B16").value = data.mainInfo.first_registration_date,
    sheet.getCell("B17").value = data.mainInfo.last_registration_date,
    sheet.getCell("B18").value = data.mainInfo.legal_address,
    sheet.getCell("B19").value = data.mainInfo.actual_address
    sheet.getCell("B20").value = data.events != null ? data.events.event_subject_of_contract : 'Не указано'
    sheet.getCell("B21").value = data.events != null ? data.events.event_contract_amount : 'Не указано'

    

    sheet.getCell(`A${rowNumber}`).value = "Наличие статуса завода-изготовителя"
    sheet.getCell(`B${rowNumber}`).value = data.mainInfo.is_manufacture == 1 ? "имеется" : "не имеется"
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Наличие дилера/представительства"
    sheet.getCell(`B${rowNumber}`).value = data.mainInfo.is_dealer == 1 ? "имеется" : "не имеется"
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Виды деятельности"
    sheet.getCell('A14').font = { bold: true }
    rowNumber += 1
    for (let i = 0; i <= data.activities.length - 1; i++) {
        sheet.getCell(`A${rowNumber}`).value = 'Вид деятельности'
        sheet.getCell(`B${rowNumber}`).value = data.activities[i].activity_name
        rowNumber += 1
    }

    sheet.getCell(`A${rowNumber}`).value = "Наличие лицензий,разрешений"
    sheet.getCell('A14').font = { bold: true }
    rowNumber += 1
    for (let i = 0; i <= data.licenses.length - 1; i++) {
        sheet.getCell(`A${rowNumber}`).value = "Лицензия,разрешение"
        sheet.getCell(`B${rowNumber}`).value = data.licenses[i].license_name
        rowNumber += 1
    }

    sheet.getCell(`A${rowNumber}`).value = "Сведения о налогах за последний год"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.tax_payment_last_year : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие налоговой задолженности"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.tax_debt_info : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие судебных разбирательств"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.court_cases_info : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие исполнительных производств"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.enforcement_proceedings_info : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие административных, уголовных дел"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.criminal_administrative_cases_info : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие в реестре недобросовестных участников госзакупок"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.unscrupulous_participant_of_state_procurements : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие арестов на банковские счета, имущество"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.arrest_of_bank_balance : "Не указано"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Наличие сведений негативного характера"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null ? data.financial.negative_info : "Не указано"
    rowNumber += 1

    // sheet.getCell(`A${rowNumber}`).value = "Наличие сведений негативного характера" 
    // rowNumber += 1
    // sheet.getCell(`A${rowNumber}`).value = "Сведения о наличии в отношении кандидата достоверной информации"
    // sheet.getCell(`B${rowNumber}`).value = data.negative != null ? data.negative.availability_of_reliable_info : "Не указано"
    // rowNumber += 1
    // sheet.getCell(`A${rowNumber}`).value = "Сведения о наличии невозмещенного предприятию  материального ущерба"
    // sheet.getCell(`B${rowNumber}`).value = data.negative != null ? data.negative.unreimbursed_damage_info : "Не указано"
    // rowNumber += 1
    // sheet.getCell(`A${rowNumber}`).value = "Сведения о наличии проводимых  уполномоченными подразделениями предприятия проверок"
    // sheet.getCell(`B${rowNumber}`).value = data.negative != null ? data.negative.availability_of_checks : "Не указано"
    // rowNumber += 1
    // sheet.getCell(`A${rowNumber}`).value = "Наличие сведений, отрицательно характеризующих контрагента"
    // sheet.getCell(`B${rowNumber}`).value = data.negative != null ? data.negative.presence_of_negative_info : "Не указано"
    // rowNumber += 1
    
    for (let i = 0; i < data.owners.length; i++) {
        if (data.owners[i].identifier.includes("ДСЛЦ")) {
            sheet.getCell(`A${rowNumber}`).value = `Учредитель ${i + 1}`
            sheet.getCell(`A${rowNumber}`).font = { bold: true }
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "ФИО"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].title
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "ИИН"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].iin
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Дата рождения"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].birthdate
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Гражданство"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].citizenship
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Юридический адрес"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].legal_address
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Фактический адрес"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].legal_address
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Номер документа, удостоверяющий личность"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].identification
            rowNumber += 1
        }
        if (data.owners[i].identifier.includes("ДСЛЦ")) {
            sheet.getCell(`A${rowNumber}`).value = `Учредитель ${i + 1}`
            sheet.getCell(`A${rowNumber}`).font = { bold: true }
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "ФИО"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].title
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "ИИН"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].iin
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Дата рождения"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].birthdate
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Гражданство"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].citizenship
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Юридический адрес"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].legal_address
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Фактический адрес"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].legal_address
            rowNumber += 1
            sheet.getCell(`A${rowNumber}`).value = "Номер документа, удостоверяющий личность"
            sheet.getCell(`B${rowNumber}`).value = data.owners[i].identification
            rowNumber += 1
        }
        
    }

    sheet.getCell(`A${rowNumber}`).value = "Руководитель"
    sheet.getCell(`A${rowNumber}`).font = { bold: true }
    rowNumber += 1
    
    if (data.director.length >0 ) {
        sheet.getCell(`A${rowNumber}`).value = "ФИО"
        sheet.getCell(`B${rowNumber}`).value = data.director != null ?  data.director[0].title : ""
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = "ИИН"
        sheet.getCell(`B${rowNumber}`).value = data.director[0].iin
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = "Дата рождения"
        sheet.getCell(`B${rowNumber}`).value = data.director[0].birthdate
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = "Гражданство"
        sheet.getCell(`B${rowNumber}`).value = data.director[0].citizenship
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = "Адрес регистрации"
        sheet.getCell(`B${rowNumber}`).value = data.director[0].legal_address
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = "Адрес проживания"
        sheet.getCell(`B${rowNumber}`).value = data.director[0].actual_address
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = "Документ, удостоверяющий личность"
        sheet.getCell(`B${rowNumber}`).value = data.director[0].identification
        rowNumber += 1
    }

    sheet.getCell(`A${rowNumber}`).value = "Результат мероприятия"
    sheet.getCell(`A${rowNumber}`).font = { bold: true }
    sheet.getCell(`B${rowNumber}`).value = data.events != null ? (data.events.event_executor_conclusion != null ? data.events.event_executor_conclusion : data.events.event_curator_conclusion) : "Не указано"
    sheet.getCell(`B${rowNumber}`).font = { bold: true }
    rowNumber += 1

    for (let i = 8; i <= rowNumber - 1; i++) {

        sheet.getCell(`A${i}`).border = {
            top: { style: "medium", color: { argb: "black" }},
            left: { style: "medium", color: { argb: "black" }},
            bottom: { style: "medium", color: { argb: "black" }},
            right: { style: "medium", color: { argb: "black" }},
        }
        sheet.getCell(`B${i}`).border = {
            top: { style: "medium", color: { argb: "black" }},
            left: { style: "medium", color: { argb: "black" }},
            bottom: { style: "medium", color: { argb: "black" }},
            right: { style: "medium", color: { argb: "black" }},
        }
    }

    sheet.getCell(`A${rowNumber + 1}`).value = "Исполнитель"
    sheet.getCell(`B${rowNumber + 1}`).value = data.events != null && "______" + data.events.event_create_executor + "_______"

    workbook.xlsx.writeBuffer().then(function(data) {
        const blob = new Blob([data], {
            type: ""
        })
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = url
        anchor.download = `Отчет о проверке контрагента.xlsx`
        anchor.click()
        window.URL.revokeObjectURL(url)
    })  
}
