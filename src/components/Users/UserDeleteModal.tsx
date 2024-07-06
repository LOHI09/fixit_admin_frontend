import { Text } from "@chakra-ui/react"
import BaseModal from "../BaseModal"
import { useState } from "react"
import useSuccessToast from "../../hooks/useSuccessToast"
import useErrorToast from "../../hooks/useErrorToast"
import { useDeleteUserMutation } from "../../api/users.api"

interface UserDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  username: string
}

export default function UserDeleteModal({
  isOpen,
  onClose,
  username,
}: UserDeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const mutation = useDeleteUserMutation()

  const handleSubmit = () => {
    setIsLoading(true)

    mutation.mutate(
      {
        username,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("User deleted successfully")
          onClose()
        },
        onError: (error) => {
          setIsLoading(false)
          errorToast(error)
        },
      }
    )
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Are you sure you want to delete ${username}?`}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        Are you sure you want to delete this user? This action cannot be undone.
      </Text>
    </BaseModal>
  )
}
