import { Button, Center, Flex, Link, Spinner } from '@chakra-ui/react';
import { Item } from 'components/Item';
import { ListItem } from 'components/ListItem';
import { Wrapper } from 'components/Wrapper';
import { usePagination } from 'hooks/usePagination';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { categoryRequests } from 'requests/category';
import { colors } from 'styles/theme';
import { CategoryList } from 'types';
import { getValueFromItem } from 'utils/getValueFromItem';

const valuesByItem = [
  { title: 'Nome', value: 'name' },
  { title: 'Descrição', value: 'description' },
];

const Categories = () => {
  const router = useRouter();

  const { page, isLoading, shouldFetchMoreData, fetchMoreData } = usePagination(
    {
      request: () => categoryRequests.list({ page }),
    },
  );

  const [categories, setCategories] = useState<CategoryList>([]);

  const handleFetchMoreData = async () => {
    const data = await fetchMoreData();

    if (!data) return;

    setCategories(oldState => [...oldState, ...data.categories]);
  };

  const handleUpdateSelectedCategory = (id: string | number) => {
    router.push(`/app/storage/categories/update/${id}`);
  };

  return (
    <Wrapper title="Categorias">
      <Item>
        <NextLink passHref href="/app/storage/categories/create">
          <Button
            as={Link}
            w="100%"
            maxW={['100%', '100%', '100%', 'sm']}
            mb="8"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Cadastrar nova categoria
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
          {categories && (
            <InfiniteScroll
              pageStart={1}
              loadMore={handleFetchMoreData}
              hasMore={shouldFetchMoreData}
            >
              <Flex maxW="100%" flexDir="column">
                {categories?.map(item => (
                  <ListItem
                    key={item.id}
                    item={{
                      id: item.id,
                      data: valuesByItem.map(data => ({
                        title: data.title,
                        value: getValueFromItem(data.value, item),
                      })),
                    }}
                    onClick={handleUpdateSelectedCategory}
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

export default Categories;
