'use client'
import UIAction from '@/components/actions'
import EmptyUI from '@/components/empty'
import LoadingUI from '@/components/loading'
import ResultUI from '@/components/result'
import TokenBar from '@/components/tokens'
import { useAuth } from '@/hooks/useAuth'
import { useEditor } from '@/hooks/useEditor'
import { Editor } from '@monaco-editor/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { BsArrowUpRight } from 'react-icons/bs'
import { RiCustomerServiceLine } from 'react-icons/ri'

export default function Dashboard() {
    const router = useRouter()
    const editorRef = React.useRef<any>()
    const { isLoading, json, result, setState } = useEditor()
    const { user, logoutUser } = useAuth()

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
                formatCode()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    if (!user) {
        router.push('/')
        return
    }

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor
    }

    const formatCode = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run()
        }
    }

    return (
        <div className="flex items-center gap-[2rem] justify-between">
            <div className=" flex items-center justify-between px-[10%] absolute top-[20px] w-full text-center">
                <p className="text-2xl font-bold tracking-[10px] bg-gradient-to-r from-gray-50 to-gray-500 text-transparent bg-clip-text">
                    LEMMAUI
                </p>

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
                    <div
                        onClick={() => {
                            router.push('/upgrade')
                        }}
                        className="flex items-center justify-center h-[50px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-lg min-w-[100px] px-4  hover:bg-[#1e1e1e] cursor-pointer"
                    >
                        Upgrade <BsArrowUpRight />
                    </div>

                    <button
                        onClick={() => {
                            logoutUser()
                            localStorage.clear()
                            router.push('/')
                        }}
                        className="bg-white text-black uppercase tracking-widest font-semibold min-w-[100px] py-3 px-4 rounded-lg ml-auto"
                    >
                        Log out
                    </button>
                </div>
            </div>
            <div className="w-full mt-[150px] flex flex-col gap-[2rem]">
                <div className="flex items-start justify-between w-10/12 mx-auto gap-[3rem]">
                    <h1 className="text-2xl font-semibold text-center">
                        Generate Frontend from API Response
                    </h1>
                    <UIAction />
                </div>
                <div className="flex items-stretch justify-center w-10/12 mx-auto gap-[3rem]">
                    <Editor
                        onChange={(value) => setState({ json: value || '' })}
                        height="60vh"
                        width={'40vw'}
                        value={json}
                        theme="vs-dark"
                        defaultLanguage="json"
                        className="overflow-hidden text-xs rounded-lg"
                        defaultValue="// Paste your JSON"
                        onMount={handleEditorDidMount}
                        options={{
                            minimap: {
                                enabled: false as any,
                            },
                            lineNumbers: 'off' as any,
                            lineDecorationsWidth: 0 as any,
                            smoothScrolling: true as any,
                        }}
                    />

                    {isLoading ? (
                        <LoadingUI />
                    ) : result ? (
                        <ResultUI htmlCode={result} />
                    ) : (
                        <EmptyUI />
                    )}
                </div>
                <Link
                    href="mailto:rgoel766@gmail.com"
                    className="flex absolute bottom-8 left-8 items-center justify-center h-[60px] w-[60px] gap-[.5rem] border-[1px] border-[#1e1e1e] rounded-full  hover:bg-[#1e1e1e] cursor-pointer"
                >
                    <RiCustomerServiceLine size={30} />
                </Link>
            </div>
        </div>
    )
}
