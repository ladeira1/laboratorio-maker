import { Button, Flex, Link } from '@chakra-ui/react';
import { Item } from 'components/Item';
import { Wrapper } from 'components/Wrapper';
import NextLink from 'next/link';
import React from 'react';
import { colors } from 'styles/theme';

const pages = [{ title: 'Produtos', value: 'products' }];

const Storage = () => {
  return (
    <Wrapper title="Estoque">
      <Item>
        <Flex
          flex="1"
          flexDir="column"
          overflowX="scroll"
          css={{
            scrollbarWidth: 'thin',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              marginBottom: '10px',
              width: '5px',
              height: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: colors.gray[600],
              opacity: 0.5,
              borderRadius: '24px',
            },
          }}
        >
          <Flex maxW="100%" flexDir="column">
            {pages?.map(page => (
              <NextLink passHref href="/app/storage/products">
                <Button
                  variant="link"
                  as={Link}
                  w="100%"
                  minH="8rem"
                  maxW={['100%', 'sm']}
                  mb="8"
                >
                  {page.title}
                </Button>
              </NextLink>
            ))}
          </Flex>
        </Flex>
      </Item>
    </Wrapper>
  );
};

export default Storage;
