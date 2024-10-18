import moment from "moment"

export const columns = [
    {
        title: 'Идентификатор',
        dataIndex: 'identifier',
        key: 'identitifer'
    },
    {
        title: 'Наименование собственника',
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
        key: 'affiliaition_status',
    },
    {
        title: 'Дата прекращения аффилированности',
        dataIndex: 'affiliation_termination_date',
        key: 'affiliation_termination_date',
        //render: (text) => moment(text).format("DD-MM-YYYY")
    }
]