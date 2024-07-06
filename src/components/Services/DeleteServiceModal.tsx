import { Text } from "@chakra-ui/react"
import BaseModal from "../BaseModal"
import { useState } from "react"
import useSuccessToast from "../../hooks/useSuccessToast"
import useErrorToast from "../../hooks/useErrorToast"
import { useDeleteServiceMutation } from "../../api/services.api"

interface DeleteServiceModalProps {
  isOpen: boolean
  onClose: () => void
  sp_username: string
  service_name: string
}

export default function DeleteServiceModal({
  isOpen,
  onClose,
  sp_username,
  service_name,
}: DeleteServiceModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const mutation = useDeleteServiceMutation()

  const handleSubmit = () => {
    setIsLoading(true)

    mutation.mutate(
      {
        sp_username,
        service_name,
      },
      {
        onSuccess: () => {
          setIsLoading(false)
          successToast("Service deleted successfully")
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
        Are you sure you want to delete this service? This action cannot be
        undone.
      </Text>
    </BaseModal>
  )
}
