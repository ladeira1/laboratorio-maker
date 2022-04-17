import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ItemProps {
  children: ReactNode;
}

export const Item = ({ children }: ItemProps) => (
  <Flex flexDir="column" bg="gray.800" p="6" borderRadius="6">
    {children}
  </Flex>
);
