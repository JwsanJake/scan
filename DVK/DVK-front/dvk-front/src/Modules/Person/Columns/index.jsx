export const columns = [
	{
		title: '№',
		dataIndex: 'id',
		key: 'id',
		render: (id, record, index) => { ++index; return index; },
	},
	{
		title: 'Идентификатор',
		dataIndex: 'identifier',
		key: 'identifier',
	},
	{
		title: 'ФИО',
		dataIndex: 'fio',
		key: 'fio',
		render: (text, record) => (
			<>{record.last_name} {record.first_name} {record.middle_name}</>
		)
	},
	{
		title: 'ИИН',
		dataIndex: 'iin',
		key: 'iin',
	},
	{
		title: 'Дата рождения',
		dataIndex: 'birthdate',
		key: 'birthdate'
	},
]
