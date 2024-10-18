import { useForm, Controller } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import { useAddPersonEducation, useUpdatePersonEducation } from "@/Mutators/Person/mutators"
import DatePickerAntd from "@/shared/components/DatePicker"
import { useParams } from "react-router-dom"
import { showSuccess, showError } from "@/utils/toast"
import { Flex, Typography, Button, Select } from 'antd'
const { Title, Text } = Typography

const educationTypes = [
    {
        value: "Высшее",
        label: "Высшее"
    },
    {
        value: "Среднее",
        label: "Среднее"
    },
    {
        value: "Средне-специальное",
        label: "Среднее-специальное"
    },

]

const PersonEducationModal = ({ education, onClose }) => {
    const { id } = useParams()
    const methods = useForm({
        defaultValues: education,
    })
    console.log(education)
    const addPersonEducation = useAddPersonEducation()
    const updatePersonEducation = useUpdatePersonEducation()

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id

        if (education != null) {
            try {
                updatePersonEducation.mutate(data, {
                    onSuccess: () => {
                        onClose(false)
                        showSuccess("Образование успешно обновлено")
                    },
                    onError: () => {
                        showError("Не удалось обновить образование")
                    }
                })
            }
            catch (error) {
                showError(error)
            }
        } else {
            try {
                addPersonEducation.mutate(data, {
                    onSuccess: () => {
                        onClose(false)
                        showSuccess("Образование успешно добавлено")
                    },
                    onError: () => {
                        showError("Не удалось добавить образование")
                    }
                })
            }
            catch (error) {
                showError(error)
            }
        }
    })

    return (
        <>
            <ModalOverlay></ModalOverlay>
            <ModalWrapper>
                <ModalTitle onClick={onClose}>X</ModalTitle>
                <Title level={2}>Образование</Title>
                <ModalContent>
                    <form
                        onReset={methods.reset}
                    >   
                        <Flex vertical>
                            <Text>Выберите тип образования</Text>
                            <Controller 
                                name="education_type"
                                control={methods.control}
                                render={( {field}) => (
                                    <Select
                                        placeholder="Выберите тип образования"
                                        {...field}
                                        options={educationTypes}
                                        style={{ width: 300 }}
                                    />
                                )}
                            />
                        </Flex>
                        <Input 
                            type="text"
                            name="edu_institution_name"
                            label="Наименование учебного заведения"
                            placeholder="Введите наименование учебного заведения"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести наименование учебного заведения"
                            }}
                        />
                        <DatePickerAntd 
                            name="start_date"
                            rules={{ required: "required" }}
                            control={methods.control}
                            label="Дата начала"
                            placeholder="Выберите дату начала"
                            format="YYYY"
                            picker="year"
                        />
                        <DatePickerAntd 
                            name="end_date"
                            rules={{ required: "required" }}
                            control={methods.control}
                            label="Дата окончания"
                            placeholder="Выберите дату окончания"
                            format="YYYY"
                            picker="year"
                        />
                        <Input 
                            type="text"
                            name="specialization"
                            label="Специальность"
                            placeholder="Введите специальность"
                            errors={methods.errors}
                            register={methods.register}
                            // validationSchema={{
                            //     required: "Необходимо ввести специальность"
                            // }}
                        />
                        <Input 
                            type="text"
                            name="qualification"
                            label="Квалификация"
                            placeholder="Введите квалификацию"
                            errors={methods.errors}
                            register={methods.register}
                            // validationSchema={{
                            //     required: "Необходимо ввести квалификацию"
                            // }}
                        />

                        {education !== null ? 
                            <Button onClick={onSubmit} type="primary">Обновить</Button> 
                            : 
                            <Button onClick={onSubmit} type="primary">Сохранить</Button>
                        }
                    </form>
                </ModalContent>
            </ModalWrapper>
        </>
    )
}
export default PersonEducationModal