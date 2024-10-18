import { useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import {
    ModalOverlay,
    ModalWrapper,
    ModalTitle,
    ModalContent 
} from "./Styles"
import { Input } from "@/shared/components/Input"
import { useAddPersonFamilyMember, useUpdatePersonFamilyMember } from "@/Mutators/Person/mutators"
import DatePickerAntd from "@/shared/components/DatePicker"
import { showSuccess, showError } from "@/utils/toast"
import { Typography, Button, Select, Cascader } from 'antd'
import CascaderAntd from "../../../../../shared/components/Cascader"
const { Title, Text } = Typography


const PersonFamilyModal = ({ familyMember, onClose }) => {
    const { id } = useParams()
    const methods = useForm({
        defaultValues: familyMember,
    })
    console.log(familyMember)

    const addPersonFamilyMember = useAddPersonFamilyMember()
    const updatePersonFamilyMember = useUpdatePersonFamilyMember()

    const type = [
        {value: "Муж", label: "Муж" },
        {value: "Жена", label: "Жена" },
        {value: "Дети", label: "Дети" },
        {value: "Отец", label: "Отец" },
        {value: "Мать", label: "Мать" },
        {value: "Брат", label: "Брат" },
        {value: "Сестра", label: "Сестра" },
    ]

    const options = [
        {value: "Муж", label: "Муж" },
        {value: "Жена", label: "Жена" },
        {value: "Дети", label: "Дети" },
        {value: "Отец", label: "Отец" },
        {value: "Мать", label: "Мать" },
        {value: "Брат", label: "Брат" },
        {value: "Сестра", label: "Сестра" },
        {
            value: 'Родственник супруга',
            label: 'Родственник супруга',
            children: [
                {value: 'Отец',label: 'Отец'},
                {value: 'Мать',label: 'Мать'},
                {value: "Брат", label: "Брат" },
                {value: "Сестра", label: "Сестра" },
            ],
        },
        {
            value: 'Родственник супруги',
            label: 'Родственник супруги',
            children: [
                {value: 'Отец',label: 'Отец'},
                {value: 'Мать',label: 'Мать'},
                {value: "Брат", label: "Брат" },
                {value: "Сестра", label: "Сестра" },
            ],
        },
    ]


    const onSubmit = methods.handleSubmit(data => {
        data.identifier = id
        data.family_status = data.family_status.toString()
        
        if (familyMember != null || undefined) {
            try {
                updatePersonFamilyMember.mutate(data, {
                    onSuccess: () => {
                        onClose(false)
                        showSuccess("Член семьи успешно обновлен")
                    },
                    onError: () => {
                        showError("Не удалось обновить члена семьи")
                    }
                })
            }
            catch (error) {
                showError(error)
            }
        } else {
            try {
                addPersonFamilyMember.mutate(data, {
                    onSuccess: () => {
                        onClose(false)
                        showSuccess("Член семьи успешно добавлен")
                    },
                    onError: () => {
                        showError("Не удалось добавить члена семьи")
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
                <Title level={2}>Член семьи</Title>
                <ModalContent>
                    <form
                        onReset={methods.reset}
                    >
                        <Input 
                            type="text"
                            name="last_name"
                            label="Фамилия"
                            placeholder="Введите фамилию"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести фамилию"
                            }}
                        />
                        <Input 
                            type="text"
                            name="first_name"
                            label="Имя"
                            placeholder="Введите имя"
                            errors={methods.errors}
                            register={methods.register}
                            validationSchema={{
                                required: "Необходимо ввести имя"
                            }}
                        />
                        <Input 
                            type="text"
                            name="middle_name"
                            label="Отчество"
                            placeholder="Введите отчество"
                            errors={methods.errors}
                            register={methods.register}
                        />
                        <CascaderAntd
                            name="family_status"
                            label="Кем приходится"
                            placeholder="Выберите степень родства"
                            control={methods.control}
                            options={options}
                        />
                        {/* <div>
                            <div>Степень родства</div>
                            <Controller
                                name="family_status"
                                control={methods.control}
                                rules={{ required: true }}
                                label="Кем приходится"
                                render={({ field }) => (
                                    <Select
                                    {...field}
                                    options={type}
                                    style={{ width: 300 }}
                                    placeholder="Выберите степень родства"
                                    />
                                )}
                            />
                        </div> */}
                        <DatePickerAntd 
                            name="birthdate"
                            label="Дата рождения"
                            control={methods.control}
                            width={"300px"}
                            placeholder="Введите дату рождения"
                        />
                        <Input 
                            type="text"
                            name="iin"
                            label="ИИН"
                            placeholder="Введите ИИН"
                            errors={methods.errors}
                            register={methods.register}
                        />
                        <Input 
                            type="text"
                            name="work_place"
                            label="Место работы/учебы"
                            placeholder="Введите место работы/учебы"
                            errors={methods.errors}
                            register={methods.register}
                        />
                        {familyMember !== null || undefined?
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
export default PersonFamilyModal