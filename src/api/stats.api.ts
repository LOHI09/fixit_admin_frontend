import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export const getCategoryDistrubution = async () => {
  const response = await api.get("/stats/category-distribution")
  return response.data
}

export const useCategoryDistrubutionQuery = () => {
  return useQuery({
    queryKey: ["stats-1"],
    queryFn: getCategoryDistrubution,
  })
}

export const getMostRatedServices = async () => {
  const response = await api.get("/stats/most-rated-services")
  return response.data
}

export const useGetMostRatedServicesQuery = () => {
  return useQuery({
    queryKey: ["stats-2"],
    queryFn: getMostRatedServices,
  })
}

export const getMostBookedServices = async () => {
  const response = await api.get("/stats/most-booked-services")
  return response.data
}

export const useGetMostBookedServicesQuery = () => {
  return useQuery({
    queryKey: ["stats-3"],
    queryFn: getMostBookedServices,
  })
}

export const getUsersWithMostBookings = async () => {
  const response = await api.get("/stats/users-with-most-bookings")
  return response.data
}

export const useGetUsersWithMostBookingsQuery = () => {
  return useQuery({
    queryKey: ["stats-4"],
    queryFn: getUsersWithMostBookings,
  })
}
