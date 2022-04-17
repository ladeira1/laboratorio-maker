import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useDrawer } from "hooks/useDrawer";
import { Drawer } from "./Drawer";
import { SidebarNav } from "./SidebarNav";

export const Sidebar = () => {
  const isDrawer = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onClose } = useDrawer();

  if (isDrawer) {
    return <Drawer isOpen={isOpen} onClose={onClose} />;
  }

  return (
    <Box as="aside" w="64" mr="8" h="100vh">
      <SidebarNav />
    </Box>
  );
};