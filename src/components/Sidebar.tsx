import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiHome2Line, RiCalendarEventLine, RiSuitcaseLine, RiFileInfoLine, RiTvLine } from "react-icons/ri"
import { SiProbot } from "react-icons/si"

export function Sidebar() {
  return (
    <Box
      as="aside"
      w="52"
      mr="8"
      bg="gray.800"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
        ml="6"
        mt="4"
      >
        Maker
        <Icon as={SiProbot} ml="2" fontSize="20" />
      </Text>
      <Stack ml="6" spacing="12" align="flex-start">
        <Box>
          <Stack spacing="6" mt="8" align="stretch">
            <Link display="flex" >
              <Icon as={RiHome2Line} fontSize="20" />
              <Text ml="2" fontWeight="medium">Inicio</Text>
            </Link>
            <Link display="flex">
              <Icon as={RiCalendarEventLine} fontSize="20" />
              <Text ml="2" fontWeight="medium">Agendamentos</Text>
            </Link>
            <Link display="flex">
              <Icon as={RiSuitcaseLine} fontSize="20" />
              <Text ml="2" fontWeight="medium">Estoque</Text>
            </Link>
            <Link display="flex">
              <Icon as={RiFileInfoLine} fontSize="20" />
              <Text ml="2" fontWeight="medium">Letreiro</Text>
            </Link>
            <Link display="flex">
              <Icon as={RiTvLine} fontSize="20" />
              <Text ml="2" fontWeight="medium">Cinema</Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}