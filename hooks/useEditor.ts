import { axiosInstance } from '@/lib/axios'
import { isJSON } from '@/utils/handler'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface EditorStoreProps {
    json: string
    result: string
    isLoading: boolean
    fetchResult: (callback?: () => void) => void
    setState: (state: Partial<EditorStoreProps>) => void
}
export const useEditor = create<EditorStoreProps>((set, get) => ({
    json: '',
    result: '',
    isLoading: false,
    fetchResult: async (callback) => {
        if (!isJSON(get().json)) {
            toast.error('Invalid JSON')
            return
        }
        get().setState({ isLoading: true })

        try {
            const res = await axiosInstance.post(
                '/json-ui/create',
                { json: get().json },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('lemmaToken')}`,
                    },
                }
            )

            get().setState({ result: res.data.text })

            if (callback) {
                callback()
            }
        } catch (err) {
            console.log(err)
            toast.error('Error while generating UI')
        } finally {
            get().setState({ isLoading: false })
        }
    },
    setState: (state) => set({ ...get(), ...state }),
}))
