import { Box, Heading } from "@chakra-ui/react"
import { useGetUsersWithMostBookingsQuery } from "../../api/stats.api"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

export default function UsersWithMostBookings() {
  const { data } = useGetUsersWithMostBookingsQuery()

  const categories = Object.keys(data || {})
  const values = Object.values(data || {})

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: categories,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
        },
      },
    ],
  }

  const series = [
    {
      data: values as number[],
    },
  ]

  return (
    <Box bg="white" rounded="lg" boxShadow="lg">
      <Heading textAlign="center" p="4">
        User with Most Bookings
      </Heading>
      {data && (
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      )}
    </Box>
  )
}
