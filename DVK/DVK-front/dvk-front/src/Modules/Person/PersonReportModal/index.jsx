import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { filterColumns, filterData, getAllColumns } from "@/utils/filterFields"
import { allPersonsReport } from "@/utils/allPersonsReport"


const PersonReportModal = ({ onClose, data }) => {
    const [columns, setColumns] = useState(getAllColumns(data))
    const [filteredColumns, setFilteredColumns] = useState([])
    const {
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        const initialColumns = columns.map((column) => column.name)
        setFilteredColumns(initialColumns)
    }, [])

    const changeColumns = (name) => {
        const changedColumns = columns.map((column) => {
            if (column.name === name) {
                column.checked = !column.checked
            }

            return column
        })

        setColumns(changedColumns)
        setFilteredColumns(filterColumns(changedColumns))
    }

    const onSubmit = () => {
        const filteredData = filterData(data, filteredColumns)
        allPersonsReport(data)
    }


    return (
        <>
            <ModalOverlay onClick={onClose}></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <ModalContent>
                    <h3>Сформировать отчет по лицам</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onReset={reset}
                    >
                    
                        {columns.map((column) => (
                            <>
                            <input 
                                type="checkbox" 
                                checked={column.checked}
                                onChange={() => changeColumns(column.name)}
                            />
                            <label >{column.name}</label>
                            </>
                  
                        ))}
                        
                        <button onClick={onSubmit} style={{ color: "red"}}>Сформировать отчет</button>
                    </form>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default PersonReportModal