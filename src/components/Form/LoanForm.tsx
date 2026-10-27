import React from 'react';
import { Button, Flex, HStack } from "@chakra-ui/react"
import { TextInput } from './TextInput';
import { useRouter } from 'next/router';
import { LoanValues } from 'types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface LoanFormProps {
  onSubmit: (values: LoanValues) => void;
}

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
});

export const LoanForm = ({
  onSubmit,
}: LoanFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanValues>({
    resolver: yupResolver(schema),
    defaultValues: {},
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
        placeholder="Nome do item"
        label="Item"
        {...register('item')}
        error={errors?.item}
      />

      <TextInput
        placeholder="Quantidade do item"
        label="Quantidade"
        {...register('quantity')}
        error={errors?.quantity}
      />

      <TextInput
        placeholder="Nome do aluno"
        label="Aluno solicitante"
        {...register('student')}
        error={errors?.student}
      />

      <TextInput
        placeholder="Matrícula do aluno"
        label="Matrícula do solicitante"
        {...register('enrollment')}
        error={errors?.enrollment}
      />

      <TextInput
        placeholder="Nome do responsável"
        label="Responsável pelo empréstimo"
        {...register('responsible')}
        error={errors?.responsible}
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
          Registrar empréstimo
        </Button>
      </HStack>
    </Flex>
  )
}