import { Tabs } from "antd"
import { CompanyBaseInfo } from "./CompanyBaseInfo"
import { CompanyOwners } from "./CompanyOwners"
import { CompanyActivities } from "./CompanyActivities"
import { CompanyLicenses } from "./CompanyLicenses"
import { CompanyFinancialSolvency } from "./CompanyFinancialSolvency"
import { CompanyAffiliations } from "./CompanyAffiliations"
import { CompanyNegativeInfo } from "./CompanyNegativeInfo"
import { CompanyReport } from "./CompanyReport"
import { CompanyEvents } from "./CompanyEvents"
import { CompanyDirector } from "./CompanyDirector"


const items = [
    {
        key: 1,
        label: "Установочные данные",
        children: 
            <CompanyBaseInfo/>
    },
    {
        key: 2,
        label: "Собственники",
        children: 
            <CompanyOwners />
    },
    {
        key: 3,
        label: "Руководитель",
        children:
            <CompanyDirector />
    },
    {
        key: 4,
        label: "Виды деятельности",
        children: 
            <CompanyActivities/>
    },
    {
        key: 5,
        label: "Лицензии, разрешения",
        children: 
            <CompanyLicenses/>
    },
    {
        key: 6,
        label: "Финансовая состоятельность",
        children: 
            <CompanyFinancialSolvency/>
    },
    {
        key: 7,
        label: "Аффилированность",
        children: 
            <CompanyAffiliations/>
    },
    {
        key: 8,
        label: "Негативная информация",
        children: 
            <CompanyNegativeInfo/>
    },
    {
        key: 9,
        label: "Мероприятия",
        children: 
            <CompanyEvents/>
    },
    {
        key: 10,
        label: "Отчет",
        children: 
            <CompanyReport/>
    },
    // {
    //     key: 10,
    //     label: "Нарушения",
    //     children: 
    //         <>
    //             В разработке
    //         </>
    // },
]


const CompanyView = () => {

    return (
        <Tabs 
            defaultActiveKey="1"
            tabPosition="left"
            items={items}
        />
    )
}
export default CompanyView