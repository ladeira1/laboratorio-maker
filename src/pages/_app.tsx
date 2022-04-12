import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { theme } from "../styles/theme";
import { SessionProvider } from "next-auth/react";
import { DrawerProvider } from "contexts/DrawerContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <DrawerProvider>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </Provider>
      </DrawerProvider>
    </SessionProvider>
  );
};

export default MyApp;
