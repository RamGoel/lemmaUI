'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loginUser, user, sendPasswordForgotMail } = useAuth()
    const router = useRouter()

    if (user) {
        router.push('/dashboard')
        return
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginUser(email, password)
    }
    return (
        <div className="flex items-center bg-white dark:bg-black text-black dark:text-white h-screen justify-center">
            <div className="min-w-[25rem]">
                <p className="text-2xl text-center font-bold tracking-[10px] bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text">
                    LEMMAUI
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex flex-col gap-[1rem]"
                >
                    <input
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[40px] border-[1px] text-sm placeholder:text-white placeholder:opacity-30 px-4 border-[#1e1e1e] rounded-lg bg-transparent"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <input
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-[40px] border-[1px] text-sm placeholder:text-white placeholder:opacity-30 px-4 border-[#1e1e1e] rounded-lg bg-transparent"
                        type="password"
                        placeholder="Password"
                    />

                    {/* <p
                        onClick={() => {
                            if (!email) {
                                toast.error('Please type in your email')
                                return
                            }
                            sendPasswordForgotMail(email)
                        }}
                        className=" underline cursor-pointer underline-offset-2 text-end text-sm"
                    >
                        Forgot Password?
                    </p> */}
                    <button
                        type="submit"
                        className="w-full bg-white hover:bg-gray-300 h-[40px] rounded-lg text-black font-semibold"
                    >
                        Continue
                    </button>
                    <p className="text-sm text-center">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-300">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
