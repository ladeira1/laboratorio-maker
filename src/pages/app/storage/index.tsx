import {
  Button,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  Tfoot,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { Category, Locker, Product } from "@prisma/client";
import { Sidebar } from "components/Sidebar";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { api } from "services/api";
import InfiniteScroll from "react-infinite-scroller";
import { usePagination } from "hooks/usePagination";

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
    <Flex direction="column" h="100vh">
      <Flex w="100vw">
        <Sidebar />

        <Flex flex="1" m="8" flexDir="column">
          <Heading as="h1" fontSize="2rem">
            Produtos Em estoque
          </Heading>

          <Flex flexDir="column" bg="gray.800" p="6" mt="8" borderRadius={8}>
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
                          <Td borderBottomColor="gray.600">
                            {item.category.name}
                          </Td>
                          <Td borderBottomColor="gray.600">{item.name}</Td>
                          <Td borderBottomColor="gray.600">{`${
                            item.amount
                          } unidade${item?.amount === 1 ? "" : "s"}`}</Td>
                          <Td borderBottomColor="gray.600">
                            {item.locker.name}
                          </Td>
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Storage;