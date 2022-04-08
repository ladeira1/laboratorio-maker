import { Flex, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";
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
        {!!title && (
          <Heading as="h1" fontSize="2rem" textAlign={titleAlign}>
            {title}
          </Heading>
        )}
        <Flex flexDir="column" mt="8" w="100%">
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
