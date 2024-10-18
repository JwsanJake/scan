import { useState } from "react"
import { useAllEmployees } from "@/Queries/Admin"
import UserAddModal from "./UserAddModal"
import { columns } from "@/Modules/Admin/Users/Users/Columns"
import { Table, Button } from 'antd'


const Users = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const {
        data: users,
        isFetching: usersFetching,
        isRefetching: usersRefetching,
    } = useAllEmployees()

    const addUserModal = () => {
        setModalOpen(true)
    }

    const onModalClose = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Button onClick={addUserModal} type="primary">Добавить пользователя</Button>

            {usersFetching && !usersRefetching ? (
                <div>Загрузка</div>
            ):(
                <Table 
                    columns={columns}
                    dataSource={users}
                    onRow={(record, rowIndex) => {
                        return {
                            //onClick: event => navigate(`/persons/view/${record.identifier}`),
                            onClick: event => setModalOpen(true)
                        }
                    }}
                />
            )}

            {isModalOpen && (
                <UserAddModal 
                    onClose={onModalClose}
                />
            )}
        </>
    )
}
export default Users