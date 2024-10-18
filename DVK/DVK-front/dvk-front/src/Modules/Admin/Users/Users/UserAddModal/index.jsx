import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import { useAddUser } from "@/Mutators/Admin/mutators"
import { useAllPositionLabel } from "@/Queries/Admin"
import { Flex, Typography, Select, Button } from "antd"
const { Title, Text } = Typography
import { showSuccess, showError } from "@/utils/toast"


const UserAddModal = ({ onClose }) => {

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm()

    const addUser = useAddUser()

    const { data: positions } = useAllPositionLabel()

    const onSubmit = handleSubmit(data => {

        try {
            addUser.mutate(data, {
                onSuccess: () => {
                    onClose(true)
                    showSuccess("Пользователь успешно добавлен")
                },
                onError: () => {
                    showError("Не удалось добавить пользователя")
                }
            })
        }
        catch (error) {
            showError(error)
        }
    })

    return (
        <>
            <ModalOverlay onClick={onClose}></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={2}>Пользователь</Title>
                <ModalContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        onReset={reset}
                    >
                        <Flex vertical>
                            <Input 
                                type="text"
                                name="lastName"
                                label="Фамилия"
                                placeholder="Введите фамилию"
                                errors={errors}
                                register={register}
                                validationSchema={{
                                    required: "Необходимо ввести фамилию"
                                }}
                            />
                            <Input 
                                type="text"
                                name="firstName"
                                label="Имя"
                                placeholder="Введите имя"
                                errors={errors}
                                register={register}
                                validationSchema={{
                                    required: "Необходимо ввести имя"
                                }}
                            />
                            <Input 
                                type="text"
                                name="middleName"
                                label="Отчество"
                                placeholder="Введите отчество"
                                errors={errors}
                                register={register}
                            />
                            <Input 
                                type="text"
                                name="email"
                                label="Email"
                                placeholder="Введите email"
                                errors={errors}
                                register={register}
                                validationSchema={{
                                    required: "Необходимо ввести email"
                                }}
                            />
                            <Text>Должность</Text>
                            <Controller
                                name="positionId"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Выберите должность"
                                        options={positions != null ? positions.data : null}
                                        style={{ width: 300, height: 40}}
                                    />
                                )}
                            />
                        </Flex>

                        <Button onClick={onSubmit} type="primary">Сохранить</Button>
                    </form>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default UserAddModal