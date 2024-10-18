import moment from "moment"
import * as ExcelJS from "exceljs"

export const personReport = (data, columns, sheetName) => {
    console.log(data)
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet("Отчет по лицу")
    let format = "DD-MM-YYYY"
    let rowNumber = 27

    sheet.getColumn('A').width = 50
    sheet.getColumn('B').width = 50

    sheet.getCell("A1").value= `Отчет по кандидату ${data.mainInfo.last_name}  ${data.mainInfo.first_name} ${data.mainInfo.middle_name}`
    sheet.mergeCells('A5:B5')
    sheet.getCell('B5').value = 'Заключение'
    sheet.getCell('B5').font = { bold: true, size: 12 }
    sheet.getCell('B5').alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.mergeCells('A6:B6')
    sheet.getCell('B6').value = 'по вопросу согласования/отказа в согласовании приема на работу (перевода, назначения) кандидата'
    sheet.getCell('B6').font = { bold: true, size: 10 }
    sheet.getCell('B6').alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.mergeCells('A7:B7')
    sheet.getCell('B7').font = { bold: true, size: 10 }
    sheet.getCell('B7').alignment = { vertical: 'middle', horizontal: 'center' }
    sheet.getCell('B7').value = data.events != null ? `в ${data.events.event_object}` : 'в'


    sheet.getCell("A9").value = "Регистрационный номер проверки кандидата"
    sheet.getCell("A10").value = "Номер входящего документа"
    sheet.getCell("A11").value = "Дата начала проверки"
    sheet.getCell("A12").value = "Дата окончания проверки"
    sheet.getCell("A13").value = "Данные лица, проводившего проверку"

    sheet.getCell("A15").value = 'Фамилия'
    sheet.getCell('A15').font = { bold: true }
    sheet.getCell("A16").value = 'Имя'
    sheet.getCell('A16').font = { bold: true }
    sheet.getCell("A17").value = 'Отчество'
    sheet.getCell('A17').font = { bold: true }
    sheet.getCell("A18").value = 'Дата рождения'
    sheet.getCell("A19").value = 'Место рождения'
    sheet.getCell("A20").value = 'Гражданство'
    sheet.getCell("A21").value = 'Документ, удостоверяющий личность'
    sheet.getCell("A22").value = 'ИИН'
    sheet.getCell("A23").value = 'Адрес регистрации'
    sheet.getCell("A24").value = 'Адрес фактического проживания'
    sheet.getCell("A25").value = 'Контактные данные'
    sheet.getCell("A26").value = 'Семейное положение'


    sheet.getCell("B9").value=data.events.identifier
    sheet.getCell("B10").value=data.events != null ? data.events.event_doc_ground : "Не указано"
    sheet.getCell("B11").value=data.events != null ?  moment(data.events.event_start_date).format("DD-MM-YYYY") : ""
    sheet.getCell("B12").value=data.events != null ?  moment(data.events.event_end_date).format("DD-MM-YYYY") : "Не указано"
    sheet.getCell("B13").value=data.events != null ? data.events.event_create_executor : "Не указано"
    sheet.getCell("B15").value=data.mainInfo.last_name
    sheet.getCell("B16").value=data.mainInfo.first_name
    sheet.getCell("B17").value=data.mainInfo.middle_name
    sheet.getCell("B18").value=moment(data.mainInfo.birthdate).format("DD-MM-YYYY")
    sheet.getCell("B19").value=data.mainInfo.birthplace
    sheet.getCell("B20").value=data.mainInfo.citizenship
    sheet.getCell("B21").value=data.mainInfo.identification
    sheet.getCell("B22").value=data.mainInfo.iin
    sheet.getCell("B23").value=data.mainInfo.legal_address
    sheet.getCell("B24").value=data.mainInfo.actual_address
    sheet.getCell("B25").value=data.mainInfo.phone_number
    sheet.getCell("B26").value=data.mainInfo.family_status
    
    for (let i = 0; i <= data.education.length - 1; i++) {

        sheet.getCell(`A${rowNumber}`).value = 'Образование'
        sheet.getCell(`B${rowNumber}`).value = data.education[i].education_type
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Наименование учебного заведения'
        sheet.getCell(`B${rowNumber}`).value = data.education[i].edu_institution_name
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Специальность'
        sheet.getCell(`B${rowNumber}`).value = data.education[i].specialization
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Период обучения'
        sheet.getCell(`B${rowNumber}`).value = `${moment(data.education[i].start_date).format("DD-MM-YYYY")} - ${moment(data.education[i].end_date).format("DD-MM-YYYY")}`
        rowNumber += 1
    }

    sheet.getCell(`A${rowNumber}`).value= 'Предыдущие места работы'
    rowNumber += 1
    for (let i = 0; i<= data.career.length - 1; i++) {
        sheet.getCell(`A${rowNumber}`).value = 'Предыдущее место работы'
        sheet.getCell(`B${rowNumber}`).value = data.career[i].company_name
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Должность'
        sheet.getCell(`B${rowNumber}`).value = data.career[i].job_position
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Период работы'
        sheet.getCell(`B${rowNumber}`).value = `${moment(data.career[i].start_date).format("DD-MM-YYYY")} - ${data.career[i].end_date != null ? moment(data.career[i].end_date).format("DD-MM-YYYY") : ''}`
        rowNumber += 1
    }

    sheet.getCell(`A${rowNumber}`).value = "Кандидат на должность"
    sheet.getCell(`B${rowNumber}`).value = data.events != null ? data.events.event_vacant_position : "Не указано" 
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Перевод с должности"
    sheet.getCell(`B${rowNumber}`).value = data.events != null ? data.events.event_transfer_position : "Не указано"
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Достоверность анкетных данных"
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Налоговая задолженность"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null && data.financial.tax_debt
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Исполнительные производства"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null && data.financial.enforcement_proceedings 
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Запрет на выезд из РК"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null && data.financial.KZ_departure_ban 
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Участие в юридических лицах и ИП"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null && data.financial.legal_entity 
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Судебные разбирательства"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null && data.financial.court_cases 
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Сведения негативного характера"
    sheet.getCell(`B${rowNumber}`).value = data.financial != null && data.financial.negative_info
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Проверка по БД"
    sheet.getCell(`B${rowNumber}`).value = data.negative != null && data.negative.db_data_check
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Проверка по данным П"
    sheet.getCell(`B${rowNumber}`).value = data.negative != null && data.negative.police_data_check
    rowNumber += 1

    sheet.getCell(`A${rowNumber}`).value = "Сведения о наличии родственников в структуре предприятия "
    sheet.getCell(`B${rowNumber}`).value = data.negative != null && data.negative.presense_of_family_ties
    rowNumber += 1


    sheet.getCell(`A${rowNumber}`).value = "Сведения о членах семьи и родственниках"
    rowNumber += 1

    for (let i = 0; i <= data.family.length - 1; i++) {
        sheet.getCell(`A${rowNumber}`).value = 'ФИО'
        sheet.getCell(`B${rowNumber}`).value = `${data.family[i].last_name} ${data.family[i].first_name} ${data.family[i].middle_name}`
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Кем приходится'
        sheet.getCell(`B${rowNumber}`).value = data.family[i].family_status
        rowNumber += 1
        sheet.getCell(`A${rowNumber}`).value = 'Место работы'
        sheet.getCell(`B${rowNumber}`).value = data.family[i].work_place
        rowNumber += 1
    }

    sheet.getCell(`A${rowNumber}`).value = "Сведения негативного характера в отношении членов семьи"
    sheet.getCell(`B${rowNumber}`).value = data.negative != null && data.negative.family_negative_info
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Дополнительная информация"
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Результат мероприятия"
    sheet.getCell(`A${rowNumber}`).font = { bold: true }
    sheet.getCell(`B${rowNumber}`).value = data.events != null ? (data.events.event_executor_conclusion != null ? data.events.event_executor_conclusion : data.events.event_curator_conclusion) : "Не указано"// + '/' + data.events.event_conclusion_description
    sheet.getCell(`B${rowNumber}`).font = { bold: true }
    rowNumber += 1

    for (let i = 9; i <= rowNumber - 1; i++) {

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
    rowNumber += 1
    sheet.getCell(`A${rowNumber}`).value = "Исполнитель"
    sheet.getCell(`B${rowNumber}`).value = data.events != null && "_________" + data.events.event_create_executor + "_______"

    workbook.xlsx.writeBuffer().then(function(data) {
        const blob = new Blob([data], {
            type: ""
        })
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement("a")
        anchor.href = url
        anchor.download = `Отчет о проверке кандидата.xlsx`
        anchor.click()
        window.URL.revokeObjectURL(url)
    })  
} 