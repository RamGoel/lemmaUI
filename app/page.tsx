'use client'
import LoadingUI from '@/components/loading'
import ResultUI from '@/components/result'
import TokenBar from '@/components/tokens'
import { useAuth } from '@/hooks/useAuth'
import { useEditor } from '@/hooks/useEditor'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import toast from 'react-hot-toast'
import { BsArrowUpRight, BsInfoCircle } from 'react-icons/bs'
import { FiArrowUpRight } from 'react-icons/fi'
import { GiMagicHat } from 'react-icons/gi'
import {
    RiCodeBlock,
    RiCodeBoxLine,
    RiCursorLine,
    RiInfoI,
    RiLineChartLine,
    RiLoaderLine,
    RiLoginBoxLine,
    RiPlantLine,
    RiRunLine,
    RiSwapBoxLine,
    RiUserLine,
    RiWindow2Line,
} from 'react-icons/ri'
import { SiJson } from 'react-icons/si'
import { TbJson } from 'react-icons/tb'
export const Presets = [
    {
        name: 'Create a login page',
        prompt: 'Create a login page',
        icon: <RiLoginBoxLine className="text-blue-500" />,
    },
    {
        name: 'Build a user card',
        prompt: 'Build a user card',
        icon: <RiUserLine className="text-green-500" />,
    },
    {
        name: 'Make a loader in React',
        prompt: 'Make a loader in React',
        icon: <RiLoaderLine className="text-orange-500" />,
    },
    {
        name: 'Create a gradient button',
        prompt: 'Create a button with a gradient background',
        icon: <RiCursorLine className="text-orange-500" />,
    },
    {
        name: 'Create a navbar with Home, About, and Contact',
        prompt: 'Create a navbar with Home, About, and Contact',
        icon: <RiWindow2Line className="text-blue-500" />,
    },
]

const Header = () => {
    const { user, logoutUser } = useAuth()
    const router = useRouter()

    return (
        <div className="p-6">
            <div className="bg-zinc-800 h-[60px] w-10/12 mx-auto flex items-center justify-between p-4 rounded-2xl text-center">
                <p className="text-xl font-bold bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text">
                    LemmaUI
                </p>
                <div className="flex items-center justify-end gap-[1rem]">
                    {!user ? (
                        <button
                            onClick={() => {
                                return router.push('/login')
                            }}
                            className="bg-white text-black uppercase tracking-widest font-semibold min-w-[100px] py-2 px-1 rounded-lg ml-auto"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="flex items-center justify-end gap-[1rem]">
                            <TokenBar />
                            <div>
                                {user.name}{' '}
                                <span
                                    className={`px-4 ml-2 py-1 rounded-full bg-gradient-to-r ${user.plan === 'free' ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-yellow-600'} text-transparent text-white font-semibold`}
                                >
                                    {user.plan.toUpperCase()}
                                </span>
                            </div>

                            <button
                                onClick={() => {
                                    logoutUser()
                                    localStorage.clear()
                                    router.push('/')
                                }}
                                className="bg-white text-black font-semibold min-w-[100px] py-2 px-3 rounded-lg ml-auto"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const Home = () => {
    const { fetchUserData, chargeUserForToken, user } = useAuth()
    const { isLoading, fetchResult, prompt, result } = useEditor()
    const router = useRouter()

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

    const handleGenerate = async (promptParam?: string) => {
        if (!promptParam && !prompt) {
            toast.error('Please enter prompt')
            return
        }

        if (!user) {
            toast.error('Please sign in to continue')
            router.push('/login')
            return
        }

        if (
            user?.email !== 'rgoel766@gmail.com' &&
            user?.currTokens &&
            user?.currTokens !== 500
        ) {
            toast.error(
                'We allow only 1 try per user. Please wait till we launch full app.'
            )
            return
        }

        let tokens = user?.currTokens || 0

        if (JSON.stringify(promptParam || prompt).length > tokens) {
            toast.error('Please enter a smaller prompt')
            return
        }

        fetchResult(() => {
            chargeUserForToken(JSON.stringify(promptParam || prompt).length)
        }, promptParam || prompt)
    }
    return (
        <div className="h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-950 text-white">
            <Header />
            {result || isLoading ? (
                <ResultUI />
            ) : (
                <Form handleSubmit={handleGenerate} />
            )}
        </div>
    )
}

const Form = ({
    handleSubmit,
}: {
    handleSubmit: (prompt?: string) => void
}) => {
    const { prompt, setState } = useEditor()
    return (
        <>
            <div className="mt-[100px]">
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <h1 className="md:text-[100px] font-bold text-center  bg-gradient-to-r from-gray-400 dark:from-gray-50 to-black dark:to-gray-500 text-transparent bg-clip-text mx-auto leading-[150px]">
                        Build Frontends Faster
                    </h1>

                    <div className="w-1/2 border border-zinc-700 px-1 pl-4 rounded-full h-[50px] flex items-center justify-center gap-[1rem]">
                        <RiCodeBlock size={22} className="text-zinc-500" />
                        <input
                            type="text"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit()
                                }
                            }}
                            value={prompt}
                            onChange={(e) => {
                                setState({ prompt: e.target.value })
                            }}
                            className="w-full bg-transparent placeholder:opacity-40 !ring-0 focus-visible:outline-none focus:outline-none h-full"
                            placeholder="What do you want to build? (or paste JSON)"
                        />
                        <button
                            onClick={() => {
                                handleSubmit()
                            }}
                            className="bg-white hover:bg-white/60 text-black rounded-full p-2"
                        >
                            <FiArrowUpRight size={24} />
                        </button>
                    </div>
                    <div className="mt-3">
                        <p className="text-sm text-center text-zinc-500">
                            or try one of these examples
                        </p>
                        <div className="flex flex-wrap max-w-5xl mt-4 items-center justify-center gap-[1rem]">
                            {Presets.map((preset) => (
                                <button
                                    key={preset.prompt}
                                    className={`flex items-center justify-center gap-2 rounded-full border-[1.5px] border-zinc-700 p-2 px-4 hover:bg-zinc-700`}
                                    onClick={() => {
                                        setTimeout(() => {
                                            handleSubmit(preset.prompt)
                                        }, 300)
                                    }}
                                >
                                    {preset.icon}
                                    <span className="text-sm ">
                                        {preset.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center absolute bottom-6 left-0 right-0 text-sm text-zinc-500">
                <BsInfoCircle className="inline-block mr-2" />
                This is a demo version. It might make mistakes.
            </p>
        </>
    )
}
export default Home
