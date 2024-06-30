'use client'
import { useAuth } from '@/hooks/useAuth'
import { useEditor } from '@/hooks/useEditor'
import { useSettings } from '@/hooks/useSettings'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { Formik } from 'formik'
import { GoLock } from 'react-icons/go'
import CustomInput from '../Input'

const SettingsModal = () => {
    const { isOpen, onClose } = useSettings()
    const { fetchResult } = useEditor()
    const { user, updateProfile } = useAuth()

    const handleUpdateProfile = (values: any) => {
        updateProfile(values)
        onClose()
    }

    const initalValues = {
        name: user?.name,
        email: user?.email,
        plan: user?.plan,
    }
    return (
        <Modal
            colorScheme="dark"
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
            isCentered
        >
            <ModalOverlay />

            <ModalContent className="bg-white  dark:!bg-stone-950 text-black dark:!text-white">
                <ModalHeader>Account Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Formik
                        initialValues={initalValues}
                        onSubmit={handleUpdateProfile}
                        enableReinitialize
                    >
                        {({
                            handleChange,
                            values,
                            errors,
                            handleSubmit,
                            touched,
                        }) => {
                            return (
                                <div className="flex flex-col gap-[1rem]">
                                    <CustomInput
                                        id="name"
                                        label="Name"
                                        errors={errors}
                                        touched={touched}
                                        values={values}
                                        onChange={handleChange}
                                    />
                                    <CustomInput
                                        id="email"
                                        title="Cannot be changed"
                                        label="Email"
                                        errors={errors}
                                        touched={touched}
                                        isDisabled
                                        values={values}
                                        onChange={handleChange}
                                    />
                                    {user?.plan !== 'proYearly' ? (
                                        <div className="flex relative items-stretch justify-start">
                                            <CustomInput
                                                id="gptToken"
                                                label="OpenAI Key (for better results) (optional)"
                                                errors={errors}
                                                touched={touched}
                                                title='Upgrade to "Pro Yearly" plan to use this feature'
                                                values={values}
                                                isDisabled
                                                className="!pl-[32px]"
                                                placeholder="Paste your OpenAI Key"
                                                onChange={handleChange}
                                            />

                                            <GoLock
                                                className="text-gray-600 opacity-50 absolute top-[60%] left-[10px]"
                                                size={16}
                                            />
                                        </div>
                                    ) : (
                                        <CustomInput
                                            id="gptToken"
                                            label="OpenAI Key (for better results) (optional)"
                                            errors={errors}
                                            touched={touched}
                                            values={values}
                                            placeholder="Paste your OpenAI Key"
                                            onChange={handleChange}
                                        />
                                    )}
                                    <ModalFooter>
                                        <Button
                                            type="submit"
                                            colorScheme="green"
                                            onClick={() => handleSubmit()}
                                        >
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </div>
                            )
                        }}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SettingsModal
