import { useForm, Controller } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import { useAllFactories, useAllSubdivisions } from "@/Queries/Admin"
import { useAddSubdivision } from "@/Mutators/Admin/mutators"
import { showSuccess, showError } from "@/utils/toast"
import { Flex, Typography, Button, Select } from 'antd'
const { Title, Text } = Typography

const SubdivisionAddModal = ({ onClose }) => {

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm()

    const factories = useAllFactories()
    const subdivisions = useAllSubdivisions()
    const addSubdivision = useAddSubdivision()


    const onSubmit = handleSubmit(data => {

        try {
            addSubdivision.mutate(data, {
                onSuccess: () => {
                    onClose(true)
                    showSuccess("Подразделение успешно добавлено")
                },
                onError: () => {
                    showError("Не удалось добавить подразделение")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    return (
        <>  
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={2}>Структурная единица</Title>
                <ModalContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onReset={reset}
                    >
                        <Flex gap="middle" vertical>
                            <Text>Выберите подразделение</Text>
                            <Controller 
                                name="factoryId"
                                control={control}
                                render={( {field}) => (
                                    <Select
                                        placeholder="Выберите предприятие"
                                        {...field}
                                        options={factories != null ? factories.data.data : null}
                                        style={{ width: 500 }}
                                    />
                                )}
                            />
                        </Flex>
                        <Flex gap="middle" vertical>
                            <Text>Выберите вышестоящее подразделение (если есть)</Text>
                            <Controller 
                                name="parentId"
                                control={control}
                                render={( {field}) => (
                                    <Select
                                        placeholder="Выберите подразделение"
                                        {...field}
                                        options={subdivisions != null ? subdivisions.data.data : null}
                                        style={{ width: 500 }}
                                    />
                                )}
                            />
                        </Flex>
                        
                        <Input
                            type="text"
                            name="subdivisionName"
                            label="Наименование структурной единицы"
                            placeholder="Введите наименование структурной единицы"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Необходимо ввести наименование структурной единицы"
                            }}
                        />
                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    </form>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default SubdivisionAddModal