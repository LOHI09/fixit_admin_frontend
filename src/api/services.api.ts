import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export type TService = {
  name: string
  description: string
  price: number
  category: string
  location: {
    locality: string
    city: string
  }
  serviceProvider: string
  spCompanyName: string
  avg_rating: number
  total_reviews: number
  total_bookings: number
}

export const getServices = async () => {
  const response = await api.get("/service-providers/services")
  return response.data
}

export const useGetServicesQuery = () => {
  return useQuery<TService[]>({
    queryKey: ["services"],
    queryFn: getServices,
  })
}

export const deleteService = async (
  sp_username: string,
  service_name: string
) => {
  const response = await api.delete(`${sp_username}/services/${service_name}`)
  return response.data
}

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      sp_username,
      service_name,
    }: {
      sp_username: string
      service_name: string
    }) => deleteService(sp_username, service_name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] })
    },
  })
}
