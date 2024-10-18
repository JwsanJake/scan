import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { 
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import { useAddDirection } from "@/Mutators/Admin/mutators"
import { useAllFactories } from "@/Queries/Admin"
import { Checkbox, Button } from 'antd'
const CheckboxGroup = Checkbox.Group
import { showSuccess, showError } from "@/utils/toast"
import { Typography } from 'antd'
const { Title } = Typography

const DirectionAddModal = ({ onClose }) => {
    const [selectedFactories, setSelectedFactories] = useState([])

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()
   

    const factories = useAllFactories()
    const addDirection = useAddDirection()

    const onSubmit = handleSubmit(data => {

        data.factories = selectedFactories
    
        try {
            addDirection.mutate(data, {
                onSuccess: () => {
                    onClose(true)
                    showSuccess("Направление работы добавлено")
                },
                onError: () => {
                    showError("Не удалось добавить направление работы")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    const onChange = (item) => {
        setSelectedFactories(item)
    }

    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={2}>Направление/линия работы</Title>
                <ModalContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onReset={reset}
                    >
                        <Title level={5}>Выберите предприятие:</Title>
                        <CheckboxGroup 
                            options={factories != null ? factories.data.data : []} 
                            onChange={onChange} 
                        />
                        <Input
                            type="text"
                            name="directionName"
                            label="Наименование направления/линии работы"
                            placeholder="Введите наименование линии работы"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Необходимо ввести наименование линии работы"
                            }}
                        />
                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    </form>
                </ModalContent>
            </ModalWrapper>

            
        </>
    )
}
export default DirectionAddModal