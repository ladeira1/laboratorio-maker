import {
  Flex,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  Link,
} from "@chakra-ui/react";
import { Category, Locker, Product } from "@prisma/client";
import { Sidebar } from "components/Sidebar";
import { GetServerSideProps } from "next";
import React from "react";
import { prisma } from "services/prisma";
import superjson from "superjson";
import NextLink from "next/link";

const columNames = [
  "Categoria",
  "Nome",
  "Quantidade",
  "Armário",
  "Porta",
  "Andar",
];

interface StorageProps {
  products: (Product & {
    category: Category;
    locker: Locker;
  })[];
}

const Storage = ({ products }: StorageProps) => {
  return (
    <Flex direction="column" h="100vh">
      <Flex w="100vw">
        <Sidebar />

        <Flex flex="1" m="8" flexDir="column">
          <Heading as="h2">Produtos Em estoque</Heading>
          <NextLink passHref href="/app/storage/products/create">
            <Button as={Link} w="sm" my="8">
              Cadastrar novo produto
            </Button>
          </NextLink>

          <TableContainer
            borderWidth={1}
            borderColor="gray.200"
            borderRadius={10}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  {columNames.map((item) => (
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
                    <Td borderBottomColor="gray.600">{item.category.name}</Td>
                    <Td borderBottomColor="gray.600">{item.name}</Td>
                    <Td borderBottomColor="gray.600">{`${item.amount} unidade${
                      item?.amount === 1 ? "" : "s"
                    }`}</Td>
                    <Td borderBottomColor="gray.600">{item.locker.name}</Td>
                    <Td borderBottomColor="gray.600">{item.door}</Td>
                    <Td borderBottomColor="gray.600">{item.floor}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await prisma.product.findMany({
    include: { category: true, locker: true },
  });

  return {
    props: {
      products: superjson.serialize(products).json,
    },
  };
};

export default Storage;
