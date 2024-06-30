import { Button } from '@chakra-ui/react'

const CustomButton = ({
    title,
    icon,
    onClick,
    iconSide = 'left',
}: {
    title: string
    icon?: any
    onClick?: any
    iconSide?: 'left' | 'right'
}) => {
    return (
        <Button
            // {...(iconSide === 'right'
            //     ? {
            //           rightIcon: icon,
            //       }
            //     : {
            //           leftIcon: icon,
            //       })}
            rightIcon={icon}
            variant={'outline'}
            className="!border-[#1e1e1e] hover:!bg-[#1e1e1e] py-3 !text-sm !text-white"
            onClick={onClick}
        >
            <span className="!font-[400]">{title}</span>
        </Button>
    )
}

export default CustomButton
