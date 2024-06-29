import MainLayout from '@/layouts/main'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const inter = Raleway({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'LemmaUI',
    description: 'Generate Appealing Interfaces using JSON',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    )
}
