import { create } from 'zustand'

interface SettingsProps {
    isOpen: boolean
    onClose: () => void
    openModal: () => void
}
export const useSettings = create<SettingsProps>((set, get) => ({
    isOpen: false,
    onClose: () => {
        set({ isOpen: false })
    },
    openModal: () => {
        set({ isOpen: true })
    },
}))
