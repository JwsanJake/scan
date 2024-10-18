import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { useLogin } from "@/Mutators/Auth/mutators"
import { 
    Container, 
    LoginContainer, 
    LoginFormContainer, 
    LoginForm, 
   
} from "./Styles"
import { setAuthToken } from "@/utils/token"
import { showSuccess, showError } from "@/utils/toast"
import { Button, Space, Typography, Input } from "antd"
const { Title, Text } = Typography


const Login = () => {
    const [passwordVisible, setPasswordVisible] = React.useState(false)
    const {
        //register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const login = useLogin()

    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {

        try {
            login.mutate(data, {
                onSuccess: ({ data }) => {
                    const token = data.authToken
                    setAuthToken(token)
                    showSuccess("Успешный вход в систему")
                    navigate("/")
                },
                onError: () => {
                    showError("Ошибка входа")
                }
            })
        }
        catch (error) {
            showError(error)
        }
        
    })

    return (
        <>
            <Container>
                <LoginContainer>
                    <LoginFormContainer>
                        <LoginForm>
                            <form onSubmit={onSubmit}>
                                <Title style={{ textAlign:"center"}}  level={2}>Вход в систему</Title>
                            </form>
                            
                            <Space direction="vertical" style={{ marginTop: "40px"}}>
                                <Text>Логин</Text>
                                <Controller 
                                    name="login"
                                    control={control}
                                    render={({ field }) => (
                                        <Input 
                                            {...field}
                                            style={{ width: "360px"}}
                                            placeholder="Введите логин"
                                        />
                                    )}
                                />
                            </Space>

                            <Space direction="vertical" style={{ marginTop: "10px"}}>
                                <Text>Пароль</Text>
                                <Controller 
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            style={{ width: "360px"}}
                                            placeholder="Введите пароль"
                                            visibilityToggle={{
                                                visible: passwordVisible,
                                                onVisibleChange: setPasswordVisible,
                                            }}
                                        />
                                    )}
                                />
                            </Space>

                            <Button 
                                type="primary"
                                style={{ width: "360px", marginTop: "35%"}} 
                                onClick={onSubmit}
                            >
                                Войти
                            </Button>
                        </LoginForm>
                    </LoginFormContainer>
                </LoginContainer>
            </Container>
        </>
    )
}
export default Login