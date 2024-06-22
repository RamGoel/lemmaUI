import { FiLoader } from 'react-icons/fi'

const LoadingUI = () => {
    return (
        <div className=" flex items-center justify-center flex-1 h-[600px]">
            <FiLoader className="animate-spin" size={30} />
        </div>
    )
}

export default LoadingUI
