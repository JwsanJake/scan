import { getAllEvents, getEventById } from "@/Queries/Event"
import dayjs from "dayjs"
import moment from "moment"

export const mapAllEvents = async (id) => {
    const events = await getAllEvents()

    const mappedEvents = events != null
        ? events.map((event) => ({
            identifier: event.identifier,
            event_start_date: event.event_start_date != null ?
                moment(event.event_start_date).format('DD-MM-YYYY') : 'не указано',
            event_doc_ground: event.event_doc_ground,
            event_step: event.event_step,
            event_subject: event.event_subject,
            event_conclusion : event.event_executor_conclusion != null ? event.event_executor_conclusion : event.event_curator_conclusion,
            event_conclusion: event.event_supervisor_2_conclusion,
            event_type: event.event_type,
        }))
        : []
    
    return { data: mappedEvents }
}

export const mapEventByType = async (id) => {
    const event = await getEventById(id)
    let mappedEvent = {}

    switch(event.event_type) {
        case 'personnel_check': 
            mappedEvent = {
                event_type: event.event_type,
                register_number: event.register_number,
                event_create_executor: event.event_create_executor,
                executor_subdivision: event.executor_subdivision,
                event_start_date: dayjs(event.event_start_date),
                event_control_date: dayjs(event.event_control_date),
                event_status: event.event_status,
                event_outgoing_doc: event.event_outgoing_doc,
                event_doc_ground: event.event_doc_ground,
                event_object: event.event_object,
                event_subject: event.event_subject,
                event_vacant_position: event.event_vacant_position,
                event_transfer_position: event.event_transfer_position,
                event_content: event.event_content,
                event_result: event.event_result,
                event_executor_conclusion: event.event_executor_conclusion,
                event_curator_conclusion: event.event_curator_conclusion,
                event_conclusion_description: event.event_conclusion_description,
                event_supervisor_1_conclusion: event.event_supervisor_1_conclusion,
                event_supervisor_2_conclusion: event.event_supervisor_2_conclusion,
                event_supervisor_description: event.event_supervisor_description,
                event_end_date: dayjs(event.event_end_date)
            }
        break
        case 'contractors_check':
            mappedEvent = {
                event_type: event.event_type,
                register_number: event.register_number,
                event_create_executor: event.event_create_executor,
                executor_subdivision: event.executor_subdivision,
                event_start_date: dayjs(event.event_start_date),
                event_control_date: dayjs(event.event_control_date),
                event_status: event.event_status,
                event_outgoing_doc: event.event_outgoing_doc,
                event_doc_ground: event.event_doc_ground,
                event_object: event.event_object,
                event_subject: event.event_subject,
                event_subject_of_contract: event.event_subject_of_contract,
                event_contract_amount: event.event_contract_amount,
                event_content: event.event_content,
                event_result: event.event_result,
                event_executor_conclusion: event.event_executor_conclusion,
                event_curator_conclusion: event.event_curator_conclusion,
                event_supervisor_1_conclusion: event.event_supervisor_1_conclusion,
                event_supervisor_2_conclusion: event.event_supervisor_2_conclusion,
                event_supervisor_description: event.event_supervisor_description,
                event_end_date: dayjs(event.event_end_date)
            }
        break
    }

    return mappedEvent
}