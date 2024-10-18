import moment from "moment"

export const columns = [
    {
        title: 'Тип аффилированности',
        dataIndex: 'affilation_name',
        key: 'affilation_name'
    },
    {
        title: 'Наименование лица/компании',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Дата заведения собственника',
        dataIndex: 'affiliation_detect_date',
        key: 'affiliation_detect_date',
        render: (text) => moment(text).format("DD-MM-YYYY")
    },
    {
        title: 'Статус',
        dataIndex: 'affiliation_status',
        key: 'affiliation_status'
    },
    {
        title: 'Дата прекращения аффилированности',
        dataIndex: 'affiliation_termination_date',
        key: 'affiliation_termination_date',
        //render: (text) => moment(text).format("DD-MM-YYYY")
    },

]