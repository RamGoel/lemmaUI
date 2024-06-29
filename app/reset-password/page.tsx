'use client'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { resetPassword } = useAuth()
    const searchParams = useSearchParams()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        let token = searchParams.get('token')

        if (!token) {
            toast.error('Invalid token')
            return
        }
        resetPassword(token, password)
    }
    return (
        <div className="flex items-center bg-white dark:bg-black text-black dark:text-white justify-center h-screen w-screen">
            <div className="min-w-[25rem] text-center  ">
                <p className="text-3xl font-semibold">Reset Password</p>

                <form
                    className=" flex mt-5 flex-col gap-[1rem]"
                    onSubmit={handleSubmit}
                >
                    <input
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-[40px] border-[1px] text-sm placeholder:text-white placeholder:opacity-30 px-4 border-[#1e1e1e] rounded-lg bg-transparent"
                        type="password"
                        placeholder="Password"
                    />

                    <input
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-[40px] border-[1px] text-sm placeholder:text-white placeholder:opacity-30 px-4 border-[#1e1e1e] rounded-lg bg-transparent"
                        type="password"
                        placeholder="Confirm Password"
                    />

                    <button
                        type="submit"
                        className="w-full bg-white hover:bg-gray-300 h-[40px] rounded-lg text-black font-semibold"
                    >
                        Update Password
                    </button>

                    <Link href={'/login'} className="underline">
                        Back to Login
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
