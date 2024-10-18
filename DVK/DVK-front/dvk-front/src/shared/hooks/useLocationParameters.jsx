import React, { useState, useMemo } from "react"
import { useLocation } from "react-router-dom"


export const useLocationParameters = () => {
    const [identifier, setIdentifier] = useState(null)
    const [mode, setMode] = useState('add')
    const [parentId, setParentId] = useState(null)
  
    const location = useLocation()
    const url = decodeURI(location.pathname).split('/')
    
    useMemo(() => {
        if (url.length > 3 && url.includes('add'))
        {
            setParentId(url[2])
        }
        
        if (url.length > 3 && url[4] != 'add') {
            setMode('edit')
            setParentId(url[2])
            setIdentifier(url[4])
        }
        if (url.length == 3 && url[2] != 'add') {
            setIdentifier(url[2])
            setMode('edit')
        }
    }, [])

    return {
        identifier,
        parentId,
        mode,
    }
}