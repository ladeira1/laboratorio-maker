import { Button, Center, Flex, Link, Spinner } from "@chakra-ui/react";
import { Category, Locker, Product } from "@prisma/client";
import { Item } from "components/Item";
import { ListItem } from "components/ListItem";
import { Wrapper } from "components/Wrapper";
import { usePagination } from "hooks/usePagination";
import NextLink from "next/link";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { api } from "services/api";
import { colors } from "styles/theme";
import { getValueFromItem } from "utils/getValueFromItem";

const valuesOByItem = [
  { title: "Categoria", value: "category" },
  { title: "Nome", value: "name" },
  { title: "Quantidade", value: "amount" },
  { title: "Armário", value: "locker" },
  { title: "Porta", value: "door" },
  { title: "Andar", value: "floor" },
];

type ProductDetails = Product & {
  category: Category;
  locker: Locker;
};

type ProductDetailsList = ProductDetails[];

const Storage = () => {
  const fetchProducts = async () => {
    return await api.get<{
      products: ProductDetailsList;
      nextPage: number | null;
      totalPages: number;
    }>(`/api/storage/products?page=${page}&limit=${20}`);
  };

  const { page, isLoading, shouldFetchMoreData, fetchMoreData } = usePagination(
    {
      request: fetchProducts,
    }
  );

  const [products, setProducts] = useState<ProductDetailsList>([]);

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
        <Flex
          flex="1"
          flexDir={"column"}
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
              <Flex maxW="100%" flexDir="column">
                {products?.map((item) => (
                  <ListItem
                    key={item.id}
                    item={{
                      id: item.id,
                      data: valuesOByItem.map((data) => ({
                        title: data.title,
                        value: getValueFromItem(data.value, item),
                      })),
                    }}
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
