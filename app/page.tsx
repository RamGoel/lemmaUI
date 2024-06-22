'use client'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
    const router = useRouter()
    const { user, fetchUserData } = useAuth()

    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <div className="flex items-center bg-gradient-to-br from-[#16161694] to-[#2a2a2a] flex-col justify-center h-screen w-full">
            <div className=" flex items-center justify-between px-[200px] absolute top-[30px] w-full text-center">
                <p className="text-2xl font-bold tracking-[10px] bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text">
                    LEMMAUI
                </p>
                <button
                    onClick={() => {
                        if (!user) {
                            return router.push('/login')
                        }
                        router.push('/dashboard')
                    }}
                    className="bg-white text-black uppercase tracking-widest font-semibold min-w-[100px] py-4 px-4 rounded-lg ml-auto"
                >
                    Sign In
                </button>
            </div>
            <div className="">
                <h1 className="text-[150px] font-bold text-center  bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text mx-auto leading-[150px]">
                    build frontends easier
                </h1>
                <p className="text-center text-2xl mt-4">
                    Lemma helps you generate appealing interfaces using JSON
                </p>
                <Image
                    src={require('@/public/images/demo.png')}
                    alt="demo"
                    className="mx-auto"
                    width={1000}
                    height={500}
                />
            </div>
        </div>
    )
}

export default Home
