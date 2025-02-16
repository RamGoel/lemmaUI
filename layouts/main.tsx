'use client'
import SettingsModal from '@/components/modals/SettingsModal'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <ChakraProvider theme={theme}>
            <SettingsModal />
            <Toaster />
            {children}
        </ChakraProvider>
    )
}

export default MainLayout
