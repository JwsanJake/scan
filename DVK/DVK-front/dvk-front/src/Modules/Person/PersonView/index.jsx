import { Tabs } from "antd"
import { PersonBaseInfo } from "./PersonBaseInfo"
import { PersonEducation } from "./PersonEducation"
import { PersonReport } from "./PersonReport"
import { PersonFamilyStatus } from "./PersonFamilyStatus"
import { PersonCareer } from "./PersonCareer"
import { PersonAffiliations } from "./PersonAffiliations"
import { PersonFinancialSolvency } from "./PersonFinancialSolvency"
import { PersonNegativeInfo } from "./PersonNegativeInfo"
import { PersonEvents } from "./PersonEvents"


const items = [
    {
        key: 1,
        label: "Анкетные данные",
        children: 
            <PersonBaseInfo/>
    },
    {
        key: 2,
        label: "Образование",
        children: 
            <PersonEducation/>
    },
    {
        key: 3,
        label: "Семейное положение",
        children: 
            <PersonFamilyStatus/>
    },
    {
        key: 4,
        label: "Трудовая деятельность",
        children: 
            <PersonCareer/>
    },
    {
        key: 5,
        label: "Финансовая состоятельность",
        children: 
            <>
                <PersonFinancialSolvency/>
            </>
    },
    {
        key: 6,
        label: "Аффилированность",
        children: 
            <>
                <PersonAffiliations/>
            </>
    },
    {
        key: 7,
        label: "Негативная информация",
        children: 
            <>
                <PersonNegativeInfo/>
            </>
    },
    {
        key: 9,
        label: "Мероприятия",
        children: 
            <>
                <PersonEvents/>
            </>
    },
    // {
    //     key: 15,
    //     label: "Отчет",
    //     children: 
    //         <PersonReport />
    // },
]


const PersonView = () => {

    return (
        <>
            <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                items={items}
            />
        </>
    )
}
export default PersonView