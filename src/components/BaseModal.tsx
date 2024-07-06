import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"

interface BaseModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  isLoading: boolean
  handleSubmit: () => void
}

export default function BaseModal({
  title,
  isOpen,
  onClose,
  children,
  isLoading,
  handleSubmit,
}: BaseModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="100%" textAlign="justify">
          {children}
        </ModalBody>
        <ModalFooter justifyContent="center" gap="4">
          <Button
            onClick={handleSubmit}
            colorScheme="green"
            isLoading={isLoading}
          >
            Yes
          </Button>
          <Button onClick={onClose} colorScheme="red">
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
