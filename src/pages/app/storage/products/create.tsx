import { Button, Flex, Heading, HStack, useToast } from "@chakra-ui/react";
import { Category, Locker, Product } from "@prisma/client";
import { Sidebar } from "components/Sidebar";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from "components/Form/TextInput";
import { GetServerSideProps } from "next";
import { prisma } from "services/prisma";
import superjson from "superjson";
import { Select } from "components/Form/Select";
import { useRouter } from "next/router";
import { api } from "services/api";
import { useSession } from "next-auth/react";
import { useStyledToast } from "../../../../hooks/useStyledToast";
import { Wrapper } from "components/Wrapper";
import { Item } from "components/Item";

type Values = Omit<Product, "id">;

interface CreateProductProps {
  categories: Category[];
  lockers: Locker[];
}

const CreateProduct = ({ categories, lockers }: CreateProductProps) => {
  const router = useRouter();
  const session = useSession();

  const [selectedLockerData, setSelectedLockerData] = useState<
    Pick<Locker, "numberOfDoors" | "numberOfFloors">
  >({
    numberOfDoors: lockers[0].numberOfDoors,
    numberOfFloors: lockers[0].numberOfFloors,
  });

  const schema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    amount: yup
      .number()
      .typeError("Você precisa informar um número")
      .integer("A quantidade informada precisa ser um número inteiro")
      .required("Campo obrigatório"),
    categoryId: yup.number().integer().required("Campo obrigatório"),
    lockerId: yup.number().integer().required("Campo obrigatório"),
    door: yup
      .number()
      .typeError("Você precisa informar um número")
      .integer("Você precisa informar um número inteiro")
      .min(1, "O valor deve ser maior o igual a 1")
      .max(
        selectedLockerData?.numberOfDoors ?? 1,
        `O valor informado deve ser menor ou igual a ${
          selectedLockerData?.numberOfDoors ?? 1
        }`
      )
      .required("Campo obrigatório"),
    floor: yup
      .number()
      .typeError("Você precisa informar um número")
      .integer()
      .min(1, "O valor deve ser maior o igual a 1")
      .max(
        selectedLockerData?.numberOfFloors ?? 1,
        `O valor informado deve ser menor ou igual a ${
          selectedLockerData?.numberOfFloors ?? 1
        }`
      )
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: yupResolver(schema) });

  const { success, error } = useStyledToast();

  const handleChangeSelectedLockerData = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLockerId = event.target.value;
    const selectedLocker = lockers.find(
      (item) => item.id === Number(selectedLockerId)
    );

    if (selectedLocker) {
      setSelectedLockerData({
        numberOfDoors: selectedLocker.numberOfDoors,
        numberOfFloors: selectedLocker.numberOfFloors,
      });
    }
  };

  const onSubmit: SubmitHandler<Values> = async (data) => {
    try {
      await api.post("/api/storage/products/create", {
        ...data,
        createdBy: session.data?.user?.email,
      });

      success({
        description: "Produto criado com sucesso",
      });
    } catch (err) {
      error({
        error: err,
      });
    }
  };

  return (
    <Wrapper title="Cadastrar produto" titleAlign="center">
      <Flex minH="100%">
        <Flex
          flexDir={"column"}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          borderWidth={2}
          borderColor="gray.800"
          borderRadius="5"
          p="2rem"
          w="100%"
          maxW="500px"
          margin="0 auto"
          overflowY={"scroll"}
        >
          <TextInput
            placeholder="Motor..."
            label="Nome do produto"
            {...register("name")}
            error={errors?.name}
          />

          <TextInput
            type="number"
            label="Quantidade em estoque"
            {...register("amount")}
            error={errors?.amount}
          />

          <Select
            label="Selecione a categoria"
            {...register("categoryId")}
            options={categories}
          />

          <Select
            label="Selecione o armário"
            {...register("lockerId")}
            options={lockers}
            onChange={handleChangeSelectedLockerData}
          />

          <Select
            label="Selecione a porta do armário"
            {...register("door")}
            options={[...new Array(selectedLockerData?.numberOfDoors ?? 0)].map(
              (_, index) => ({
                id: index + 1,
                name: String(index + 1),
              })
            )}
            error={errors?.door}
          />

          <Select
            label="Selecione o andar do armário"
            {...register("floor")}
            options={[
              ...new Array(selectedLockerData?.numberOfFloors ?? 0),
            ].map((_, index) => ({
              id: index + 1,
              name: String(index + 1),
            }))}
            error={errors?.floor}
          />

          <HStack spacing="8" mt={["2", "8"]}>
            <Button
              flex="1"
              size="lg"
              variant="outline"
              onClick={() => router.back()}
            >
              Voltar
            </Button>
            <Button flex="1" type="submit" size="lg">
              Criar
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const category = await prisma.category.findMany();
  const lockers = await prisma.locker.findMany();

  return {
    props: {
      categories: superjson.serialize(category).json,
      lockers: superjson.serialize(lockers).json,
    },
  };
};

export default CreateProduct;
