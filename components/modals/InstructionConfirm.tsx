import { useInstructionModal } from '@/hooks/useInstructionModal'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'

function InstructionConfirm() {
    const { isConfirmOpen, closeConfirmModal, confirmConfig } =
        useInstructionModal()

    const { title, content, onSubmit, cancelBtnText, successBtnText } =
        confirmConfig

    return (
        <AlertDialog
            leastDestructiveRef={null as any}
            isOpen={isConfirmOpen}
            onClose={closeConfirmModal}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {title}
                    </AlertDialogHeader>

                    <AlertDialogBody>{content}</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            onClick={() => {
                                onSubmit(false)
                                closeConfirmModal()
                            }}
                        >
                            {cancelBtnText ?? 'Cancel'}
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                onSubmit(true)
                                closeConfirmModal()
                            }}
                            ml={3}
                        >
                            {successBtnText ?? 'Okay'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default InstructionConfirm
