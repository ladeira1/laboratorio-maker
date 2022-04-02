import { Flex } from "@chakra-ui/react";
import { Sidebar } from "components/Sidebar";

const Dashboard = () => {
  return (
    <Flex direction="column" h="100vh">
      <Flex w="100vw">
        <Sidebar />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
