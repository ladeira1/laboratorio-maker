import { extendTheme } from '@chakra-ui/react'

const colors = {
  gray: {
    100: '#e1e1e6',
    300: '#a8a8b3',
    700: '#323238',
    800: '#29292e',
    850: '#1f2729',
    900: '#121214',
  },
  background: '#121214',
  white: '#fff'
}

const fonts = {
  heading: 'Roboto, sans-serif',
  body: 'Roboto, sans-serif',
}

const styles = {
  global: {
    body: {
      bg: 'background',
      color: 'white'
    },
    h1: {
      fontSize: '1.8rem',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '800',
    }
  }
}

export const theme = extendTheme({ colors, fonts, styles })