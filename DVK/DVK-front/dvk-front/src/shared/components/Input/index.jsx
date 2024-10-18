import { InputContainer, InputLabel, StyledInput, ErrorLabel } from "./Styles"
import { Typography } from "antd"
const { Text } = Typography


export const Input = ({ label, name, type, placeholder, required, errors, register, validationSchema, width, disabled }) => {

    return (
        <InputContainer>
            <InputLabel
                width={width}
            >
                {/* <Text strong> */}
                    {label}
                    {required && ""}
                {/* </Text> */}
            </InputLabel>
            <StyledInput
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                {...register(name, validationSchema)}
                width={width}
                disabled={disabled != true ? false : true}
            />
            {errors && errors[name]?.type === "required" && (
			    <ErrorLabel>{errors[name]?.message}</ErrorLabel>
		    )}
            {errors && errors[name]?.type === "minLength" && (
			    <ErrorLabel>{errors[name]?.message}</ErrorLabel>
		    )}
            {errors && errors[name]?.type === "maxLength" && (
                <ErrorLabel>{errors[name]?.message}</ErrorLabel>
            )}


        </InputContainer>
    )
}
// export default Input