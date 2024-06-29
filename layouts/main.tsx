'use client'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <ChakraProvider theme={theme}>
            <Toaster />
            {children}
        </ChakraProvider>
    )
}

export default MainLayout
