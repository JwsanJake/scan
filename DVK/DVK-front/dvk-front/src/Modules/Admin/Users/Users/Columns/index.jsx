export const columns = [
    {
        title: '№',
		dataIndex: 'id',
		key: 'id',
		render: (id, record, index) => { ++index; return index; },
    },
    {
        title: "Фамилия",
        dataIndex: "last_name",
        key: "last_name"
    },
    {
        title: "Имя",
        dataIndex: "first_name",
        key: "first_name",
    },
    {
        title: "Отчество",
        dataIndex: "middle_name",
        key: "middle_name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Должность",
        dataIndex: "position_name",
        key: "position_name",
    }
]