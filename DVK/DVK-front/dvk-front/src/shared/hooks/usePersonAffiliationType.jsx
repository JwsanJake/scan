import React, { useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

export const usePersonAffiliationType = () => {
    const [identifier, setIdentifier] = useState(null)
    const [mode, setMode] = useState('add')
    const [affiliationType, setAffiliationType] = useState(null)

    const location = useLocation()
    const url = decodeURI(location.pathname).split('/')

    useMemo(() => {
        if (url[4] != 'add') {
            setIdentifier(url[4])
        }
        if (url[3] === "director") {
            setAffiliationType("director")
        }
        if (url[3] === "owner") {
            setAffiliationType("owner")
        }
        if (url[3] === "affiliated") {
            setAffiliationType("affiliated")
        }
        if (url[4] != 'add') {
            setMode('edit')
        }
    }, [])

    return {
        identifier,
         affiliationType,
         mode,
    }
}