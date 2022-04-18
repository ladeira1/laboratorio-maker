import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { DrawerProvider } from 'contexts/DrawerContext';
import { theme } from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SessionProvider>
    <DrawerProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DrawerProvider>
  </SessionProvider>
);

export default MyApp;
