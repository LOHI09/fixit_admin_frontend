import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TUser = {
  username: string
  email: string
  first_name: string
  last_name: string
}

export const getUsers = async () => {
  const response = await api.get<TUser[]>("/users")
  return response.data
}

export const useGetUsersQuery = () => {
  return useQuery<TUser[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  })
}

export const deleteUser = async (username: string) => {
  const response = await api.delete(`/users/${username}`)
  return response.data
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ username }: { username: string }) => deleteUser(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
