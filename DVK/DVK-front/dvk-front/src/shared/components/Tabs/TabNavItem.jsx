import React from "react"
import { CancelButton, TabHeaderText, TabNavContainer } from "./Styles"
import "./Styles.css"


const TabNavItem = ({
    id,
    title,
    onClick,
    activeTab,
}) => {

    return (
        <TabNavContainer className={activeTab === id ? "active-tab" : ""}>
            <TabHeaderText onClick={onClick}>{title}</TabHeaderText>
        </TabNavContainer>
    )
}
export default TabNavItem