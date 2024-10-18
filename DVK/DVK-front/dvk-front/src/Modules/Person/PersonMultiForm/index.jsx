import React from "react"
import { TabProvider, useMultitab } from "@/shared/hooks/useMultitab"
import { TabContainer, TabsWrapper } from "@/shared/components/Tabs/Styles"
import  TabNavItem  from "@/shared/components/Tabs/TabNavItem.jsx"
import  TabContent  from "@/shared/components/Tabs/TabContent.jsx"
import { PersonAffiliationsPage } from "../PersonMultiForm/PersonAffiliationsPage"
import { PersonBaseInfoPage } from "../PersonMultiForm/PersonBaseInfoPage"
import { PersonCareerPage } from "../PersonMultiForm/PersonCareerPage"
import { PersonEducationPage } from "../PersonMultiForm/PersonEducationPage"
import { PersonFamilyStatusPage } from "../PersonMultiForm/PersonFamilyStatusPage"
import { PersonFinancialSolvencyPage } from "../PersonMultiForm/PersonFinancialSolvencyPage"
import { PersonNegativeInfoPage } from "../PersonMultiForm/PersonNegativeInfoPage"


const PersonMultiTab = () => {

    return (
        <TabProvider>
            <PersonTabs />
        </TabProvider>
    )
}
export default PersonMultiTab
    


const PersonTabs = () => {
    const { currentTab, move } = useMultitab()

    return (
        <>
            <TabContainer>
                <TabNavItem
                    id={1}
                    title={"Установочные данные"}
                    activeTab={currentTab}
                    onClick={() => move(1)}
                />
                <TabNavItem
                    id={2}
                    title={"Образование"}
                    activeTab={currentTab}
                    onClick={() => move(2)}
                />
                <TabNavItem
                    id={3}
                    title={"Семейное положение"}
                    activeTab={currentTab}
                    onClick={() => move(3)}
                />
                <TabNavItem
                    id={4}
                    title={"Трудовая деятельность"}
                    activeTab={currentTab}
                    onClick={() => move(4)}
                />
                <TabNavItem
                    id={5}
                    title={"Финансовая состоятельность"}
                    activeTab={currentTab}
                    onClick={() => move(5)}
                />
                <TabNavItem
                    id={6}
                    title={"Аффилированность"}
                    activeTab={currentTab}
                    onClick={() => move(6)}
                />
                <TabNavItem
                    id={7}
                    title={"Негативная информация"}
                    activeTab={currentTab}
                    onClick={() => move(7)}
                />
            </TabContainer>
            <TabsWrapper>
                <TabContent id={1} activeTab={currentTab}>
                    <PersonBaseInfoPage />
                </TabContent>
                <TabContent id={2} activeTab={currentTab}>
                    <PersonEducationPage />
                </TabContent>
                <TabContent id={3} activeTab={currentTab}>
                    <PersonFamilyStatusPage />
                </TabContent>
                <TabContent id={4} activeTab={currentTab}>
                    <PersonCareerPage />
                </TabContent>
                <TabContent id={5} activeTab={currentTab}>
                    <PersonFinancialSolvencyPage />
                </TabContent>
                <TabContent id={6} activeTab={currentTab}>
                    <PersonAffiliationsPage />
                </TabContent>
                <TabContent id={7} activeTab={currentTab}>
                    <PersonNegativeInfoPage />
                </TabContent>
            </TabsWrapper>
        </>
    )
}