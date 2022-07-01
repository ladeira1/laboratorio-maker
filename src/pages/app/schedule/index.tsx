import { Button, Link } from "@chakra-ui/react";
import { Item } from "components/Item";
import { Wrapper } from "components/Wrapper";
import NextLink from 'next/link';

const Schedule = () => (
  <Wrapper title="Agendamento">
    <Item>
      <NextLink passHref href="/app/schedule/create">
        <Button
          as={Link}
          w="100%"
          maxW={['100%', '100%', '100%', 'sm']}
          mb="8"
          _hover={{
            textDecoration: 'none',
          }}
        >
          Realizar novo agendamento
        </Button>
      </NextLink>
    </Item>
  </Wrapper>
)

export default Schedule;