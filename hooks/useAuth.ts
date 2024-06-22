import { axiosInstance } from '@/lib/axios'
import { User } from '@/types/user'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface AuthStoreProps {
    user: null | User
    loginUser: (email: string, password: string) => void
    logoutUser: () => void
    createUser: (name: string, email: string, password: string) => void
    fetchUserData: () => void
}
export const useAuth = create<AuthStoreProps>((set, get) => ({
    user: null,
    loginUser(email, password) {
        axiosInstance
            .post('/auth/login', { email, password })
            .then((res) => {
                set({ user: res.data.user })
                localStorage.setItem('lemmaToken', res.data.token)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Error while logging in')
            })
    },
    logoutUser() {
        set({ user: null })
    },
    createUser(name, email, password) {
        axiosInstance
            .post('/auth/signup', { name, email, password, appName: 'lemma' })
            .then((res) => {
                set({ user: res.data.user })
                localStorage.setItem('lemmaToken', res.data.token)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Error while creating user')
            })
    },
    fetchUserData: () => {
        axiosInstance
            .get('/auth/jwt', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('lemmaToken')}`,
                },
            })
            .then((res) => {
                set({ user: res.data.user })
            })
            .catch((err) => {
                console.log(err)
            })
    },
}))
