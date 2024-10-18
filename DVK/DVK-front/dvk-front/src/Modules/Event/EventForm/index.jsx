import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Select, Button, Space, Spin, Typography } from "antd"
const { Text } = Typography
import SelectAntd from "@/shared/components/Select"
import { useParams } from "react-router-dom"
import { useEventById } from "@/Queries/Event"
import EventPersonnelCheck from "./EventPersonnelCheck"
import EventContractorCheck from "./EventContractorCheck"
import EventPersonnelMonitoring from "./EventPersonnelMonitoring"
import EventContractorMonitoring from "./EventContractorMonitoring"
import EventInformationSearchActivity from "./EventInformationSearchActivity"


export const EventPage = () => {
    const { id } = useParams()
    const mode = id ? 'edit' : 'add'

    const { 
        data: event,
        isFetching : eventFetching,
    } = useEventById(id)

    return (
        <>
            {mode === 'add' ?
                (<EventForm mode={mode}/>)
                : (<>
                    {eventFetching
                    ? <Spin/>
                    : 
                    <EventForm 
                        event={event}
                        mode={mode}
                    />}
                </>)
            }
        </>
    )
}


const eventTypes = [
    { value: 'personnel_check', label: "Проверка кандидата/персонала" },
    { value: 'contractors_check', label: "Проверка контрагентов" },
    { value: 'personnel_monitoring', label: "Мониторинг персонала" },
    { value: 'contractors_monitoring', label: "Мониторинг контрагентов" },
    { value: 'information_search_activity', label: "Информационно-поисковые мероприятия" },
]


export const EventForm = ({ event = null, mode }) => {
    const [eventType, setEventType] = useState(event != null ? event.event_type : null)

    const selectEventType = (item) => {
        setEventType(item)
    }

    const methods = useForm({
        defaultValues: event
    })

    const events = [{
        key: "personnel_check",
        component: <EventPersonnelCheck event={event} mode={mode} key="personnel_check"/>
    }, {
        key: "contractors_check",
        component: <EventContractorCheck event={event} mode={mode} key="contractors_check"/>
    }, {
        key: "personnel_monitoring",
        component: <EventPersonnelMonitoring event={event} mode={mode} key="personnel_monitoring"/>
    }, {
        key: "contractors_monitoring",
        component: <EventContractorMonitoring event={event} mode={mode} key="contractors_monitoring"/>
    }, {
        key: "information_search_activity",
        component: <EventInformationSearchActivity event={event} mode={mode} key="information_search_activity"/>
    }, ]

    return (
        <>  
            <Space direction="vertical">
                {mode === "add" ? 
                    (<>
                        <Text strong>Вид мероприятия</Text>
                        <Select
                            placeholder="Выберите вид мероприятия"
                            options={eventTypes}
                            onChange={selectEventType}
                            style={{ width: "300px"}}
                        />
                    </>) 
                    : (<>
                        <SelectAntd 
                            name="event_type"
                            placeholder="Выберите вид мероприятия"
                            label="Вид мероприятия"
                            control={methods.control}
                            options={eventTypes}
                        />
                    </>)}
                
            </Space>
            {mode === "add" ? (<>
                {events.filter(event => event.key === eventType).map((event) => (
                        event.component
                ))} 
                </>) 
                
                : (<>
                    {events.find(eventItem => eventItem.key === eventType).component}
                </>)
            }
        </>
    )
}



