import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useDrawer } from "hooks/useDrawer";
import React, { ReactNode } from "react";
import { RiMenuFill } from "react-icons/ri";
import { colors } from "styles/theme";
import { Sidebar } from "./Sidebar";

interface WrapperProps {
  title?: string;
  titleAlign?: "left" | "center" | "right";
  children: ReactNode;
}

export const Wrapper = ({
  title,
  titleAlign = "left",
  children,
}: WrapperProps) => {
  const isDrawer = useBreakpointValue({ base: true, lg: false });
  const { onOpen } = useDrawer();

  return (
    <Flex direction="row" h="100vh" maxW="100vw" maxH="100vh" p="0" m="0">
      <Sidebar />
      <Flex
        flex="1"
        p="8"
        flexDir="column"
        overflow="scroll"
        css={{
          scrollbarWidth: "thin",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: colors.gray[600],
            borderRadius: "24px",
          },
        }}
      >
        <HStack justify="center">
          {isDrawer && (
            <Button
              height="100%"
              variant="unstyled"
              onClick={onOpen}
              position="absolute"
              left="4"
              maxH="8"
            >
              <Center>
                <Icon as={RiMenuFill} fontSize="26" />
              </Center>
            </Button>
          )}
          {!!title && (
            <Heading
              flex="1"
              as="h1"
              fontSize="2rem"
              textAlign={isDrawer ? "center" : titleAlign}
            >
              {title}
            </Heading>
          )}
        </HStack>
        <Flex flexDir="column" mt="8" w="100%">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
