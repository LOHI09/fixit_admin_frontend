import { Flex } from "@chakra-ui/react"
import CategoryDistribution from "../components/Dashboard/CategoryDistribution"
import BaseLayout from "../layouts/BaseLayout"
import MostRatedServices from "../components/Dashboard/MostRatedServices"
import MostBookedServices from "../components/Dashboard/MostBookedServices"
import UsersWithMostBookings from "../components/Dashboard/UsersWithMostBookings"

export default function DashboardPage() {
  return (
    <BaseLayout>
      <Flex flexDir="column" gap="8" w="90%" mx="auto">
        <CategoryDistribution />
        <MostRatedServices />
        <MostBookedServices />
        <UsersWithMostBookings />
      </Flex>
    </BaseLayout>
  )
}
