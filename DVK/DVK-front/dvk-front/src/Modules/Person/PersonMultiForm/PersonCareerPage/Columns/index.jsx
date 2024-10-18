import moment from "moment"

export const columns = [
    {
        title: 'Наименование комании',
        dataIndex: 'company_name',
        key: 'company_name'
    },
    {
        title: 'Дата начала работы',
        dataIndex: 'start_date',
        key: 'start_date',
        render: (text) => moment(text).format("DD-MM-YYYY")
    },
    {
        title: 'Дата завершения работы',
        dataIndex: 'end_date',
        key: 'end_date',
        render: (text) => moment(text).format("DD-MM-YYYY")
    },
    {
        title: 'Должность',
        dataIndex: 'job_position',
        key: 'job_position'
    },
]