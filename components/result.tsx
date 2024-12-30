import { useEditor } from '@/hooks/useEditor'
import toast from 'react-hot-toast'
import { RiFileCopyLine, RiRefreshLine } from 'react-icons/ri'

const ResultUI = () => {
    const { setState, result, isLoading } = useEditor()
    return (
        <div className="flex w-[60vw] h-[80vh] flex-grow mx-auto flex-col items-center justify-start">
            <div className="flex w-full justify-start items-center mb-3 gap-3">
                <p className="text-md mr-auto text-white/50">
                    Built using HTML & Tailwind
                </p>
                <button
                    onClick={() => {
                        setState({ prompt: '', result: '' })
                    }}
                    className="flex items-center gap-2 hover:bg-white/60 bg-white p-2 rounded-md text-black px-4"
                >
                    <RiRefreshLine className="text-2xl" /> Reset
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(result)
                        toast.success('Copied to clipboard')
                    }}
                    className="flex items-center gap-2 hover:bg-white/60 bg-white p-2 rounded-md text-black px-4"
                >
                    <RiFileCopyLine className="text-2xl" /> Copy Code
                </button>
            </div>
            <div className="flex items-center flex-grow h-full rounded-xl w-[60vw] mx-auto justify-center flex-1">
                {isLoading ? (
                    <div className="w-full h-full bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 animate-gradient-x rounded-xl" />
                ) : (
                    <div className="w-full h-full bg-white rounded-xl">
                        <iframe
                            src="/result.html"
                            width={700}
                            height={'60vh'}
                            className="h-full"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ResultUI
