import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { theme } from '../styles/theme'
import { SessionProvider } from 'next-auth/react'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
