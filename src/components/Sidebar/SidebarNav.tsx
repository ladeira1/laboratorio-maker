import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  RiCalendarEventLine,
  RiFileInfoLine,
  RiHome2Line,
  RiSuitcaseLine,
  RiTvLine,
} from 'react-icons/ri';
import { SiProbot } from 'react-icons/si';

const items = [
  {
    icon: RiHome2Line,
    text: 'Início',
    href: '/app/dashboard',
  },
  {
    icon: RiCalendarEventLine,
    text: 'Agendamento',
    href: '/app/schedule',
  },
  {
    icon: RiSuitcaseLine,
    text: 'Estoque',
    href: '/app/storage',
  },
  {
    icon: RiFileInfoLine,
    text: 'Letreiro',
    href: '/app/board',
  },
  {
    icon: RiTvLine,
    text: 'Cinema',
    href: '/app/cinema',
  },
];

export const SidebarNav = () => {
  const isDrawer = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Box
      overflow="hidden"
      as="nav"
      w={isDrawer ? '100%' : '15vw'}
      minW={isDrawer ? '0' : '300px'}
      bg="gray.800"
      h="100%"
      px="0"
      maxH="100vh"
    >
      <Heading fontWeight="600" fontSize="2rem" as="h2" ml="6" mt="8">
        Maker
        <Icon as={SiProbot} ml="4" fontSize="24" />
      </Heading>
      <Stack
        overflow="hidden"
        ml="6"
        mr={isDrawer ? 0 : 6}
        mb="60"
        spacing="12"
        align="flex-start"
        h="95%"
      >
        <Box w="100%">
          <Stack spacing="4" mt="8" align="stretch" w="100%">
            {items.map(item => (
              <NextLink passHref href={item.href} key={item.text}>
                <Link
                  display="flex"
                  _hover={{
                    textDecoration: 'none',
                    color: 'gray.400',
                    fontWeight: '500',
                  }}
                  color={
                    router.route.includes(item.href) ? 'gray.400' : 'gray.500'
                  }
                  fontWeight="400"
                >
                  <Flex
                    bg={
                      router.route.includes(item.href) ? 'gray.600' : 'gray.800'
                    }
                    w="100%"
                    align="center"
                    py="3"
                    px="4"
                    borderRadius={5}
                  >
                    <Icon as={item.icon} fontSize="20" />
                    <Text ml="2">{item.text}</Text>
                  </Flex>
                </Link>
              </NextLink>
            ))}
          </Stack>
        </Box>
        <Flex flex="1" align="flex-end" pb="10" w="100%">
          <Button w="100%" onClick={handleLogout}>
            Sair
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
