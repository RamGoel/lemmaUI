import { Input, InputProps } from '@chakra-ui/react'

interface CustomInputProps extends InputProps {
    id: string
    label: string
    errors: any
    values: any
    touched: any
}
const CustomInput = (props: CustomInputProps) => {
    const { errors, id, values, label, touched, ...rest } = props
    return (
        <div key={id} className="w-full">
            {label && (
                <label htmlFor={id} className="text-sm">
                    {label}
                </label>
            )}
            <Input
                id={id}
                {...rest}
                value={values[id]}
                className={`${props.className} placeholder:!opacity-50 !text-sm !border-[#1e1e1e] mt-1`}
            />
            {errors[id] && touched[id] ? (
                <p className="text-xs text-red-500">{errors[id]}</p>
            ) : null}
        </div>
    )
}

export default CustomInput
