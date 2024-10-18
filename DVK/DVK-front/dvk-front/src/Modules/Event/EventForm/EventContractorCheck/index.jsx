import React, { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { useAllEmployees } from "@/Queries/Admin"
import { useSearchedCompanies } from "@/Queries/Company"
import { useAddContractorCheck, useUpdateContractorCheck } from "@/Mutators/Event/mutator"
import { useOutsideClick } from "@/shared/hooks/useOutsideClick"
import { modifyExecutorInfo } from "@/utils/modifyExecutorInfo"
import { Button, Cascader, Space, Typography, Divider, Tag } from "antd"
const { Text } = Typography
import { Input } from "@/shared/components/Input"
import SelectAntd from "@/shared/components/Select"
import DatePickerAntd from "@/shared/components/DatePicker"
import SearchBar from "@/shared/components/SearchBar"
import { showSuccess, showError } from "@/utils/toast"
import { SettingOutlined } from '@ant-design/icons'
import { useUserInfo } from "@/shared/hooks/useUserInfo"
import { items } from "../example"


const EventContractorCheck = ({ event, mode }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEvent } = useRelations()
    const [searchedEmployees, setSearchedEmployees] = useState([])
    const [searchedCompanies, setSearchedCompanies] = useState()
    const [selectedEmployeesTag, setSelectedEmployeesTag] = useState(null)
    const [selectedCompaniesTag, setSelectedCompaniesTag] = useState(null)
    const { userInfo } = useUserInfo()

    const executor = userInfo != null ? modifyExecutorInfo(userInfo.userName) : null
    const role = userInfo != null ? userInfo.userName.role_id : null

    const employeesRef = useRef(null)
    const companiesRef = useRef(null)
    useOutsideClick(employeesRef, () => setSearchedEmployees())
    useOutsideClick(companiesRef, () => setSearchedCompanies())

    const methods = useForm({
        defaultValues: { 
            ...event,
            event_status: event === null ? "В работе" : event.event_status
        },
    })

    const addEventContractor = useAddContractorCheck()
    const updateEventContractor = useUpdateContractorCheck()
    const employees = useAllEmployees()
    const companies = useSearchedCompanies()

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id
        data.role_id = role

        try {
            updateEventContractor.mutate(data, {
                onSuccess: () => {
                    showSuccess("Обновлены данные о проверке контрагента")
                    navigate(`/events`)
                },
                onError: () => {
                    showError("Не удалось обновить данные о проверке контрагента")
                },
            })
        }
        catch (error) {
            showError(error)
        }
    })


    const addSubject = methods.handleSubmit(data => {
        data.event_create_executor = executor.executor
        data.executor_subdivision = executor.subdivision
        data.role_id = role

        try {
            addEventContractor.mutate(data, {
                onSuccess: (response) => {
                    showSuccess("Добавлены данные о проверке контрагента")
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
        console.log(identifier)
        navigate(`/companies/${identifier}`)
    }
        

    return (
        <>
            <form
                onReset={methods.reset}
            >
                <Space>
                    <DatePickerAntd 
                        name="event_start_date"
                        placeholder="Выберите дату"
                        label="Дата начала мероприятия"
                        control={methods.control}
                        //errors={methods.errors}
                    />
                    <DatePickerAntd 
                        name="event_control_date"
                        placeholder="Выберите дату"
                        label="Дата контроля"
                        control={methods.control}
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

                    <Input 
                        type="text"
                        name="event_outgoing_doc"
                        label="Номер исходящего документа"
                        placeholder="Введите номер исходящего документа"
                        errors={methods.errors}
                        register={methods.register}
                    />

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

                <Space>
                    <Input 
                        type="text"
                        name="event_object"
                        label="Объект"
                        placeholder="Введите объект"
                        errors={methods.errors}
                        register={methods.register}
                    />

                    <SelectAntd 
                        name="event_object"
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
                                <Text strong>Субъект</Text>
                                <Space>
                                    <SearchBar
                                        placeholder="Поиск по компаниям из бд"
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
                                    <Button onClick={() => addSubject()} type="primary">
                                        Добавить новую компанию
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
                        <Text strong>Исполнитель</Text>
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

                    <SelectAntd
                        name="event_result"
                        placeholder="Выберите результат мероприятия"
                        label="Результат мероприятия"
                        control={methods.control}
                        options={[
                            { value: 'Проведена проверка', label: 'Проведена проверка' },
                            { value: 'Приостановлено', label: 'Приостановлено' },
                        ]}
                    />

                    {role === 1 ?
                        (<SelectAntd
                                name="event_executor_conclusion"
                                placeholder="Выберите результат мероприятия"
                                label="Заключение исполнителя"
                                control={methods.control}
                                options={[
                                    { value: 'Согласовано', label: 'Согласовано' },
                                    { value: 'Не согласовано', label: 'Не согласовано' },
                                ]}
                            />) 
                        : (<SelectAntd
                            name="event_curator_conclusion"
                            placeholder="Выберите результат мероприятия"
                            label="Заключение куратора"
                            control={methods.control}
                            options={[
                                { value: 'Согласовано', label: 'Согласовано', step: 1 },
                                { value: 'Не согласовано', label: 'Не согласовано' },
                            ]}
                        />)
                    }
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
            </form>
        </>
    )
}
export default EventContractorCheck