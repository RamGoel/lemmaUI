'use client'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'

const Home = () => {
    const router = useRouter()
    const { user, fetchUserData } = useAuth()

    useEffect(() => {
        fetchUserData()
    }, [])

    if (isMobile) {
        return (
            <div>
                <p>Mobile not supported, please use a computer</p>
            </div>
        )
    }
    return (
        <div className="flex items-center bg-gradient-to-br from-[#16161694] to-[#2a2a2a] flex-col justify-center min-h-screen w-full">
            <div className=" flex items-center justify-between px-[10%] absolute top-[5%] w-full text-center">
                <p className="text-xl font-bold tracking-[10px] bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text">
                    LEMMAUI
                </p>
                <div className="flex items-center justify-end gap-[1rem]">
                    <Link className="underline" href={'/upgrade'}>
                        View Plans
                    </Link>
                    <button
                        onClick={() => {
                            if (!user) {
                                return router.push('/login')
                            }
                            router.push('/dashboard')
                        }}
                        className="bg-white text-black uppercase tracking-widest font-semibold min-w-[100px] py-2 px-1 rounded-lg ml-auto"
                    >
                        Sign In
                    </button>
                </div>
            </div>
            <div className="mt-[100px]">
                <h1 className=" md:text-[120px] w-10/12 font-bold text-center  bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text mx-auto leading-[150px]">
                    build frontends faster
                </h1>
                <p className="text-center text-xl mt-4">
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
