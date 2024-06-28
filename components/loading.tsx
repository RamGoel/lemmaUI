import { FiLoader } from 'react-icons/fi'

const LoadingUI = () => {
    return (
        <div className=" flex items-center justify-center flex-1">
            <FiLoader className="animate-spin" size={25} />
        </div>
    )
}

export default LoadingUI
