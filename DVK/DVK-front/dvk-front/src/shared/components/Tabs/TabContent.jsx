import { TabContentContainer } from "./Styles"


const TabContent = ({ id, activeTab, children }) => {
    return activeTab === id ? (
        <TabContentContainer>{children}</TabContentContainer>
    ) : null
}
export default TabContent