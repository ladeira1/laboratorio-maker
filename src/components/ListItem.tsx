import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface Item {
  id: string | number;
  data: {
    title: string;
    value: string;
  }[];
}

interface ListItemProps {
  item: Item;
}

export const ListItem = ({ item }: ListItemProps) => {
  return (
    <Flex
      flex="1"
      key={item.id}
      boxShadow="md"
      borderWidth={1}
      borderColor="gray.550"
      my="2"
      px="8"
      py="4"
      borderRadius={10}
      flexWrap="wrap"
      as="button"
      _hover={{
        filter: "brightness(130%)",
      }}
      transition="filter ease 0.2s"
    >
      {item.data.map((data) => (
        <Stack key={data.title} spacing="0" flex="1" m="4" align="flex-start">
          <Text fontSize="1rem" color="gray.500">
            {data.title}
          </Text>
          <Text fontSize="1.1rem" fontWeight="500">
            {data.value}
          </Text>
        </Stack>
      ))}
    </Flex>
  );
};
