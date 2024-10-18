import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useEventByIdView } from "@/Queries/Event"
import { Spin } from "antd"
import EventPersonnelCheckView from "./EventPersonnelCheckView"
import EventContractorCheckView from "./EventContractorCheckView"

export const Events = () => {
    const { id } = useParams()

    const {
        data: event,
        isFetching : eventFetching,
    } = useEventByIdView(id)


    return (
        <>
            {eventFetching
                ? <Spin/>
                : <EventView event={event}/> 
            }
        </>
    )
}

const EventView = ({ event = null }) => {
    const [eventType, setEventType] = useState(event != null ? event.event_type : null)


    const events = [{
        key: 'personnel_check',
        component: <EventPersonnelCheckView event={event} />
    }, {
        key: "contractors_check",
        component: <EventContractorCheckView event={event} />
    }]

    return (
        <>
            {events.find(eventItem => eventItem.key === eventType).component}
        </>
    )
}