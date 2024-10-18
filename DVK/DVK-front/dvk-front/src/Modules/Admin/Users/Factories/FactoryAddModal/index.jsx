import { useForm } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { useAddFactory } from "@/Mutators/Admin/mutators"
import { Input } from "@/shared/components/Input"
import { Button } from "antd"
import { showSuccess, showError } from "@/utils/toast"
import { Typography } from 'antd'
const { Title } = Typography

const FactoryAddModal = ({ onClose }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const addFactory = useAddFactory()

    const onSubmit = handleSubmit(data => {

        try {
            addFactory.mutate(data, {
                onSuccess: () => {
                    onClose(true)
                    showSuccess("Предприятие добавлено")
                },
                onError: () => {
                    showError("Не удалось добавить предприятие")
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
                <Title level={2}>Новое предприятие</Title>
                <ModalContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onReset={reset}
                    >
                        <Input
                            type="text"
                            name="factoryName"
                            label="Наименование предприятия"
                            placeholder="Введите наименование предприятия"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Необходимо ввести наименование предприятия"
                            }}
                        />

                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    </form>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default FactoryAddModal