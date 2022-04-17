import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";
import { SessionProvider } from "next-auth/react";
import { DrawerProvider } from "contexts/DrawerContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <DrawerProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </DrawerProvider>
    </SessionProvider>
  );
};

export default MyApp;
