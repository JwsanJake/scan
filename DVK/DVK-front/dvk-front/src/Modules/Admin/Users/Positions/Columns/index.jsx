export const columns = [
    {
        title: '№',
		dataIndex: 'id',
		key: 'id',
		render: (id, record, index) => { ++index; return index; },
    },
    {
        title: "Наименование должности",
        dataIndex: "position_name",
        key: "position_name"
    },
    {
        title: "Доступы",
        dataIndex: "accesses",
        key: "accesses"
    }
]