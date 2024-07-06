import { Box, Flex } from "@chakra-ui/react"
import Drawer from "../components/Drawer/Drawer"

interface BaseLayoutProps {
  children?: React.ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Box minH="100vh" bg="primary.100">
      <Flex>
        <Drawer />
        <Box w="100%" p="4" justifyContent="center" alignItems="center">
          {children}
        </Box>
      </Flex>
    </Box>
  )
}
