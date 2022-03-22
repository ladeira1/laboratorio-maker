import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Flex
        w="100%"
        maxWidth={1480}
        h="full"
      >
        <Sidebar />
      </Flex>
    </Flex>
  )
}