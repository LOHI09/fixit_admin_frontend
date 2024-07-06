import { BaseSyntheticEvent, useState } from "react"
import {
  Card,
  Center,
  Icon,
  Heading,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react"
import { MdHandyman } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { PasswordField } from "./PasswordField"
import { useLoginMutation } from "../../api/login.api"
import useSuccessToast from "../../hooks/useSuccessToast"
import useErrorToast from "../../hooks/useErrorToast"

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loginMutation = useLoginMutation()
  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    loginMutation.mutate(
      {
        username: e.target.form[0].value,
        password: e.target.form[2].value,
      },
      {
        onSuccess: (data) => {
          setIsLoading(false)
          successToast("Login successful")
          localStorage.setItem("token", data.access_token)
          navigate("/dashboard")
        },
        onError: (error) => {
          setIsLoading(false)
          errorToast(error)
        },
      }
    )
  }

  return (
    <Card maxW="md" p={8} bg="white" boxShadow="lg" m={4}>
      <Stack spacing={4}>
        <Center>
          <Icon as={MdHandyman} h="32px" w="32px" />
          <Heading
            pl="12px"
            fontSize="28px"
            onClick={() => navigate("/")}
            cursor="pointer"
          >
            Fixit - Admin Panel
          </Heading>
        </Center>
        <Heading textAlign="center">Login to your account</Heading>
        <Divider orientation="horizontal" borderColor="black" />
        <form>
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" placeholder="Enter your username" required />
            </FormControl>
            <PasswordField placeholder="Enter your password" />
            <Button
              colorScheme="blue"
              type="submit"
              onClick={(e) => handleSubmit(e)}
              isLoading={isLoading}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  )
}
