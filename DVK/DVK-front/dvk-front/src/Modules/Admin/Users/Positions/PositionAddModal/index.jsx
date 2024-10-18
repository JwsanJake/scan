import { useForm, Controller } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import { useAddPosition } from "@/Mutators/Admin/mutators"
import { useAllAccesses, useAllSubdivisionLabel } from "@/Queries/Admin"
import { Typography, Flex, Select, Button } from 'antd'
const { Title, Text } = Typography


const PositionAddModal = ({ onClose }) => {

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm()

    const addPosition = useAddPosition()

    const { data: accesses } = useAllAccesses()

    const { data: subdivisions } = useAllSubdivisionLabel()

    const onSubmit = handleSubmit(data => {

        try {
            addPosition.mutate(data, {
                onSuccess: () => {
                    onClose(true)
                    showSuccess("Должность добавлена")
                },
                onError: () => {
                    showError("Не удалось добавить должность")
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
                <Title level={2}>Должность</Title>
                <ModalContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onReset={reset}
                    > 
                        <Flex gap="middle" vertical>
                            <Text>Доступы</Text>
                            <Controller 
                                name="accessIds"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        mode="tags"
                                        {...field}
                                        placeholder="Выберите доступы"
                                        options={accesses != null ? accesses : null}
                                        style={{ width: 800, height: 80 }}
                                    />
                                )}
                            />
                        </Flex>
                        <Flex gap="middle" vertical>
                            <Text>Структурные единицы</Text>
                            <Controller 
                                name="subdivisionIds"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        //mode="tags"
                                        {...field}
                                        placeholder="Выберите структурные единицы"
                                        options={subdivisions != null ? subdivisions.data : null}
                                        //style={{ width: 800, height: 80}}
                                    />
                                )}
                            />
                            
                        </Flex>

                        <Flex gap="middle" vertical>

                        </Flex>
                        
                        <Input
                            type="text"
                            name="positionName"
                            label="Наименование должности"
                            placeholder="Введите наименование должности"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Необходимо ввести наименование должности"
                            }}
                        />

                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    </form>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default PositionAddModal