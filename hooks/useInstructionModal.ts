import { create } from 'zustand'

interface InstructionModalProps {
    isOpen: boolean
    onClose: () => void
    openModal: () => void
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
    })
)
