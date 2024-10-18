import { useState } from "react"
import { useParams } from "react-router-dom"
import { useViolationById } from "@/Queries/Violation"
import { useRelations } from "@/shared/hooks/useRelations"
import ViolationPersonnelMonitoring from "./ViolationPersonnelMonitoring"
import ViolationContractorMonitoring from "./ViolationContractorMonitoring"
import ViolationInformationSearchActivity from "./ViolationInformationSearchActivity"


export const ViolationPage = () => {
    const { id } = useParams()
    const mode = id ? 'edit' : 'add'
    
    const { 
        data: event,
        isFetching : eventFetching,
    } = useViolationById(id)

    return (
        <>
            {mode === 'add' ?
                (<ViolationForm mode={mode}/>)
                : (<>
                    {eventFetching
                        ? <Spin/>
                        : 
                        <ViolationForm 
                            event={event}
                            mode={mode}
                    />}
                </>)
            }
        </>
    )
}


export  const ViolationForm = ({ violation = null, mode, key }) => {
    const [violationTypee, setEventType] = useState(violation != null ? violation.violation_type : null)

    const { violationType } = useRelations()

    const violations = [{
        key: "personnel_monitoring",
        component: <ViolationPersonnelMonitoring violation={violation} mode={mode}/>
    }, {
        key: "contractors_monitoring",
        component: <ViolationContractorMonitoring violation={violation} mode={mode}/>
    }, {
        key: "information_search_activity",
        component: <ViolationInformationSearchActivity violation={violation} mode={mode}/>
    },]


    return (
        <>
            {mode === "add" ? (<>
                {violations.filter(violation => violation.key === violationType).map((violation) => (
                    violation.component
                ))}
            </>) 
            : (<>
                {violations.find(violationItem => violationItem.key === violationTypee).component}
            </>)}
        </>
    )
}
