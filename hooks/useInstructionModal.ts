import { create } from 'zustand'

interface InstructionModalProps {
    isOpen: boolean
    isConfirmOpen: boolean
    openConfirmModal: () => void
    closeConfirmModal: () => void
    onClose: () => void
    openModal: () => void
    confirmConfig: {
        title: string
        content: string
        onSubmit: (result: boolean) => void
        cancelBtnText?: string
        successBtnText?: string
    }
    setConfirmConfig: (config: any) => void
}
export const useInstructionModal = create<InstructionModalProps>(
    (set, get) => ({
        isOpen: false,
        onClose: () => {
            set({ isOpen: false })
        },
        openModal: () => {
            set({ isOpen: true })
        },
        isConfirmOpen: false,
        openConfirmModal: () => {
            set({ isConfirmOpen: true })
        },
        closeConfirmModal: () => {
            set({ isConfirmOpen: false })
        },
        confirmConfig: {
            title: '',
            content: '',
            onSubmit: () => {},
        },
        setConfirmConfig: (config) => {
            set({ confirmConfig: config })
        },
    })
)
