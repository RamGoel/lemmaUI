'use client'
import { useEditor } from '@/hooks/useEditor'
import { useInstructionModal } from '@/hooks/useInstructionModal'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const InstructionsModal = () => {
    const [instruction, setInstruction] = useState('')
    const { isOpen, onClose } = useInstructionModal()
    const { fetchResult } = useEditor()

    const handleSubmit = () => {
        if (!instruction) {
            toast.error('Instruction cannot be empty')
            return
        }
        fetchResult(() => {}, instruction)
        onClose()
        setInstruction('')
    }
    return (
        <Modal colorScheme="dark" isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />

            <ModalContent className="bg-white  dark:!bg-stone-950 text-black dark:!text-white">
                <ModalHeader>Write Instructions</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea
                        className="!border-[#1e1e1e] resize-none   text-sm "
                        rows={12}
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        placeholder="Write your instructions here"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        Convert
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default InstructionsModal
