import { Box, Icon, Link, Stack, Text, Heading, Button, Flex } from "@chakra-ui/react";
import { RiHome2Line, RiCalendarEventLine, RiSuitcaseLine, RiFileInfoLine, RiTvLine } from "react-icons/ri"
import { SiProbot } from "react-icons/si"
import NextLink from 'next/link'
import { signOut } from 'next-auth/react'

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

  const handleLogout = () => {
    signOut()
  }

  return (
    <Box
      as="aside"
      w="52"
      mr="8"
      bg="gray.800"
      h="100vh"
      maxH="100vh"
      overflow="hidden"
    >
      <Heading
        fontWeight="600"
        letterSpacing="tight"
        fontSize="1.6rem"
        as="h3"
        ml="6"
        mt="4"
      >
        Maker
        <Icon as={SiProbot} ml="2" fontSize="20"/>
      </Heading>
      <Stack mx="6" mb="60" spacing="12" align="flex-start" h="95%">
        <Box>
          <Stack spacing="6" mt="8" align="stretch">
            {items.map(item => (
              <NextLink passHref href={item.href} key={item.text} >
                <Link display="flex">
                  <Icon as={item.icon} fontSize="20" />
                  <Text ml="2" fontWeight="medium">{item.text}</Text>
                </Link>
              </NextLink>
            ))}
          </Stack>
        </Box>
        <Flex flex="1" align="flex-end" pb="6" w="100%">
          <Button w="100%" onClick={handleLogout}>Sair</Button>
          </Flex>
      </Stack>
    </Box>
  )
}