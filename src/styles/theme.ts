import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const colors = {
  background: "#0B0E11",
  white: "#e4e6eb",
  black: "#0B0E11",
  red: "#FD4D4D",
  gray: {
    800: "#151a21",
    700: "#323d4d",
    600: "#2D353F",
    550: "#3F4751",
    500: "#A9A9A9",
    400: "#DEE3EA",
    200: "#F0EFEF",
  },
};

const fonts = {
  heading: "Roboto, sans-serif",
  body: "Roboto, sans-serif",
};

const styles = {
  global: {
    body: {
      bg: "background",
      color: "white",
      borderWidth: "none",
    },
    h1: {
      fontSize: "1.8rem",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "6  00",
      color: "white",
    },
    h2: {
      fontSize: "1.6rem",
      fontFamily: "Roboto, sans-serif",
      fontWeight: "600",
      color: "white",
    },
    th: {
      color: "blue",
    },
    tr: {
      color: "gray.400",
    },
  },
};

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "500",
    borderRadius: "base",
    transition: "all ease 0.2s",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 3,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
    },
  },
  variants: {
    outline: {
      border: "1px solid",
      borderColor: "red",
      color: "red",
      _hover: {
        bg: "background",
        opacity: 0.8,
      },
      _active: {
        bg: "red",
        color: "background",
        opacity: 0.9,
      },
    },
    solid: {
      bg: "red",
      color: "gray.200",
      _hover: {
        bg: "red",
        opacity: 0.8,
      },
      _active: {
        bg: "red",
        opacity: 1,
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
};

export const theme = extendTheme({
  colors,
  fonts,
  styles,
  components: { Button },
});
