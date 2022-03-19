import { extendTheme } from '@chakra-ui/react'

const colors = {
  background: '#0B0E11',
  white: '#fff',
  black: '#0B0E11',
  red: '#FD4D4D',
  gray: {
    800: '#242c37',
    600: '#2D353F',
    400: '#DEE3EA',
    200: '#F0EFEF',
  }
}

const fonts = {
  heading: 'Roboto, sans-serif',
  body: 'Roboto, sans-serif',
}

const styles = {
  global: {
    body: {
      bg: 'background',
      color: 'white',
      borderWidth: 'none'
    },
    h1: {
      fontSize: '1.8rem',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '700',
      color: 'white'
    },
    h2: {
      fontSize: '1.6rem',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '700',
      color: 'white'
    },
    th: {
      color: 'red'
    }
  }
}

export const theme = extendTheme({ colors, fonts, styles })