import { Button, Flex, HStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CategoryValues } from 'types';
import * as yup from 'yup';
import { TextInput } from './TextInput';

interface CategoryFormProps {
  initialValues?: CategoryValues;
  onSubmit: (values: CategoryValues) => void;
}

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
});

export const CategoryForm = ({
  initialValues,
  onSubmit,
}: CategoryFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <Flex
      flexDir="column"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      borderWidth={2}
      borderColor="gray.800"
      borderRadius="5"
      p="2rem"
      w="100%"
      maxW="500px"
      margin="0 auto"
    >
      <TextInput
        placeholder="Motor..."
        label="Nome da categoria"
        {...register('name')}
        error={errors?.name}
      />

      <TextInput
        placeholder="Descreva a categoria"
        label="Descrição da categoria"
        {...register('description')}
        error={errors?.description}
      />

      <HStack spacing="8" mt={['4', '12']}>
        <Button
          flex="1"
          size="lg"
          variant="outline"
          onClick={() => router.back()}
        >
          Voltar
        </Button>
        <Button flex="1" type="submit" size="lg">
          {initialValues ? 'Atualizar' : 'Criar'}
        </Button>
      </HStack>
    </Flex>
  );
};
