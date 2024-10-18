import React, { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAllEmployees } from "@/Queries/Admin"
import { useSearchedPersons } from "@/Queries/Person"
import { useAddPersonnelMonitoring, useUpdatePersonnelMonitoring } from "@/Mutators/Event/mutator"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { Select, Button, Cascader, Space, Divider, Typography, Tag } from "antd"
const { Text } = Typography
import { Input } from "@/shared/components/Input"
import DatePickerAntd from "@/shared/components/DatePicker"
import SearchBar from "@/shared/components/SearchBar"
import SearchDropdown from "@/shared/components/SearchBar/SearchDropdown"
import { showSuccess, showError } from "@/utils/toast"
import { items } from "../example"



const EventPersonnelMonitoring = ({ event, mode }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEvent, addViolationType, violationType } = useRelations()
    const [searchedEmployees, setSearchedEmployees] = useState([])
    const [searchedPersons, setSearchedPersons] = useState()
    const [selectedEmployeesTag, setSelectedEmployeesTag] = useState(null)
    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const [isViolation, setIsViolation] = useState(false)

    const employeesRef = useRef(null)
    const personsRef = useRef(null)
    useOutsideClick(employeesRef, () => setSearchedEmployees())
    useOutsideClick(personsRef, () => setSearchedPersons())

    const methods = useForm({
        defaultValues: event,
    })

    const addEventPersonnel = useAddPersonnelMonitoring()
    const updateEventPersonnel = useUpdatePersonnelMonitoring()
    const employees = useAllEmployees()
    const persons = useSearchedPersons()

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id

        try {
            updateEventPersonnel.mutate(data, {
                onSuccess: () => {
                    showSuccess("Обновлены данные о мониторинге кандидата")
                    navigate(`/events`)
                }
            })
        }
        catch (error) {
            showError("Не удалось обновить данные о мониторинге")
        }
    })

    const addSubject = methods.handleSubmit(data => {
        try {
            addEventPersonnel.mutate(data, {
                onSuccess: (response) => {
                    showSuccess("Добавлены данные о мониторинге кандидата")
                    addEvent(response.data)
                    navigate(`/persons/add`)
                },
                onError: () => {
                    showError("Не удалось добавить данные о мониторинге кандидата")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const onAddViolation = (e) => {
        if (e = "Выявлено нарушение") {
            setIsViolation(true)
        }
    }

    const addViolation = () => {
        addEvent(id)
        addViolationType('personnel_monitoring')
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
                        render={( { field }) => (
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
                (<Space direction="vertical">
                    <Text>Субъект</Text>
                    <Space>
                        <Space direction="vertical">
                            <SearchBar 
                                placeholder="Поиск по лицам"
                                searchedPerson={setSearchedPersons}
                                persons={persons.data}
                            />
                            {searchedPersons && searchedPersons.length > 0
                                &&
                                <div ref={personsRef}>
                                    <SearchDropdown 
                                        persons={searchedPersons}
                                        setSelectedPersonsTag={setSelectedPersonsTag}
                                        selectedPersonsTag={selectedPersonsTag}
                                        searchedPersons={setSearchedPersons}
                                    />
                                </div>
                            }

                            {selectedPersonsTag != null ?
                                <Tag color="blue" style={{ marginTop: "30px" }}>
                                    {selectedEmployeesTag}
                                </Tag>
                            : ''}
                        </Space>

                        <Button
                            type="primary"
                            onClick={() => addSubject()}
                        >
                            Добавить лицо
                        </Button>
                    </Space>
                </Space>)
                : (<>
                    <Input 
                        type="text"
                        name="event_subject"
                        label="Субъект"
                        placeholder="Введите субъект"
                        errors={methods.errors}
                        register={methods.register}
                    />
                </>)
            }

            <Divider />
            <Space>
                <Input 
                    type="text"
                    name="event_vacant_position"
                    label="Кандидат на должность"
                    placeholder="Введите вакантную должность"
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
                        persons={employees.data}
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
                            {selectedEmployeesTag.name}
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
                                        { value: 'Проведен мониторинг', label: 'Проведен мониторинг' },
                                        { value: 'Проведена проверка', label: 'Выявлено нарушение' },
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
                        {mode === "add" ? "Сохранить" : "Обновить"}
                    </Button>
                </Space>
            </Space>

        </form>
    )
}
export default EventPersonnelMonitoring