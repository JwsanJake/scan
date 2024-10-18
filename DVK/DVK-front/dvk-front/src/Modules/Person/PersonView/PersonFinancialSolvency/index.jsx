import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { usePersonAllFinancialSolvency } from "@/Queries/Person"
import { Spin, Card, Space, Typography } from "antd"
import { usePersonFinancialSolvency } from "@/Queries/Person"
const { Text } = Typography
import { filterArray } from "@/utils/filterFiles"
import FilesInputView from "@/shared/components/FilesInputView"

export const PersonFinancialSolvency = () => {
    const { id } = useParams()

    const {
        data: financialSolvency,
        isFetching : financialSolvencyFetching,
    } = usePersonAllFinancialSolvency(id)

    return (
        <>
            {financialSolvencyFetching
                ? <Spin/>
                : <PersonFinancialSolvencyView finSolvency={financialSolvency} />
            }
        </>
    )
}

const handleFileEvent = (files, field) => {
    field.onChange(files)
}

const PersonFinancialSolvencyView = ({ finSolvency }) => {

    return (
        <>
            {finSolvency != null 
            ? (<>
                {finSolvency.mainInfo.map((item) => (
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
                                    <Text strong>Сведения о налоговой задолженности:</Text>
                                    <Text>{item.tax_debt}</Text>
                                </Space>
                                <FilesInputView 
                                    name="tax_debt_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "tax_debt")}
                                />
                            </Space>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения об исполнительных производствах:</Text>
                                    <Text>{item.enforcement_proceedings}</Text>
                                </Space>
                                <FilesInputView 
                                    name="enforcement_proceedings_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "enforcement_proceedings")}
                                />
                            </Space>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения о запрете на выезд из РК:</Text>
                                    <Text>{item.kZ_departure_ban}</Text>
                                </Space>
                                <FilesInputView 
                                    name="KZ_departure_ban_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "KZ_departure_ban")}
                                />
                            </Space>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения об участии в юр.лицах и ИП:</Text>
                                    <Text>{item.legal_entity}</Text>
                                </Space>
                                <FilesInputView 
                                    name="legal_entity_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "legal_entity")}
                                />
                            </Space>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения о судебных разбирательствах:</Text>
                                    <Text>{item.court_cases}</Text>
                                </Space>
                                <FilesInputView 
                                    name="court_cases_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "court_cases")}
                                />
                            </Space>
                            <Space direction="vertical">
                                <Space>
                                    <Text strong>Сведения негативного характера:</Text>
                                    <Text>{item.negative_info}</Text>
                                </Space>
                                <FilesInputView 
                                    name="negative_info_files"
                                    onChange={(e) => handleFileEvent(e, field)}
                                    files={filterArray(finSolvency, "negative_info")}
                                />
                            </Space>
                        </Space>
                    </Card>
                ))}
            </>) 
            : (<>Не указано</>)}
        </>
    )
}