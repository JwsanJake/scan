import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { usePersonEvents } from "@/Queries/Event"
import { useGetPersonReport } from "@/Mutators/Person/mutators"
import { useRelations } from "@/shared/hooks/useRelations"
import { personReport } from "@/utils/personReport"
import { Spin, Card, Typography, Flex, Button, Space } from "antd"
const { Text } = Typography
import { SettingOutlined } from '@ant-design/icons'
import moment from "moment"


export const PersonEvents = () => {
    const { id } = useParams()

    const {
        data : events,
        isFetching : eventFetching 
    } = usePersonEvents(id)

    return (
        <>
            {eventFetching 
                ? <Spin/>
                : <PersonEventsView events={events}/>
            }
        </>
    )
}

const PersonEventsView = ({ events }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addEvent } = useRelations()
    const [eventIdentifier, setEventIdentifier] = useState(null)

    const {
        handleSubmit
    } = useForm()

    const report = useGetPersonReport()

    const downloadReport = (identifier) => {
        console.log(identifier)
        setEventIdentifier(identifier)
        onSubmit()
    }

    const editEvent = (identifier) => {
        addEvent(identifier)
        navigate(`/persons/${id}`)
    }

    const onSubmit = handleSubmit(data => {
        data.identifier = id
        console.log(eventIdentifier)
        data.eventIdentifier = eventIdentifier

        report.mutate(data, {
            onSuccess: (response) => {
                personReport(response.data)
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
                    title="Проверка кандидата"
                    bordered="true"
                    style={{ 
                        width: 600,
                        marginTop: "20px",
                    }}
                >
                    <Flex horizontal>
                        <Text strong>Идентификатор:</Text>
                        <p>{item.identifier}</p>
                    </Flex>
                    <Flex horizontal>
                        <Text strong>Автор формы:</Text>
                        <p>{item.event_create_executor}</p>
                    </Flex>
                    <Flex horizontal>
                        <Text strong>Дата начала мероприятия:  </Text>
                        <p>{item.event_start_date != null ? moment(item.event_start_date).format("DD-MM-YYYY") : null}</p>
                    </Flex>
                    <Flex horizontal>
                        <Text strong>Статус мероприятия: </Text>
                        <p>{item.event_status != null ? item.event_status : 'Не указано'}</p>
                    </Flex>
                    <Flex horizontal>
                        <Text strong>Занимаемая должность:</Text>
                        <p>{item.event_vacant_position != null ? item.event_vacant_position : 'Не указано'}</p>
                    </Flex>
                    <Flex>
                        <Text strong>Куда переводится:</Text> 
                        <p>{item.event_transfer_position != null ? item.event_transfer_position  : "Не указано" }</p>
                    </Flex>
                    <Flex>
                        <Text strong>Заключение:</Text>
                        <p>{item.event_executor_conclusion != null ? item.event_executor_conclusion :
                        (<>{item.event_curator_conclusion != null ? item.event_curator_conclusion : "Не указано"}</>) }</p>
                    </Flex>
                    <Flex>
                        <Text strong>Дата завершения мероприятия:</Text>
                        <p>{item.event_end_date != null ? moment(item.event_end_date).format("DD-MM-YYYY") : 'Не указано'}</p>
                    </Flex>
                    <Space direction="vertical">
                        <Button 
                            onClick={() => editEvent(item.identifier)}
                            type="primary"
                            style={{marginTop: "20px"}}
                        >
                            Редактировать
                            <SettingOutlined />
                        </Button>
                        <Button 
                            onClick={() => downloadReport(item.identifier)}
                            type="primary"
                        >
                            Скачать отчет
                        </Button>
                    </Space>
                    
                </Card> 
            ))}
        </>
    )
}