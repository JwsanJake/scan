import { createContext, useContext, useState } from "react"

const StateContext = createContext({
    currentUser: null,
    notification: null,
    setUser: () => {},
    setNotification: () => {},
})

export const ContextProvider = ({ children}) => {
    const [user, setUser] = useState({})
    const [notification, _setNotification] = useState(null)

    const setNotification = (message) => {
        _setNotification(message)

        setTimeout(() => {
            _setNotification()
        }, 5000)
    }

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


export const ContextConsumer = ({ children }) => {

    const context = useStateContext()

    return (
        <StateContext.Consumer>{children}</StateContext.Consumer>
    )
}

export const useStateContext = () => useContext(StateContext)

