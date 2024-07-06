import ReactApexChart from "react-apexcharts"
import { useCategoryDistrubutionQuery } from "../../api/stats.api"
import { Box, Heading } from "@chakra-ui/react"

export default function CategoryDistribution() {
  const { data } = useCategoryDistrubutionQuery()

  const categories = Object.keys(data || {})
  const values = Object.values(data || {})

  const options = {
    labels: categories,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  }

  return (
    <Box bg="white" rounded="lg" boxShadow="lg">
      <Heading textAlign="center" p="4">
        Category Distribution of Services
      </Heading>
      {data && (
        <ReactApexChart
          options={options}
          series={values as number[]}
          type="donut"
          height="350"
        />
      )}
    </Box>
  )
}
