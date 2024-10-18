import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useContractorEvents } from "@/Queries/Event"
import { useGetCompanyReport } from "@/Mutators/Company/mutators"
import { useRelations } from "@/shared/hooks/useRelations"
import { companyReport } from "@/utils/companyReport"
import { Spin, Card, Typography, Space, Button } from "antd"
const { Text } = Typography
import { SettingOutlined } from '@ant-design/icons'
import moment from "moment"


export const CompanyEvents = () => {
    const { id } = useParams()

    const {
        data : events,
        isFetching : eventsFetching
    } = useContractorEvents(id)

    return (
        <>
            {eventsFetching
                ? <Spin/>
                : <CompanyEventsView events={events}/>
            }
        </>
    )
}

const CompanyEventsView = ({ events }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEvent } = useRelations()
    const [eventIdentifier, setEventIdentifier] = useState(null)

    const {
        handleSubmit
    } = useForm()

    const report = useGetCompanyReport()

    const downloadReport = (identifier) => {
        setEventIdentifier(identifier)
        onSubmit()
    }

    const editEvent = (identifier) => {
        addEvent(identifier)
        navigate(`/companies/${id}`)
    }

    const onSubmit = handleSubmit(data => {
        data.identifier = id,
        data.eventId = eventIdentifier

        report.mutate(data, {
            onSuccess: (response) => {
                companyReport(response.data)
            },
            onError: () => {
                showError("Не удалось сформировать отчет")
            }
        })
    })

    return (
        <>
            {events.map((item) => (
                <Card
                    title="Проверка контрагента"
                    bordered="true"
                    style={{ 
                        width: 600,
                        marginTop: "20px",
                    }}
                >
                    <Space direction="vertical">
                        <Space>
                            <Text strong>Идентификатор:</Text>
                            <p>{item.identifier}</p>
                        </Space>
                        <Space>
                            <Text strong>Автор формы:</Text>
                            <p>{item.event_create_executor}</p>
                        </Space>
                        <Space>
                            <Text strong>Дата начала мероприятия:  </Text>
                            <p>{item.event_start_date != null ? moment(item.event_start_date).format("DD-MM-YYYY") : "Не указано"}</p>
                        </Space>
                        <Space>
                            <Text strong>Статус мероприятия: </Text>
                            <p>{item.event_status != null ? item.event_status : "Не указано"}</p>
                        </Space>
                        <Space>
                            <Text strong>Предмет договора:</Text>
                            <p>{item.event_subject_of_contract != null ? item.event_subject_of_contract : "Не указано"}</p>
                        </Space>
                        <Space>
                            <Text strong>Сумма договора:</Text> 
                            <p>{item.event_contract_amount != null ? item.event_contract_amount  : "Не указано" }</p>
                        </Space>
                        <Space>
                            <Text strong>Заключение:</Text>
                            <p>{item.event_conclusion != null ? item.event_conclusion : 'Не указано'}</p>
                        </Space>
                        <Space>
                            <Text strong>Дата завершения мероприятия:</Text>
                            <p>{item.event_end_date != null ? moment(item.event_end_date).format("DD-MM-YYYY") : 'Не указано'}</p>
                        </Space>

                        <Space direction="vertical" style={{ marginTop: "20px" }}>
                            <Button 
                                type="primary"
                                onClick={() => editEvent(item.identifier)}
                            >
                                Редактировать
                                <SettingOutlined />
                            </Button>
                            <Button 
                                type="primary"
                                onClick={() => downloadReport(item.identifier)}
                            >
                                Скачать отчет
                            </Button>
                        </Space>
                        
                    </Space>
                </Card>
            ))}
        </>
    )
}