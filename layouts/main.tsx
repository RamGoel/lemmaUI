'use client'
import InstructionConfirm from '@/components/modals/InstructionConfirm'
import InstructionsModal from '@/components/modals/InstructionsModal'
import SettingsModal from '@/components/modals/SettingsModal'
import { useInstructionModal } from '@/hooks/useInstructionModal'
import { useSettings } from '@/hooks/useSettings'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { isOpen: isINSModalOpen, isConfirmOpen } = useInstructionModal()
    const { isOpen: isSettingsModalOpen } = useSettings()
    return (
        <ChakraProvider theme={theme}>
            {isINSModalOpen && <InstructionsModal />}
            {isConfirmOpen && <InstructionConfirm />}
            {isSettingsModalOpen && <SettingsModal />}
            <Toaster />
            {children}
        </ChakraProvider>
    )
}

export default MainLayout
