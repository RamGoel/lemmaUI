import MainLayout from '@/layouts/main'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const font = Inter({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
            <body className={font.className}>
                <MainLayout>{children}</MainLayout>
            </body>
        </html>
    )
}
