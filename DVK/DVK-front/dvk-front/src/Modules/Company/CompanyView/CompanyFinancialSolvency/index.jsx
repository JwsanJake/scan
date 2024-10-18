import { useParams } from "react-router-dom"
import { useCompanyAllFinancialSolvency } from "@/Queries/Company"
import { Spin, Flex, Space, Card, Typography } from "antd"
const { Text } = Typography
import { filterArray } from "@/utils/filterFiles"
import FilesInputView from "@/shared/components/FilesInputView"

export const CompanyFinancialSolvency = () => {
    const { id } = useParams()

    const {
        data : financialSolvency,
        isFetching : financialSolvencyFetching,
    } = useCompanyAllFinancialSolvency(id)

    return (
        <>
            {financialSolvencyFetching
                ? <Spin/>
                : <CompanyFinancialSolvencyView finSolvency={financialSolvency}/>
            }
        </>
    )
}

const CompanyFinancialSolvencyView = ({ finSolvency }) => {

    return (
        <>
            {finSolvency != null 
            ? 
                (<>
                {finSolvency.mainInfo.map((item) => (
                        <Card 
                            title={item.event_identifier} 
                            bordered="true"
                            style={{
                                width: 800,
                                marginTop: "20px"
                            }}
                        >
                            <Space direction="vertical">
                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения о налогах за последний год:</Text>
                                        <Text>{item.tax_payment_last_year}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="tax_payment_last_year"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "tax_payment_last_year")}
                                    />
                                </Space>

                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения о налоговой задолженности:</Text>
                                        <Text>{item.tax_debt_info}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="tax_debt_info"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "tax_debt_info")}
                                    />
                                </Space>
                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения о наличии исполнительных производств в отношении
                                            контрагента и/или его учредителей, руководителя:</Text>
                                        <Text>{item.enforcement_proceedings_info}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="enforcement_proceedings_info"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "enforcement_proceedings_info")}
                                    />
                                </Space>

                                <Space direction="vertical"> 
                                    <Space>
                                        <Text strong>Сведения о наличии судебных разбирательств 
                                            в отношении контрагента и/или его учредителей, руководителя:</Text>
                                        <Text>{item.court_cases_info}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="court_cases_info"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "court_cases_info")}
                                    />
                                </Space>
                            
                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения о наличии гражданских, административных, уголовных дел 
                                            в отношении контрагента и/или его учредителей, руководителя:</Text>
                                        <Text>{item.criminal_administrative_cases_info}</Text>
                                        <FilesInputView 
                                            name="criminal_administrative_cases_info"
                                            onChange={(e) => handleFileEvent(e, field)}
                                            //files={filterArray(finSolvency, "criminal_administrative_cases_info")}
                                        />
                                    </Space>
                                    
                                </Space>
                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения о наличии контрагента в реестре недобросовестных участников гос.закупок:</Text>
                                        <Text>{item.unscrupulous_participant_of_state_procurements}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="unscrupulous_participant_of_state_procurements"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "unscrupulous_participant_of_state_procurements")}
                                    />
                                </Space>
                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения о наличии арестов на банковские счета, 
                                            имущество контрагента и/или его учредителей, руководителя:</Text>
                                        <Text>{item.arrest_of_bank_balance}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="arrest_of_bank_balance"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "arrest_of_bank_balance")}
                                    />
                                </Space>

                                <Space direction="vertical">
                                    <Space>
                                        <Text strong>Сведения негативного характера в отношении контрагента и/или его учредителей, руководителя:</Text>
                                        <Text>{item.negative_info}</Text>
                                    </Space>
                                    <FilesInputView 
                                        name="negative_info"
                                        onChange={(e) => handleFileEvent(e, field)}
                                        //files={filterArray(finSolvency, "negative_info")}
                                    />
                                </Space>
                            </Space>
                        </Card>
                ))}
                </>) 
            : (<>Не указано</>)
            }
            
        </>
    )
}