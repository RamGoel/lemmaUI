'use client'
import InstructionsModal from '@/components/modals/InstructionsModal'
import { useInstructionModal } from '@/hooks/useInstructionModal'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { isOpen: isINSModalOpen } = useInstructionModal()
    return (
        <ChakraProvider theme={theme}>
            {isINSModalOpen && <InstructionsModal />}
            <Toaster />
            {children}
        </ChakraProvider>
    )
}

export default MainLayout
