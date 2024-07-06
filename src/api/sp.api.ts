import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TServiceProvider = {
  email: string
  username: string
  company_name: string
}

export const getServiceProviders = async () => {
  const response = await api.get("/service-providers")
  return response.data
}

export const useGetServiceProvidersQuery = () => {
  return useQuery<TServiceProvider[]>({
    queryKey: ["service-providers"],
    queryFn: getServiceProviders,
  })
}

export const deleteServiceProvider = async (username: string) => {
  const response = await api.delete(`/service-providers/${username}`)
  return response.data
}

export const useDeleteServiceProviderMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ username }: { username: string }) =>
      deleteServiceProvider(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-providers"] })
    },
  })
}
