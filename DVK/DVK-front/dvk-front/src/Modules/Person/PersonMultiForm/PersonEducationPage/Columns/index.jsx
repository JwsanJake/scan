import moment from "moment"

export const columns = [
    {
        title: 'Вид образования',
        dataIndex: 'education_type',
        key: 'education_type'
    },
    {
        title: 'Наименование учебного заведения',
        dataIndex: 'edu_institution_name',
        key: 'edu_institution_name'
    },
    {
        title: 'Дата начала учебы',
        dataIndex: 'start_date',
        key: 'start_date',
        render: (text) => moment(text).format("YYYY")
    },
    {
        title: 'Дата окончания учебы',
        dataIndex: 'end_date',
        key: 'end_date',
        render: (text) => moment(text).format("YYYY")
    },
    {
        title: 'Квалификация',
        dataIndex: 'qualification',
        key: 'qualification'
    },
    {
        title: 'Специализация',
        dataIndex: 'specialization',
        key: 'specialization'
    },
]