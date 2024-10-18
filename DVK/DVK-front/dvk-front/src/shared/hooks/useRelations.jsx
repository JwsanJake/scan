import React, { useContext, useState, createContext } from "react"


const RelationContext = createContext({})

export const RelationProvider = ({ children }) => {
    const [eventIdentifier, setEventIdentifier] = useState(localStorage.getItem('event'))
    const [violationIdentifier, setViolationIdentifier] = useState(null)
    const [violationType, setViolationType] = useState(null)

    const addEvent = (identifier) => {
        localStorage.setItem('event', identifier)
        setEventIdentifier(identifier)
    }

    const addViolation = (identifier) => {
        localStorage.setItem('violation', identifier)
        setViolationIdentifier(identifier)
    }

    const addViolationType = (type) => {
        setViolationType(type)
    }

    return (
        <RelationContext.Provider value={{ eventIdentifier, addEvent, violationIdentifier, addViolation, violationType, addViolationType }}>
            { children }
        </RelationContext.Provider>
    )
}

export const useRelations = () => {
    const { eventIdentifier, addEvent, violationIdentifier, addViolation, violationType, addViolationType } = useContext(RelationContext)

    return {
        eventIdentifier,
        addEvent,
        violationIdentifier,
        addViolation,
        violationType,
        addViolationType,
    }
}
