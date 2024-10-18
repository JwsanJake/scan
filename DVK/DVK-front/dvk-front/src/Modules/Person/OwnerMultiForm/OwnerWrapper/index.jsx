import { useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { OwnerMultiForm } from ".."
import CompanyMultiTab from "../../../Company/CompanyMultiForm"



const OwnerWrapper = () => {
    const [identifier, setIdentifier] = useState(null)
    const location = useLocation()
    const url = decodeURI(location.pathname).split('/')

    useMemo(() => {
        if (url[4].includes('ДСОР'))
        {
            setIdentifier('O')
        }
        if (url[4].includes('ДСЛЦ'))
        {
            setIdentifier('P')
        }
    }, [])

    return (
        <>
            {identifier === "O" ?
                <CompanyMultiTab/> : null
            }
            {identifier === "P" ?
                <OwnerMultiForm /> : null
            }
        </>
    )
}
export default OwnerWrapper
