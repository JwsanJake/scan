import { useParams } from "react-router-dom"
import { useCompanyAllNegativeInfo } from "@/Queries/Company"
import { Spin, Card, Flex, Space, Typography } from "antd"
const { Text } = Typography
import FilesInputView from "@/shared/components/FilesInputView"
import { filterArray } from "@/utils/filterFiles"

export const CompanyNegativeInfo = () => {
    const { id } = useParams()

    const {
        data : negative,
        isFetching : negativeFetching,
    } = useCompanyAllNegativeInfo(id)

    return (
        <>
            {negativeFetching
                ? <Spin />
                : <CompanyNegativeInfoView negative={negative}/>
            }
        </>
    )
}

const CompanyNegativeInfoView = ({ negative }) => {

    return (
        <>
            {negative != null 
            ? (<>
                {negative.mainInfo.map((item) => (
                    <Card 
                        title={item.event_identifier}
                        style={{ 
                            width: 1000,
                            marginTop: "20px"
                        }}
                    >
                        <Space direction="vertical">
                            <Space>
                                <Text strong>Наличие сведений негативного характера в отношении контрагента, его учредителей и руководителей: </Text>
                                <Text>{negative.management_negative_info}Имеется</Text>
                            </Space>
                            <FilesInputView 
                                name="management_negative_info"
                                onChange={(e) => handleFileEvent(e, field)}
                                files={filterArray(negative, "management_negative_info")}
                            />
                        </Space>

                        <Space direction="vertical">
                            <Space>
                                <Text strong>Наличие аффилированности контрагента (по учредителю, руководителю) с субъектами, умышленные действия 
                                которых причинили (создали условия для причинения) вред интересам компаний Казахмыс (имущественный, репутационный и проч.):</Text>
                                <Text>{negative.harm_to_companies_interests} Имеется</Text>
                            </Space>
                            <FilesInputView 
                                name="harm_to_companies_interests"
                                onChange={(e) => handleFileEvent(e, field)}
                                files={filterArray(negative, "harm_to_companies_interests")}
                            />
                        </Space>

                        <Space direction="vertical">
                            <Space>
                                <Text strong>Наличие международных санкций и мер контроля экспорта и импорта в отношении контрагента, его участников (в т.ч. акционеров), 
                                конечных владельцев (при наличии сведений), банка контрагента:</Text>
                                <Text>{negative.international_sanctions} Имеется</Text>
                            </Space>
                            <FilesInputView 
                                name="international_sanctions"
                                onChange={(e) => handleFileEvent(e, field)}
                                files={filterArray(negative, "international_sanctions")}
                            />
                        </Space>

                        <Space direction="vertical">
                            <Space>
                                <Text strong>Наличие санкций судебных и исполнительных органов в отношении контрагента, его участников (акционеров), конечных владельцев (при наличии сведений):</Text>
                                <Text>{negative.judicial_executive_authorities_sanctions} Имеется</Text>
                            </Space>
                            <FilesInputView 
                                name="judicial_executive_authorities_sanctions"
                                onChange={(e) => handleFileEvent(e, field)}
                                files={filterArray(negative, "judicial_executive_authorities_sanctions")}
                            />
                        </Space>

                        <Space direction="vertical">
                            <Space>
                                <Text strong>Наличие  недостоверных сведений, документов среди представленного контрагентом пакета документов:</Text>
                                <Text>{negative.misrepresentations} Имеется</Text>
                            </Space>
                            <FilesInputView 
                                name="misrepresentations"
                                onChange={(e) => handleFileEvent(e, field)}
                                files={filterArray(negative, "misrepresentations")}
                            />
                        </Space>

                        <Flex style={{ marginTop: "10px" }}>
                            <Text strong>Наличие в тексте проекта договора антикоррупционной оговорки:</Text>
                            <p>{negative.anticorruption_reservation} Имеется</p>
                        </Flex>

                        <Flex style={{ marginTop: "10px" }}>
                            <Text strong>Наличие сведений о несоответствии предмета и условий договора основанию заключения договора и выбора контрагента:</Text>
                            <p>{negative.inconsistency_of_contract_conditions} Имеется</p>
                        </Flex>

                        <Flex style={{ marginTop: "10px" }}>
                            <Text strong>Наличие сведений о несоответствии способа выбора контрагента требованиям локальных актов корпорации, в том числе, в сфере противодействия коррупции:</Text>
                            <p>{negative.inconsistency_of_corporation_requirements} Имеется</p>
                        </Flex>
                    </Card>  
                ))}
            </>) 
            : (<>Не указано</>)}
        </>
    )
}