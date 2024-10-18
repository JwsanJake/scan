import React from "react"
import { Controller, useController } from "react-hook-form"
import { Space, Cascader, Typography } from "antd"
const { Text } = Typography


const CascaderAntd = (props) => {
    const { field, fieldState } = useController(props)

    return (
        <Space direction="vertical">
			<Text strong>{props.label}</Text>

			<Controller 
				name={props.name}
				ref={field.ref}
				control={props.control}
				rules={{ }}
				
				render={({ field }) => (
					<Cascader
						{...field}
						placeholder={props.placeholder}
						options={props.options}
						style={{ width: "300px" }}
					/>
				)}
			/>
		</Space>
    )
}
export default CascaderAntd