import { Button, Flex, HStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Category, Locker, Product } from "@prisma/client";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Select } from "./Select";
import { TextInput } from "./TextInput";

type ProductValues = Omit<Product, "id">;

interface ProductFormProps {
  initialValues?: ProductValues;
  categories: Category[];
  lockers: Locker[];
  onSubmit: (values: ProductValues) => void;
}

export const ProductForm = ({
  initialValues,
  categories,
  lockers,
  onSubmit,
}: ProductFormProps) => {
  const router = useRouter();

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
  } = useForm<ProductValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

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

  return (
    <Flex
      flexDir={"column"}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      borderWidth={2}
      borderColor="gray.800"
      borderRadius="5"
      p="2rem"
      w="500px"
      margin="0 auto"
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
        options={[...new Array(selectedLockerData?.numberOfFloors ?? 0)].map(
          (_, index) => ({
            id: index + 1,
            name: String(index + 1),
          })
        )}
        error={errors?.floor}
      />

      <HStack spacing="8" mt="12">
        <Button
          flex="1"
          size="lg"
          variant="outline"
          onClick={() => router.back()}
        >
          Voltar
        </Button>
        <Button flex="1" type="submit" size="lg">
          {initialValues ? "Atualizar" : "Criar"}
        </Button>
      </HStack>
    </Flex>
  );
};
