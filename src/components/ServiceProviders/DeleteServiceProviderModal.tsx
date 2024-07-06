import { Text } from "@chakra-ui/react"
import BaseModal from "../BaseModal"
import { useState } from "react"
import useSuccessToast from "../../hooks/useSuccessToast"
import useErrorToast from "../../hooks/useErrorToast"
import { useDeleteServiceProviderMutation } from "../../api/sp.api"

interface DeleteServiceProviderModalProps {
  isOpen: boolean
  onClose: () => void
  sp_username: string
}

export default function DeleteServiceProviderModal({
  isOpen,
  onClose,
  sp_username,
}: DeleteServiceProviderModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const mutation = useDeleteServiceProviderMutation()

  const handleSubmit = () => {
    setIsLoading(true)

    mutation.mutate(
      {
        username: sp_username,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Service provider deleted successfully")
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
      title={`Are you sure you want to delete ${sp_username}?`}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    >
      <Text>
        Are you sure you want to delete this service provider? This action
        cannot be undone.
      </Text>
    </BaseModal>
  )
}
