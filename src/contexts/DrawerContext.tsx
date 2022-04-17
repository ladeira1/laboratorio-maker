/* eslint-disable react/jsx-no-constructed-context-values */
import { useDisclosure } from '@chakra-ui/hooks';
import { useRouter } from 'next/dist/client/router';
import React, { createContext, ReactNode, useEffect } from 'react';

interface DrawerProviderProps {
  children: ReactNode;
}

interface SibebarDrawerContextData {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SidebarDrawerContext = createContext(
  {} as SibebarDrawerContextData,
);

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => onClose(), [router.asPath]);

  return (
    <SidebarDrawerContext.Provider
      value={{
        isOpen,
        onOpen,
        onClose,
      }}
    >
      {children}
    </SidebarDrawerContext.Provider>
  );
};
