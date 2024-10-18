import React from "react"
import { TabProvider, useMultitab } from "@/shared/hooks/useMultitab"
import { TabContainer, TabsWrapper } from "@/shared/components/Tabs/Styles"
import  TabNavItem  from "@/shared/components/Tabs/TabNavItem.jsx"
import  TabContent  from "@/shared/components/Tabs/TabContent.jsx"
import { CompanyAffiliationsPage } from "../CompanyMultiForm/CompanyAffiliations"
import { CompanyBaseInfoPage } from "../CompanyMultiForm/CompanyBaseDataForm"
import { CompanyDirectorPage } from "../CompanyMultiForm/CompanyDirector"
import { CompanyFinancialSolvencyPage } from "../CompanyMultiForm/CompanyFinancialSolvency"
import { CompanyNegativeInfoPage } from "../CompanyMultiForm/CompanyNegativeInfo"
import { CompanyOwnersPage } from "../CompanyMultiForm/CompanyOwnersForm"


const CompanyMultiTab = () => {

    return (
        <TabProvider>
            <CompanyTabs />
        </TabProvider>
    )
}
export default CompanyMultiTab

const CompanyTabs = () => {
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
                    title={"Собственники"}
                    activeTab={currentTab}
                    onClick={() => move(2)}
                />
                <TabNavItem 
                    id={3}
                    title={"Сведения о руководителе"}
                    activeTab={currentTab}
                    onClick={() => move(3)}
                />
                <TabNavItem 
                    id={4}
                    title={"Финансовая состоятельность"}
                    activeTab={currentTab}
                    onClick={() => move(4)}
                />
                <TabNavItem 
                    id={5}
                    title={"Аффилированность"}
                    activeTab={currentTab}
                    onClick={() => move(5)}
                />
                <TabNavItem 
                    id={6}
                    title={"Негативная информация"}
                    activeTab={currentTab}
                    onClick={() => move(6)}
                />
            </TabContainer>
            <TabsWrapper>
                <TabContent id={1} activeTab={currentTab}>
                    <CompanyBaseInfoPage />
                </TabContent>
                <TabContent id={2} activeTab={currentTab}>
                    <CompanyOwnersPage />
                </TabContent>
                <TabContent id={3} activeTab={currentTab}>
                    <CompanyDirectorPage />
                </TabContent>
                <TabContent id={4} activeTab={currentTab}>
                    <CompanyFinancialSolvencyPage />
                </TabContent>
                <TabContent id={5} activeTab={currentTab}>
                    <CompanyAffiliationsPage />
                </TabContent>
                <TabContent id={6} activeTab={currentTab}>
                    <CompanyNegativeInfoPage />
                </TabContent>
            </TabsWrapper>
        </>
        
    )
}