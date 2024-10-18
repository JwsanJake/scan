export const columns = [
    {
        title: '№',
		dataIndex: 'id',
		key: 'id',
		render: (id, record, index) => { ++index; return index; },
    },
    {
        title: "Наименование предприятия",
        dataIndex: "label",
        key: "label",
    }
]