import { useAuth } from '@/hooks/useAuth'
import { tokenLimits } from '@/utils/constants'

const TokenBar = () => {
    const { user } = useAuth()

    if (!user) return
    return (
        <div className="w-[250px] flex items-center flex-row-reverse justify-end gap-[1rem]">
            <div className="bg-gray-100 w-full rounded-full h-[7px]">
                <div
                    style={{
                        width:
                            (user.currTokens / tokenLimits[user.plan]) * 100 +
                            '%',
                    }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-[100%] rounded-full"
                ></div>
            </div>
            <p className="text-md font-semibold">
                {user.currTokens}/{tokenLimits[user.plan]}
            </p>
        </div>
    )
}

export default TokenBar
