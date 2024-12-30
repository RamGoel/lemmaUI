'use client'
import SettingsModal from '@/components/modals/SettingsModal'
import { useSettings } from '@/hooks/useSettings'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const { isOpen: isSettingsModalOpen } = useSettings()
    return (
        <ChakraProvider theme={theme}>
            {isSettingsModalOpen && <SettingsModal />}
            <Toaster />
            {children}
        </ChakraProvider>
    )
}

export default MainLayout
