import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Category, Locker, Product } from "@prisma/client";
import { Item } from "components/Item";
import { Wrapper } from "components/Wrapper";
import { usePagination } from "hooks/usePagination";
import NextLink from "next/link";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { api } from "services/api";
import { colors } from "styles/theme";

const columnNames = [
  "Categoria",
  "Nome",
  "Quantidade",
  "Armário",
  "Porta",
  "Andar",
];

type ProductList = (Product & {
  category: Category;
  locker: Locker;
})[];

const Storage = () => {
  const fetchProducts = async () => {
    return await api.get<{
      products: ProductList;
      nextPage: number | null;
      totalPages: number;
    }>(`/api/storage/products?page=${page}&limit=${10}`);
  };

  const { page, isLoading, shouldFetchMoreData, fetchMoreData } = usePagination(
    {
      request: fetchProducts,
    }
  );

  const [products, setProducts] = useState<ProductList>([]);

  const handleFetchMoreData = async () => {
    const data = await fetchMoreData();
    if (!data) return;

    setProducts((oldState) => [...oldState, ...data.products]);
  };

  return (
    <Wrapper title="Produtos Em estoque">
      <Item>
        <NextLink passHref href="/app/storage/products/create">
          <Button
            as={Link}
            w="sm"
            mb="8"
            _hover={{
              textDecoration: "none",
            }}
          >
            Cadastrar novo produto
          </Button>
        </NextLink>
        <TableContainer
          flex="1"
          borderWidth={1}
          borderColor="gray.200"
          borderRadius={10}
          overflowX="scroll"
          css={{
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              marginBottom: "10px",
              width: "5px",
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: colors.gray[600],
              opacity: 0.5,
              borderRadius: "24px",
            },
          }}
        >
          {products && (
            <InfiniteScroll
              pageStart={1}
              loadMore={handleFetchMoreData}
              hasMore={shouldFetchMoreData}
            >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    {columnNames.map((item) => (
                      <Th
                        key={item}
                        borderBottomColor="gray.200"
                        color="gray.200"
                        fontSize="1.1rem"
                        fontWeight="500"
                        overflowY="hidden"
                        h="14"
                      >
                        {item}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {products?.map((item) => (
                    <Tr key={item.id}>
                      <Td borderBottomColor="gray.600">{item.category.name}</Td>
                      <Td borderBottomColor="gray.600">{item.name}</Td>
                      <Td borderBottomColor="gray.600">{`${
                        item.amount
                      } unidade${item?.amount === 1 ? "" : "s"}`}</Td>
                      <Td borderBottomColor="gray.600">{item.locker.name}</Td>
                      <Td borderBottomColor="gray.600">{item.door}</Td>
                      <Td borderBottomColor="gray.600">{item.floor}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {isLoading && (
                <Center h="12">
                  <Spinner color="gray.200" />
                </Center>
              )}
            </InfiniteScroll>
          )}
        </TableContainer>
      </Item>
    </Wrapper>
  );
};

export default Storage;
