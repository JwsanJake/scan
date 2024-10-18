import React, { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAllEmployees } from "@/Queries/Admin"
import { useSearchedCompanies } from "@/Queries/Company"
import { useAddContractorMonitoring, useUpdateContractorMonitoring } from "@/Mutators/Event/mutator"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { Select, Button, Cascader, Space, Typography, Divider, Tag } from "antd"
import DatePickerAntd from "@/shared/components/DatePicker"
const { Text } = Typography
import { Input } from "@/shared/components/Input"
import SearchBar from "@/shared/components/SearchBar"
import { showSuccess, showError } from "@/utils/toast"
import { SettingOutlined } from '@ant-design/icons'
import { items } from "../example"


const EventContractorMonitoring = ({ event, mode }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEvent } = useRelations()
    const [searchedEmployees, setSearchedEmployees] = useState([])
    const [searchedCompanies, setSearchedCompanies] = useState()
    const [selectedEmployeesTag, setSelectedEmployeesTag] = useState(null)
    const [selectedCompaniesTag, setSelectedCompaniesTag] = useState(null)
    const [isViolation, setIsViolation] = useState(false)

    const employeesRef = useRef(null)
    const companiesRef = useRef(null)
    useOutsideClick(employeesRef, () => setSearchedEmployees())
    useOutsideClick(companiesRef, () => setSearchedCompanies())

    const methods = useForm({
        defaultValues: event,
    })

    const addEventContractor = useAddContractorMonitoring()
    const updateEventContractor = useUpdateContractorMonitoring()
    const employees = useAllEmployees()
    const companies = useSearchedCompanies()

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id

        try {
            updateEventContractor.mutate(data, {
                onSuccess: () => {
                    showSuccess("Обновлены данные о мониторинге контрагента")
                },
                onError: () => {
                    showError("Не удалось обновить данные о мониторинге контрагента")
                },
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const addSubject = methods.handleSubmit(data => {

        try {
            addEventContractor.mutate(data, {
                onSuccess: (response) => {
                    showSuccess("Добавлены данные о мониторинге контрагента")
                    addEvent(response.data)
                    navigate(`/companies/add`)
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const editEvent = () => {
        addEvent(id)
        const identifier = methods.watch('event_subject')
        navigate(`/companies/${identifier}`)
    }

    const onAddViolation = (e) => {
        if (e = "Выявлено нарушение") {
            setIsViolation(true)
        }
    }

    const addViolation = () => {
        addEvent(id)
        navigate(`/violations/add`)
    }

    return (
        <form
            onReset={methods.reset}
        >
            <Space>
                <DatePickerAntd 
                    name="event_start_date"
                    placeholder="Выберите дату"
                    label="Дата начала мероприятия"
                    control={methods.control}
                />
                <DatePickerAntd 
                    name="event_control_date"
                    placeholder="Выберите дату"
                    label="Дата контроля"
                    control={methods.control}
                />

                <Space direction="vertical">
                    <Text>Статус для учета</Text>
                    <Controller 
                        name="event_status"
                        control={methods.control}
                        render={( { field } ) => (
                            <Select
                                placeholder="Выберите статус"
                                {...field}
                                style={{ width: 300 }}
                                defaultValue={"В работе"}
                                options={[
                                    { value: 'Окончено', label: 'Окончено' },
                                    { value: 'В работе', label: 'В работе' },
                                ]}
                            />
                        )}
                    />
                </Space>
                <Input 
                    type="text"
                    name="event_doc_ground"
                    label="Номер документа основания"
                    placeholder="Введите номер документа основания"
                    errors={methods.errors}
                    register={methods.register}
                />
            </Space>
            <Divider />

            {/* <div>
                    <div>Объект</div>
                    <Cascader  
                        options={items} 
                        onChange={onChange} 
                        style={{ width: 1000 }}
                    />
                </div> */}

            {/* <Input 
                type="text"
                name="event_object"
                label="Объект"
                placeholder="Введите объект"
                errors={methods.errors}
                register={methods.register}
            /> */}
            <SelectAntd 
                name="event_object"
                placeholder="Выберите объект"
                label="Объект"
                control={methods.control}
                options={[
                    { value: 'ТОО "Kazakhmys Distribution"', label: 'ТОО "Kazakhmys Distribution"' },
                    { value: 'ТОО "Kazakhmys Energy"', label: 'ТОО "Kazakhmys Energy"' },
                    { value: 'ТОО "Coal"', label: 'ТОО "Coal"'},
                    { value: 'ТОО "ГРЭС Топар"', label: 'ТОО "ГРЭС Топар"'},
                    { value: 'АО "ЖРЭК"', label: 'АО "ЖРЭК"'},
                    { value: 'ТОО СП "КазБелАЗ"', label: 'ТОО СП "КазБелАЗ"'},
                    { value: 'ТОО "Монтажник ЭМ"', label: 'ТОО "Монтажник ЭМ"'},
                ]}
            />

            {mode === 'add' ?
                (<>
                    <Space direction="vertical">
                        <Text>Субъект</Text>
                        <Space direction="horizontal">
                            <SearchBar 
                                placeholder="Поиск по компаниям"
                                searchedPerson={setSearchedCompanies}
                                persons={companies}
                            />
                            {searchedCompanies && searchedCompanies.length > 0
                                &&
                                <div ref={companiesRef}>
                                    <SearchDropdown 
                                        persons={searchedCompanies}
                                        setSelectedPersonsTags={setSelectedCompaniesTag}
                                        selectedPersonsTags={selectedCompaniesTag}
                                        searchedCompanies={setSearchedCompanies}
                                    />
                                </div>
                            }

                            {selectedCompaniesTag != null ?
                                <Tag color="blue" style={{ marginTop: "30px"}}>
                                    {selectedCompaniesTag.name}
                                </Tag>
                            : ''}
                            <Button
                                type="primary" 
                                onClick={() => addSubject()}
                            >
                                Добавить компанию
                            </Button>
                        </Space>
                    </Space>
                </>)
                : (<Space>
                        <Input 
                            type="text"
                            name="event_subject"
                            label="Субъект"
                            placeholder="Введите субъект"
                            errors={methods.errors}
                            register={methods.register}
                        />
                        <Button
                            style={{ marginTop: "28px"}}
                            onClick={() => editEvent()}
                        >
                            Редактировать
                            <SettingOutlined/>
                        </Button>
                </Space>)
            }

            <Divider />

            <Space>
                <Input
                    type="text"
                    name="event_number_of_contract"
                    label="Номер договора"
                    placeholder="Введите номер договора"
                    errors={methods.errors}
                    register={methods.register}
                />
                <Input 
                    type="text"
                    name="event_subject_of_contract"
                    label="Предмет договора"
                    placeholder="Введите предмет договора"
                    errors={methods.errors}
                    register={methods.register}
                />
                <Input 
                    type="text"
                    name="event_contract_amount"
                    label="Сумма по договору"
                    placeholder="Введите сумму по договору"
                    errors={methods.errors}
                    register={methods.register}
                />
                <Input 
                    type="text"
                    name="event_contract_executor"
                    label="Исполнитель по договору"
                    placeholder="Введите исполнителя по договору"
                    errors={methods.errors}
                    register={methods.register}
                />
            </Space>

            <Input 
                type="text"
                name="event_content"
                label="Содержание мероприятия"
                placeholder="Введите содержание мероприятия"
                errors={methods.errors}
                register={methods.register}
                width="600px"
            />

            <Divider />

            <Space direction="vertical">
                <Space direction="vertical">
                    <Text>Исполнитель</Text>
                    <SearchBar 
                        placeholder="Поиск сотрудников"
                        searchedPerson={setSearchedEmployees}
                        persons={employees}
                    />
                    {searchedEmployees && searchedEmployees.length > 0
                        &&
                        <div ref={employeesRef}>
                            <SearchDropdown 
                                persons={searchedEmployees}
                                setSelectedPersonsTag={setSelectedEmployeeTag}
                                selectedPersonsTag={selectedEmployeesTag}
                                searchedPersons={setSearchedEmployees}
                             />
                        </div>
                    }

                    {selectedEmployeesTag != null ?
                        <Tag color="blue" style={{ marginTop: "30px" }}>
                            {selectedCompaniesTag.name}
                        </Tag>
                    : ''}
                </Space>

                <Divider />

                <Space>
                    <Space direction="vertical"> 
                        <Text>Результат мероприятия</Text>
                        <Controller 
                            name="event_result"
                            control={methods.control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Выберите результат мероприятия"
                                    style={{ width: 300 }}
                                    onChange={(e) => onAddViolation(e)}
                                    options={[
                                        { value: 'Проведена проверка', label: 'Проведена проверка' },
                                        { value: 'Выявлено нарушение', label: 'Выявлено нарушение'},
                                        { value: 'Приостановлено', label: 'Приостановлено' },
                                    ]}
                                />
                            )}
                        />
                    </Space>

                    {isViolation === true &&
                        <Button
                            type="primary"
                            onClick={() => addViolation()}
                            style={{ marginTop: "28px"}}
                        >
                            Добавить нарушение
                        </Button>
                    }

                    <Space direction="vertical">
                        <Text>Заключение исполнителя</Text>
                        <Controller 
                            name="event_conclusion"
                            control={methods.control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    placeholder="Выберите результат мероприятия"
                                    style={{ width: 300 }}
                                    options={[
                                        { value: 'Согласовано', label: 'Согласовано' },
                                        { value: 'Не согласовано', label: 'Не согласовано' },
                                    ]}
                                />
                            )}
                        />
                    </Space>

                    <Input 
                        type="text"
                        name="event_conclusion_description"
                        label="Примечание к заключению"
                        placeholder="Введите примечание к заключению"
                        errors={methods.errors}
                        register={methods.register}
                    />
                </Space>
                <Space>
                    <Button onClick={onSubmit} type="primary">
                        {mode === "add" ? "Сохранить" : "Обновить" }
                    </Button>
                </Space>
            </Space>

            {/* <Flex vertical>
                    <Text>Заключение руководителя</Text>
                    <Controller 
                        name="event_conclusion_supervisor"
                        control={methods.control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                placeholder="Выберите результат мероприятия"
                                style={{ width: 300 }}
                                options={[
                                    { value: 'Согласовано', label: 'Согласовано' },
                                    { value: 'Не согласовано', label: 'Не согласовано' },
                                    { value: 'На доработку', label: 'На доработку' },
                                ]}
                            />
                        )}
                    />
                </Flex> */}

        </form>
    )
}
export default EventContractorMonitoring