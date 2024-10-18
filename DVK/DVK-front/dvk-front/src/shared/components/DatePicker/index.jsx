import { DatePicker } from "antd"
import { useController } from "react-hook-form"
import { Space, Typography } from "antd"
const { Text } = Typography
import styled, { css } from "styled-components"
import 'dayjs/locale/ru.js'
import locale from 'antd/es/date-picker/locale/ru_Ru'
//import locale from "antd/es/locale/ru_RU";


const DatePickerAntd = (props) => {
    const { field, formState } = useController(props)

    return (
        <div>
            <Space direction="vertical">
                <Text strong>{props.label}</Text>
                <DatePicker
                    className="h-14"
                    style={{
                        width: "300px"
                    }}
                    format={props.format != null ? props.format : "DD-MM-YYYY"}
                    placeholder={props.placeholder}
                    ref={field.ref}
                    name={field.name}
                    onBlur={field.onBlur}
                    value={field.value}
                    onChange={(date) => {
                        field.onChange(date)
                    }}
                    picker={props.picker}
                    locale={locale}
                />
            </Space>
            {/* {formState.errors && formState.errors[name]?.type === "required" && (
			    <ErrorLabel>{formState.errors[name]?.message}</ErrorLabel>
		    )} */}
        </div>
  )
}
export default DatePickerAntd

export const ErrorLabel = styled.div`
	font-weight: 400;
	font-size: 11px;
	line-height: 15px;
	color: #ff0000;
`