import { useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useUserInfo } from "@/shared/hooks/useUserInfo"
import { useUpdateContractorCheck } from "@/Mutators/Event/mutator"
import { Card, Space, Typography, Select, Button } from "antd"
const { Text } = Typography
import { SettingOutlined } from '@ant-design/icons'
import moment from "moment"
import { showSuccess, showError } from "@/utils/toast"
import { editRoles, approveRoles } from "@/utils/roles"


const EventContractorCheckView = ({event}) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { userInfo } = useUserInfo()
    const role = userInfo != null ? userInfo.userName.role_id : null

    const methods = useForm({
		defaultValues: {
            ...event,
        },
	})

    const updateEventContractor = useUpdateContractorCheck()

    const clickToPage = () => {
        navigate(`/events/${id}`)
    }

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id
        data.role_id = role
        
            try {
                updateEventContractor.mutate(data, {
                    onSuccess: () => {
                        showSuccess("Обновлены данные о проверке контрагента")
                        navigate(`/events`)
                    }
                })
            }
            catch (error) {
                showError("Не удалось обновить данные о проверке контрагента")
            }
    })

    const onNavigate = (event) => {
        navigate(`/companies/view/${event}`)
    }

    return (
        <Card
            title="Проверка контрагента"
            bordered="true"
            style={{
                width: 800
            }}
        >
            <Space direction="vertical">
                <Space>
                    <Text strong>Идентификатор мероприятия:</Text>
                    <p>{event.identifier}</p>
                </Space>
                <Space>
                    <Text strong>Автор формы:</Text>
                    <p>{event.event_create_executor}</p>
                </Space>
                <Space>
                    <Text strong>Подразделение автора:</Text>
                    <p>{event.executor_subdivision}</p>
                </Space>
                <Space>
                    <Text strong>Статус мероприятия:</Text>
                    <p>{event.event_status}</p>
                </Space>
                <Space>
                    <Text strong>Дата заведения мероприятия:</Text>
                    <p>{moment(event.event_start_date).format("DD-MM-YYYY")}</p>
                </Space>
                <Space>
                    <Text strong>Дата контроля:</Text>
                    <p>{moment(event.event_control_date).format("DD-MM-YYYY")}</p>
                </Space>
                <Space>
                    <Text strong>Номер исходящего документа:</Text>
                    <p>{event.event_outgoing_doc}</p>
                </Space>
                <Space>
                    <Text strong>Номер документа основания:</Text>
                    <p>{event.event_doc_ground}</p>
                </Space>
                <Space>
                    <Text strong>Идентификатор контрагента:</Text>
                    <Text onClick={() => onNavigate(event.event_subject)} underline strong type="success">{event.event_subject}</Text>
                </Space>
                <Space>
                    <Text strong>Содержание мероприятия:</Text>
                    <p>{event.event_content}</p>
                </Space>
                <Space>
                    <Text strong>Предмет договора:</Text>
                    <p>{event.event_subject_of_contract}</p>
                </Space>
                <Space>
                    <Text strong>Сумма договора:</Text>
                    <p>{event.event_contract_amount}</p>
                </Space>
                <Space>
                    <Text strong>Заключение исполнителя:</Text>
                    <p>{event.event_executor_conclusion}</p>
                </Space>
                <Space>
                    <Text strong>Заключение куратора:</Text>
                    <p>{event.event_curator_conclusion}</p>
                    {event.event_curator_conclusion === null && role === 2 &&
                        <Controller 
                            name="event_curator_conclusion"
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
                    }
                </Space>
                <Space>
                    <Text strong>Заключение начальника УЭБ:</Text>
                    <p>{event.event_supervisor_1_conclusion}</p>
                    {event.event_supervisor_1_conclusion === null && role === 3 &&
                        <Controller 
                            name="event_supervisor_1_conclusion"
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
                    }
                </Space>
                <Space>
                    <Text strong>Заключение начальника ОБ:</Text>
                    <p>{event.event_supervisor_2_conclusion}</p>
                    {event.event_supervisor_2_conclusion === null && role === 4 &&
                        <Controller 
                            name="event_supervisor_2_conclusion"
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
                    }
                </Space>
                <Space>
                    <Text strong>Дата завершения мероприятия:</Text>
                    <p>{event.event_end_date != null ? moment(event.event_end_date).format("DD-MM-YYYY") : "Не указано"}</p>
                </Space>

                <Space>
                    {editRoles.includes(role) &&
                        <Button 
                            onClick={clickToPage}
                            type="primary"
                        >
                            Редактировать
                            <SettingOutlined />
                        </Button>
                    }
                    {approveRoles.includes(role) &&
                        <Button 
                            onClick={onSubmit}
                            type="primary"
                        >
                            Согласовать
                        </Button>
                    }
                </Space>
            </Space>
        </Card>
    )
}
export default EventContractorCheckView