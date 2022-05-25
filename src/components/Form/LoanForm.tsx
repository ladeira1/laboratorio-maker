import React from 'react';
import { Button, Flex, HStack } from "@chakra-ui/react"
import { TextInput } from './TextInput';

export const LoanForm = () => {
  return (
    <Flex
      flexDir="column"
      as="form"
      // onSubmit={handleSubmit(onSubmit)}
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
      // {...register('name')}
      // error={errors?.name}
      />

      <TextInput
        placeholder="Quantidade do item"
        label="Quantidade"
      // {...register('name')}
      // error={errors?.name}
      />

      <TextInput
        placeholder="Nome do aluno"
        label="Aluno solicitante"
      // {...register('description')}
      // error={errors?.description}
      />

      <TextInput
        placeholder="Matrícula do aluno"
        label="Matrícula do solicitante"
      // {...register('description')}
      // error={errors?.description}
      />

      <TextInput
        placeholder="Nome do responsável"
        label="Responsável pelo empréstimo"
      // {...register('description')}
      // error={errors?.description}
      />

      <HStack spacing="8" mt={['4', '12']}>
        <Button
          flex="1"
          size="lg"
          variant="outline"
        // onClick={() => router.back()}
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