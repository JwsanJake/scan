import React, { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAllEmployees } from "@/Queries/Admin"
import { useSearchedPersons } from "@/Queries/Person"
import { useAddPersonnelCheck, useUpdatePersonnelCheck } from "@/Mutators/Event/mutator"
import { useUserInfo } from "@/shared/hooks/useUserInfo"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { modifyExecutorInfo } from "@/utils/modifyExecutorInfo"
import { Button, Switch, Space, Input, Select, Divider, Typography, Tag, AutoComplete } from "antd"
const { Search } = Input
const { Text } = Typography
import { Input as CustomInput } from "@/shared/components/Input"
import SelectAntd from "@/shared/components/Select"
import DatePickerAntd from "@/shared/components/DatePicker"
import SearchBar from "@/shared/components/SearchBar"
import SearchDropdown from "@/shared/components/SearchBar/SearchDropdown"
import { showSuccess, showError } from "@/utils/toast"
import { SettingOutlined } from '@ant-design/icons'
import { items } from "../example"
import { filterData } from "@/utils/filterPerson"


const EventPersonnelCheck = ({ event, mode }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEvent } = useRelations()
    const [searchedEmployees, setSearchedEmployees] = useState([])
    const [searchedPersons, setSearchedPersons] = useState()
    const [selectedEmployeesTag, setSelectedEmployeesTag] = useState(null)
    const [selectedPersonsTag, setSelectedPersonsTag] = useState(null)
    const [isDirector, setIsDirector] = useState(false)

    const persons = useSearchedPersons()
    const [value, setSearchValue] = useState(null)
    const [variants, setVariants] = useState([])
    const [placeholder, setPlaceholder] = useState("Поиск по ИИН")
    const [searchParameter, setSearchParameter] = useState('iin')
    const [dataSource, setDataSource] = useState(persons)
    const [selectedPerson, setSelectedPerson] = useState(null)
    const { userInfo } = useUserInfo()
    const executor = userInfo != null ? modifyExecutorInfo(userInfo.userName) : null
    const role = userInfo != null ? userInfo.userName.role_id : null

    //const isSupervisor = null //userInfo != null ? userInfo.accesses.find((item) => (item.access_id === 3)) : true

    const employeesRef = useRef(null)
    const personsRef = useRef(null)
    useOutsideClick(employeesRef, () => setSearchedEmployees())
    useOutsideClick(personsRef, () => setSearchedPersons())

    const methods = useForm({
		defaultValues: {
            ...event,
            event_status: event === null ? "В работе" : event.event_status
        },
	})

    const addEventPersonnel = useAddPersonnelCheck()
    const updateEventPersonnel = useUpdatePersonnelCheck()
    const employees = useAllEmployees()
    

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id
        data.role_id = role
        
            try {
                updateEventPersonnel.mutate(data, {
                    onSuccess: () => {
                        showSuccess("Обновлены данные о проверке кандидата")
                        navigate(`/events`)
                    }
                })
            }
            catch (error) {
                showError("Не удалось обновить данные о проверке кандидата")
            }
    })


    const addSubject = methods.handleSubmit(data => {
        console.log(selectedPerson)
        data.event_create_executor = executor.executor
        data.executor_subdivision = executor.subdivision
        data.role_id = role
        data.is_supervisor = isDirector


        try {
            if (selectedPerson != null) {
                data.event_subject = selectedPerson
                addEventPersonnel.mutate(data, {
                    onSuccess: (response) => {
                        showSuccess(`${response.data}`)
                        addEvent(response.data)
                        navigate(`/persons/${selectedPerson}`)
                    },
                    onError: () => {
                        showError("Не удалось добавить проверку кандидата")
                    },
                })
            }
            else {
                addEventPersonnel.mutate(data, {
                    onSuccess: (response) => {
                        showSuccess(`${response.data}`)
                        addEvent(response.data)
                        navigate(`/persons/add`)
                    },
                    onError: () => {
                        showError("Не удалось добавить проверку кандидата")
                    },
                })
            }
        }
        catch (error) {
            showError(error)
        }  
    })

    const editEvent = () => {
        addEvent(id)
        const identifier = methods.watch('event_subject')
        navigate(`/persons/${identifier}`)
    }
    
    const onChange = (e) => {
        setIsDirector(e)
    }

    return (
        <>
            <form
                onReset={methods.reset}
            >
                <Space style={{ marginTop: "20px" }}>
                    <DatePickerAntd 
                        name="event_start_date"
                        placeholder="Выберите дату"
                        label="Дата начала мероприятия"
                        control={methods.control}
                        rules={{ required: true, message: "" }}
                    />
                    <DatePickerAntd 
                        name="event_control_date"
                        placeholder="Выберите дату"
                        label="Дата контроля"
                        control={methods.control}
                        rules={{ required: true }}
                    />
                    <SelectAntd
                        name="event_status"
                        placeholder="Выберите статус"
                        label="Статус для учета"
                        control={methods.control}
                        options={[
                            { value: 'Окончено', label: 'Окончено' },
                            { value: 'В работе', label: 'В работе' },
                        ]}
                    />

                    <CustomInput 
                        type="text"
                        name="event_outgoing_doc"
                        label="Номер исходящего документа"
                        placeholder="Введите номер исходящего документа"
                        errors={methods.errors}
                        register={methods.register}
                    />

                    <CustomInput 
                        type="text"
                        name="event_doc_ground"
                        label="Номер документа основания"
                        placeholder="Введите номер документа основания"
                        errors={methods.errors}
                        register={methods.register}
                    />
                </Space>
                <Divider />

                <Space>
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
                                <Text strong>Субъект (Поиск по лицу)</Text>
                                <Space>
                                    <Space direction="vertical">
                                       
                                        <Space>
                                            <SearchBar 
                                                placeholder="Поиск по лицам из бд"
                                                searchedPerson={setSearchedPersons}
                                                persons={persons != null ? persons.data : []}
                                            />
                                            {selectedPersonsTag != null ?
                                                <Space>
                                                    <Button type="primary" onClick={() => {setSelectedPerson(selectedPersonsTag.identifier), addSubject()}}>
                                                        Добавить 
                                                        <Text 
                                                        //onClick={() => setSelectedPerson(selectedPersonsTag.identifier)} 
                                                        strong style={{ marginLeft: "10px" }}
                                                        >
                                                            {selectedPersonsTag.name}
                                                        </Text> 
                                                    </Button>
                                                    Либо
                                                </Space>
                                                : null}
                                        </Space>
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
                                    </Space>
                                    
                                    <Button onClick={() => addSubject('new')} type="primary">
                                        Добавить новое лицо
                                    </Button>
                                    
                                </Space>
                            </Space>
                        </>) 
                        : (<Space>
                            <CustomInput 
                                type="text"
                                name="event_subject"
                                label="Субъект"
                                placeholder="Введите субъект"
                                errors={methods.errors}
                                register={methods.register}
                            />
                            <Button
                                type="primary"
                                style={{ marginTop: "28px"}}
                                onClick={() => editEvent()}
                            >
                                Редактировать
                                <SettingOutlined/>
                            </Button>
                        </Space>)
                    }
                </Space>

                <Divider />

                <Space>
                    <CustomInput 
                        type="text"
                        name="event_vacant_position"
                        label="Кандидат на должность"
                        placeholder="Введите вакантную должность"
                        errors={methods.errors}
                        register={methods.register}
                    />
                    <CustomInput 
                        type="text"
                        name="event_transfer_position"
                        label="Перевод с должности"
                        placeholder="Введите текущую должность кандидата"
                        errors={methods.errors}
                        register={methods.register}
                    />

                    <Space direction="vertical">
                        <Text strong>На руководящую должность</Text>
                        <Controller 
                            name="is_supervisor"
                            control={methods.control}
                            render={( {field}) => (
                                <Switch 
                                    {...field}
                                    defaultChecked={isDirector} 
                                    onChange={onChange} 
                                />
                            )}
                        />
                    </Space>
                    
                </Space>
                <CustomInput 
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
                        <Text strong>Исполнитель</Text>
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
                        : null}
                    </Space>

                    <Divider />
                
                    <Space>
                        <SelectAntd 
                            name="event_result"
                            placeholder="Выберите результаты мероприятия"
                            label="Результат мероприятия"
                            control={methods.control}
                            options={[
                                { value: 'Проведена проверка', label: 'Проведена проверка' },
                                { value: 'Приостановлено', label: 'Приостановлено' },
                            ]}
                        />
                        
                        {role === 1 ? 
                            (   <SelectAntd 
                                    name="event_executor_conclusion"
                                    placeholder="Выберите результат мероприятия"
                                    label="Заключение исполнителя"
                                    control={methods.control}
                                    options={[
                                                { value: 'Согласовано', label: 'Согласовано' },
                                                { value: 'Не согласовано', label: 'Не согласовано' },
                                            ]}
                                />
                            ) 
                            : (
                            <SelectAntd 
                                name="event_curator_conclusion"
                                placeholder="Выберите результат мероприятия"
                                label="Заключение куратора"
                                control={methods.control}
                                options={[
                                    { value: 'Согласовано', label: 'Согласовано' },
                                    { value: 'Не согласовано', label: 'Не согласовано' },
                                ]}
                            />
                            )
                        }

                        <CustomInput 
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
        </>
    )
}
export default EventPersonnelCheck