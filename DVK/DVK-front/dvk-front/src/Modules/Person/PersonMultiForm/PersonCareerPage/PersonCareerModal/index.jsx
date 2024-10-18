import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAddPersonCareer, useUpdatePersonCareer } from "@/Mutators/Person/mutators"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import DatePickerAntd from "@/shared/components/DatePicker"
import { showSuccess, showError } from "@/utils/toast"
import { Typography, Button } from 'antd'
const { Title, Text } = Typography
import { CloseOutlined } from '@ant-design/icons'


const PersonCareerModal = ({ career, onClose }) => {
    const { id } = useParams()
    const methods = useForm({
        defaultValues: career,
    })

    const addPersonCareer = useAddPersonCareer(id)
    const updatePersonCareer = useUpdatePersonCareer()

    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id

        console.log(data)

        if (career != null) {
            try {
                updatePersonCareer.mutate(data, {
                    onSuccess: () => {
                        onClose(true)
                        showSuccess("Обновлено место работы ")
                    },
                    onError: () => {
                        showError("Не удалось обновить место работы")
                    }
                })
            }
            catch (error) {
                showError(error)
            }
        } else {
            try {
                addPersonCareer.mutate(data, {
                    onSuccess: () => {
                        onClose(true)
                        showSuccess("Добавлено место работы ")
                    },
                    onError: () => {
                        showError("Не удалось добавить место работы")
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
                <ModalTitle onClick={onClose}>
                    <CloseOutlined style={{ fontSize: "18px"}}/>
                </ModalTitle>
                <Title level={2}>Место работы</Title>
                <ModalContent>
                    <form
                        onReset={methods.reset}
                    >
                        <Input 
                            type="text"
                            name="company_name"
                            label="Наименование организации"
                            placeholder="Введите наименование наименование организации"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести наименование организации"
                            }}
                        />
                        <div>
                            <DatePickerAntd 
                                name="start_date"
                                label="Дата начала работы"
                                placeholder="Выберите дату"
                                control={methods.control}
                            />
                            <DatePickerAntd 
                                name="end_date"
                                label="Дата конца работы"
                                placeholder="Выберите дату"
                                control={methods.control}
                            />
                        </div>

                        <Input 
                            type="text"
                            name="job_position"
                            label="Должность"
                            placeholder="Введите наименование должности"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести наименование должности"
                            }}
                        />
                        {career != null ?
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
export default PersonCareerModal