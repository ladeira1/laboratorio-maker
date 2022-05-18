import { Flex, Stack, Text, Center, Button } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import React from 'react';

interface Item {
  id: string | number;
  data: {
    title: string;
    value: string;
  }[];
}

interface ListItemProps {
  item: Item;
  onClick?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export const ListItem = ({ item, onClick, onDelete }: ListItemProps) => {
  const handleClick = () => {
    if (onClick) onClick(item.id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (onDelete) onDelete(item.id);
  };

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
      alignItems="stretch"
      as="button"
      _hover={{
        filter: 'brightness(130%)',
      }}
      transition="filter ease 0.2s"
      onClick={handleClick}
    >
      {item.data.map(data => (
        <Stack
          key={data.title}
          spacing="0"
          flex="1"
          m="4"
          align="flex-start"
          justify="center"
        >
          <Text fontSize="1rem" color="gray.500">
            {data.title}
          </Text>
          <Text fontSize="1.1rem" fontWeight="500" textAlign="left">
            {data.value}
          </Text>
        </Stack>
      ))}

      <Center minHeight="100%">
        <Button variant="unstyled" display="flex" onClick={handleDelete}>
          <FiX fontSize="1.5rem" />
        </Button>
      </Center>
    </Flex>
  );
};
