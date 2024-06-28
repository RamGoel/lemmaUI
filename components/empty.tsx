import { HiOutlineEmojiSad } from 'react-icons/hi'

const EmptyUI = () => {
    return (
        <div className=" flex items-center justify-center flex-1">
            <div className="opacity-60">
                <HiOutlineEmojiSad size={40} className="mx-auto" />
                <p className="text-center text-lg mt-3">No UI Generated</p>
            </div>
        </div>
    )
}

export default EmptyUI
