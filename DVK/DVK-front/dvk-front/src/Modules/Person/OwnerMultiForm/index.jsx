import React from "react"
import { TabProvider, useMultitab } from "@/shared/hooks/useMultitab"
import { TabContainer, TabsWrapper } from "@/shared/components/Tabs/Styles"
import  TabNavItem  from "@/shared/components/Tabs/TabNavItem.jsx"
import  TabContent  from "@/shared/components/Tabs/TabContent.jsx"
import { usePersonAffiliationType } from "@/shared/hooks/usePersonAffiliationType"
import { OwnerBaseInfoPage } from "./OwnerBaseInfoPage"
import { OwnerFinancialSolvencyPage } from "./OwnerFinancialSolvencyPage"
import { OwnerAffiliationsPage } from "./OwnerAffiliationPage"
import { OwnerNegativeInfoPage } from "./OwnerNegativeInfoPage"


export const OwnerMultiForm = () => {

    return (
        <TabProvider>
            <OwnerTabs />
        </TabProvider>
    )
}

const OwnerTabs = () => {
    const { currentTab, move } = useMultitab()
    const { identifier, affiliationType, mode } = usePersonAffiliationType()

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
                    title={"Финансовая состоятельность"}
                    activeTab={currentTab}
                    onClick={() => move(2)}
                />
                <TabNavItem 
                    id={3}
                    title={"Аффилированность"}
                    activeTab={currentTab}
                    onClick={() => move(3)}
                />
                <TabNavItem 
                    id={4}
                    title={"Негативная информация"}
                    activeTab={currentTab}
                    onClick={() => move(4)}
                />
            </TabContainer>
            <TabsWrapper>
                <TabContent id={1} activeTab={currentTab}>
                    <OwnerBaseInfoPage
                        identifier={identifier}
                        mode={mode}
                        affiliationType={affiliationType}                
                    />
                </TabContent>
                <TabContent id={2} activeTab={currentTab}>
                    <OwnerFinancialSolvencyPage />
                </TabContent>
                <TabContent id={3} activeTab={currentTab}>
                    <OwnerAffiliationsPage />
                </TabContent>
                <TabContent id={4} activeTab={currentTab}>
                    <OwnerNegativeInfoPage />
                </TabContent>
            </TabsWrapper>
        </>
    )
}