import { Box, Icon, Link, Stack, Text, Heading } from "@chakra-ui/react";
import { RiHome2Line, RiCalendarEventLine, RiSuitcaseLine, RiFileInfoLine, RiTvLine } from "react-icons/ri"
import { SiProbot } from "react-icons/si"
import NextLink from 'next/link'

export const Sidebar = () => {

  const items = [
    {
      icon: RiHome2Line,
      text: "Início",
      href: "/"
    },
    {
      icon: RiCalendarEventLine,
      text: "Agendamento",
      href: "/schedule"
    },
    {
      icon: RiSuitcaseLine,
      text: "Estoque",
      href: "/storage"
    },
    {
      icon: RiFileInfoLine,
      text: "Letreiro",
      href: "/board"
    },
    {
      icon: RiTvLine,
      text: "Cinema",
      href: "/cinema"
    }
  ]

  return (
    <Box
      as="aside"
      w="52"
      mr="8"
      bg="gray.800"
      h="100vh"
    >
      <Heading
        fontWeight="600"
        letterSpacing="tight"
        fontSize="1.6rem"
        as="h3"
        w="64"
        ml="6"
        mt="4"
      >
        Maker
        <Icon as={SiProbot} ml="2" fontSize="20" />
      </Heading>
      <Stack ml="6" spacing="12" align="flex-start">
        <Box>
          <Stack spacing="6" mt="8" align="stretch">
            {items.map(item => (
              <NextLink href={item.href} key={item.text} >
                <Link display="flex">
                  <Icon as={item.icon} fontSize="20" />
                  <Text ml="2" fontWeight="medium">{item.text}</Text>
                </Link>
              </NextLink>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}