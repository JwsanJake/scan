import React, { useContext, useState, createContext } from "react"
import { useLocation } from "react-router-dom"
import { showError } from "@/utils/toast"


const TabContext = createContext({})

export const TabProvider = ({ children }) => {
    const [currentTab, setCurrentTab] = useState(1)
    const [parentIds, setParentIds] = useState([])
    const [affiliationType, setAffiliationType] = useState(null)

    const location = useLocation()

    const next = () => setCurrentTab(currentTab + 1)

    const prev = () => setCurrentTab(currentTab - 1)

    const reset = () => setCurrentTab(1)

    const move = (key) => {
        if (location.pathname.includes('add')) {
            showError("Заполните установочные данные")
            return
        }
        
        setCurrentTab(key)
    }

    const addParent = (id) => {
        const changedParents = [...parentIds] 
        if (!changedParents.includes(id)) {
            changedParents.push(id)
            setParentIds(changedParents)
        }
    }

    const addAffType = (affType) => {
        setAffiliationType(affType)
    }

    return (
        <TabContext.Provider value={{ setCurrentTab, currentTab, parentIds, addParent, next, prev, reset, 
            move,  affiliationType, addAffType }}>
            {children}
        </TabContext.Provider>
    )
} 

export const useMultitab = () => {
    const { currentTab, parentIds, addParent, next, prev, reset, move, affiliationType, addAffType } = useContext(TabContext)
    
    return {
        currentTab, 
        parentIds,
        addParent,
        next,
        prev,
        reset,
        move,
        affiliationType,
        addAffType,
    }
}