import { axiosInstance } from '@/lib/axios'
import { User } from '@/types/user'
import { extractErrorMessage } from '@/utils/handler'
import toast from 'react-hot-toast'
import { create } from 'zustand'

interface AuthStoreProps {
    user: null | User
    loginUser: (email: string, password: string) => void
    logoutUser: () => void
    createUser: (name: string, email: string, password: string) => void
    fetchUserData: () => void
    chargeUserForToken: (charge: number) => void
    sendPasswordForgotMail: (email: string) => void
    resetPassword: (token: string, password: string) => void
    updateProfile: (newData: Partial<User>) => void
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
                toast.error(
                    extractErrorMessage(err) || 'Error while logging in'
                )
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
                toast.error(
                    extractErrorMessage(err) || 'Error while creating user'
                )
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

    chargeUserForToken: (charge) => {
        axiosInstance
            .post(
                '/auth/charge',
                { chargedTokens: charge },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('lemmaToken')}`,
                    },
                }
            )
            .then((res) => {
                set({ user: res.data.user })
            })
            .catch((err) => {
                console.log(err)
            })
    },
    sendPasswordForgotMail: (email) => {
        toast.loading('Sending reset email...')
        axiosInstance
            .post('/auth/forgot-password', { email })
            .then((res) => {
                toast.remove()
                toast.success('Sent reset email to ' + email)
            })
            .catch((err) => {
                toast.remove()
                toast.error(
                    extractErrorMessage(err) ||
                        'Error while sending reset email'
                )
            })
    },
    resetPassword: (token, password) => {
        toast.loading('Changing password...')
        axiosInstance
            .post('/auth/reset-password', { token, password })
            .then((res) => {
                toast.remove()
                toast.success('Password changed successfully')
            })
            .catch((err) => {
                toast.remove()
                toast.error(
                    extractErrorMessage(err) || 'Error while changing password'
                )
            })
    },
    updateProfile: (newData) => {
        toast.loading('Updating profile...')
        axiosInstance
            .put(
                '/auth/update-profile',
                {
                    email: newData.email,
                    newProfileData: newData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('lemmaToken')}`,
                    },
                }
            )
            .then((res) => {
                set({ user: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => toast.remove())
    },
}))
