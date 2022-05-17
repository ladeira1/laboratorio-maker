import { Button, Center, Flex, Link, Spinner } from '@chakra-ui/react';
import { Item } from 'components/Item';
import { ListItem } from 'components/ListItem';
import { Wrapper } from 'components/Wrapper';
import { usePagination } from 'hooks/usePagination';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { productRequests } from 'requests/product';
import { colors } from 'styles/theme';
import { ProductDetailsList } from 'types';
import { getValueFromItem } from 'utils/getValueFromItem';

const valuesOByItem = [
  { title: 'Categoria', value: 'category' },
  { title: 'Nome', value: 'name' },
  { title: 'Quantidade', value: 'amount' },
  { title: 'Armário', value: 'locker' },
  { title: 'Porta', value: 'door' },
  { title: 'Andar', value: 'floor' },
];

const Storage = () => {
  const router = useRouter();

  const { page, isLoading, shouldFetchMoreData, fetchMoreData } = usePagination(
    {
      request: () => productRequests.list({ page }),
    },
  );

  const [products, setProducts] = useState<ProductDetailsList>([]);

  const handleFetchMoreData = async () => {
    const data = await fetchMoreData();

    if (!data) return;

    setProducts(oldState => [...oldState, ...data.products]);
  };

  const handleUpdateSelectedProduct = (id: string | number) => {
    router.push(`/app/storage/products/update/${id}`);
  };

  const handleDeleteSelectedProduct = async (id: string | number) => {
    await productRequests.remove(id);
    setProducts(oldState => oldState.filter(product => product.id !== id));
  };

  return (
    <Wrapper title="Estoque">
      <Item>
        <NextLink passHref href="/app/storage/products/create">
          <Button
            as={Link}
            w="100%"
            maxW={['100%', '100%', '100%', 'sm']}
            mb="8"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Cadastrar novo produto
          </Button>
        </NextLink>
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
          {products && (
            <InfiniteScroll
              pageStart={1}
              loadMore={handleFetchMoreData}
              hasMore={shouldFetchMoreData}
            >
              <Flex maxW="100%" flexDir="column">
                {products?.map(item => (
                  <ListItem
                    key={item.id}
                    item={{
                      id: item.id,
                      data: valuesOByItem.map(data => ({
                        title: data.title,
                        value: getValueFromItem(data.value, item),
                      })),
                    }}
                    onClick={handleUpdateSelectedProduct}
                    onDelete={handleDeleteSelectedProduct}
                  />
                ))}
              </Flex>
              {isLoading && (
                <Center h="12">
                  <Spinner color="gray.200" />
                </Center>
              )}
            </InfiniteScroll>
          )}
        </Flex>
      </Item>
    </Wrapper>
  );
};

export default Storage;
