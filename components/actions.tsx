import { useAuth } from '@/hooks/useAuth'
import { useEditor } from '@/hooks/useEditor'
import toast from 'react-hot-toast'
import { BiPlus } from 'react-icons/bi'
import { BsArrowRight, BsCopy, BsEraser } from 'react-icons/bs'
import { LuRepeat } from 'react-icons/lu'
import CustomButton from './Button'

const UIAction = () => {
    const { fetchResult, setState, result, json } = useEditor()
    const { chargeUserForToken, user } = useAuth()

    const handleGenerate = async () => {
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
        fetchResult(() => {
            chargeUserForToken(JSON.stringify(json).length)
        })
    }
    return (
        <div className="flex items-center justify-start gap-[1rem]">
            <CustomButton
                title="Add Instructions"
                onClick={() => {}}
                icon={<BiPlus />}
            />

            <CustomButton
                title="Convert"
                onClick={handleGenerate}
                icon={<BsArrowRight />}
                iconSide="right"
            />

            {result ? (
                <CustomButton
                    onClick={handleGenerate}
                    title="Generate Again"
                    icon={<LuRepeat />}
                />
            ) : null}

            {result ? (
                <CustomButton
                    onClick={() => {
                        if (!result) {
                            toast.error('Nothing to copy')
                            return
                        }
                        navigator.clipboard.writeText(result)
                        toast.success('Code Copied')
                    }}
                    title="Copy Code"
                    icon={<BsCopy />}
                />
            ) : null}

            {/* <select className="flex items-center justify-center bg-transparent gap-[.5rem] border-[1px]  border-[#1e1e1e] rounded-lg min-w-[100px] px-4 py-3 hover:bg-[#1e1e1e]">
                <option value="chakra">Chakra UI</option>
                <option value="mui">Material UI</option>
                <option selected value="tailwind">
                    Tailwind
                </option>
            </select> */}

            <CustomButton
                onClick={() => {
                    setState({ json: '', result: '' })
                }}
                title="Clear"
                icon={<BsEraser />}
            />
        </div>
    )
}

export default UIAction
