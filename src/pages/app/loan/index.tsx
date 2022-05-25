import React from 'react';
import { Button, Link } from "@chakra-ui/react";
import { Item } from "components/Item"
import { Wrapper } from "components/Wrapper"
import NextLink from 'next/link';

const Loan = () => {
  return (
    <Wrapper title="Empréstimo">
      <Item>
        <NextLink passHref href="/app/loan/create">
          <Button
            as={Link}
            w="100%"
            maxW={['100%', '100%', '100%', 'sm']}
            mb="8"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Realizar novo empréstimo
          </Button>
        </NextLink>
      </Item>
    </Wrapper>
  )
}

export default Loan