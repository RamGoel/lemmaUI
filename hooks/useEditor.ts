import { axiosInstance } from '@/lib/axios'
import { isJSON } from '@/utils/handler'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface EditorStoreProps {
    json: string
    result: string
    isLoading: boolean
    fetchResult: () => void
    setState: (state: Partial<EditorStoreProps>) => void
}
export const useEditor = create<EditorStoreProps>((set, get) => ({
    json: '',
    result: '',
    isLoading: false,
    fetchResult: () => {
        if (!isJSON(get().json)) {
            toast.error('Invalid JSON')
            return
        }
        get().setState({ isLoading: true })
        axiosInstance
            .post(
                '/json-ui/create',
                { json: get().json },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('lemmaToken')}`,
                    },
                }
            )
            .then((res) => {
                get().setState({ result: res.data.text })
            })
            .catch((err) => {
                console.log(err)
                toast.error('Error while generating UI')
            })
            .finally(() => {
                get().setState({ isLoading: false })
            })
    },
    setState: (state) => set({ ...get(), ...state }),
}))
