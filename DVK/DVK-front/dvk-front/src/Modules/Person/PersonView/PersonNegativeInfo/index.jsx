import { useParams } from "react-router-dom"
import { useRelations } from "@/shared/hooks/useRelations"
import { usePersonAllNegativeInfo } from "@/Queries/Person"
import { Spin, Card, Space, Typography } from "antd"
const { Text } = Typography
import FilesInputView from "@/shared/components/FilesInputView"
import { filterArray } from "@/utils/filterFiles"

export const PersonNegativeInfo = () => {
    const { id } = useParams()
    const { eventIdentifier } = useRelations()

    const {
        data: negativeInfo,
        isFetching : negativeInfoFetching,
    } = usePersonAllNegativeInfo(id, eventIdentifier)

    console.log(negativeInfo)

    return (
        <>
            {negativeInfoFetching
                ? <Spin />
                : <PersonNegativeInfoView negative={negativeInfo}/>
            }
        </>
    )
}


const PersonNegativeInfoView = ({ negative }) => {

    return (
        <>
            {negative != null 
            ? (<>
                {negative.mainInfo.map((item) => (
                    <Card 
                        title={item.event_identifier} 
                        bordered="true"
                        style={{ 
                            width: 900,
                            marginTop: "20px"
                        }}
                    > 
                        <Space direction="vertical">
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения о наличие зарегистрированных в ЕРДР правоохранительных органов:</Text>
                                    <Text>{item.erdr_info}</Text>
                                </Space>
                                <FilesInputView 
                                    name="erdr_info_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "erdr_info")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения об освобождение кандидата от наказания за совершение умышленного уголовного правонарушения:</Text>
                                    <Text>{item.criminal_offense}</Text>
                                </Space>
                                <FilesInputView 
                                    name="criminal_offense_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "criminal_offense")}
                                />
                            </Space>
                           
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения о наличии невозмещенного предприятию  материального ущерба, причиненного кандидатом:</Text>
                                    <Text>{item.unreimbursed_damage}</Text>
                                </Space>
                                <FilesInputView 
                                    name="unreimbursed_damage_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "unreimbursed_damage")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Cведения о наличии близких родственных связей с непосредственным руководителем или подчиненным:</Text>
                                    <Text>{item.presense_of_family_ties}</Text>
                                </Space>
                                <FilesInputView 
                                    name="presense_of_family_ties_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "presense_of_family_ties")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения о наличии действующего дисциплинарного взыскания за противоправные действия:</Text>
                                    <Text>{item.presence_of_disciplinary_action}</Text>
                                </Space>
                                <FilesInputView 
                                    name="presence_of_disciplinary_action_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "presence_of_disciplinary_action")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Истечение менее одного года с момента отстранения кандидата от работы 
                                    по результатам расследования причин групповых несчастных случаев:</Text>
                                    <Text>{item.suspension_from_work}</Text>
                                </Space>
                                <FilesInputView 
                                    name="suspension_from_work_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "suspension_from_work")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения о расторжении с кандидатом трудового договора:</Text>
                                    <Text>{item.termination_of_contract}</Text>
                                </Space>
                                <FilesInputView 
                                    name="termination_of_contract_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "termination_of_contract")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Наличие непогашенной/не снятой судимости за уголовные правонарушения, совершенные умышленно:</Text>
                                    <Text>{item.criminal_record}</Text>
                                </Space>
                                <FilesInputView 
                                    name="criminal_record_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "criminal_record")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Наличие в течении последнего года факта освобождения от уголовной ответственности 
                                    по не реабилитирующим основаниям, либо освобождения от наказания:</Text>
                                    <Text>{item.criminal_remission}</Text>
                                </Space>
                                <FilesInputView 
                                    name="criminal_remission_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(negative, "criminal_remission")}
                                />
                            </Space>

                            <Space direction="vertical">
                                <Text strong>Наличие наложенных политических, экономических и иных санкций:</Text>
                                <p>{item.personal_sanctions}</p>
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