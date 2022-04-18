import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps as ChakraDrawerProps,
} from '@chakra-ui/react';
import React from 'react';
import { SidebarNav } from './SidebarNav';

type DrawerProps = Pick<ChakraDrawerProps, 'isOpen' | 'onClose'>;

export const Drawer = ({ isOpen, onClose }: DrawerProps) => (
  <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
    <DrawerOverlay>
      <DrawerContent bg="gray.800">
        <DrawerCloseButton mt="6" fontSize="18" />
        <DrawerBody bg="red" maxW="300px" display="flex" p="0" mb="4">
          <SidebarNav />
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </ChakraDrawer>
);
