import { axiosInstance } from '@/lib/axios'
import { isJSON } from '@/utils/handler'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface EditorStoreProps {
    prompt: string
    result: string
    isLoading: boolean
    fetchResult: (callback?: () => void, prompt?: string) => void
    setState: (state: Partial<EditorStoreProps>) => void
}
export const useEditor = create<EditorStoreProps>((set, get) => ({
    prompt: '',
    result: '',
    isLoading: false,
    fetchResult: async (callback, prompt) => {
        const isJSONInput = isJSON(prompt || get().prompt)

        get().setState({ isLoading: true })

        try {
            const res = await axiosInstance.post(
                '/json-ui/create',
                {
                    ...(isJSONInput
                        ? { json: prompt || get().prompt } // if json input, send json
                        : { prompt: prompt || get().prompt }), // if prompt input, send prompt
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('lemmaToken')}`,
                    },
                }
            )

            localStorage.setItem('lemmaHTML', res.data.text)
            get().setState({ result: res.data.text, prompt: '' })

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
