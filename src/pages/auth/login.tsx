import { Button, Flex, Heading, HStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { TextInput } from "../../components/Form/TextInput";

const schema = yup.object({
  email: yup.string().email('Por favor, informe um e-mail válido').required('Campo obrigatório'),
  password: yup.string().min(12, 'A senha deve ter, pelo menos, 12 caracteres').required('Campo obrigatório'),
}).required();


interface Values {
  email: string,
  password: string,
};

const Login: NextPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Values> = data => {
    console.log(data);
  }

  const handleCreateAccount = () => {
    console.log('todo')
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex flexDir="column" as="form" onSubmit={handleSubmit(onSubmit)} borderWidth={1} borderColor="gray.800" borderRadius="5" p="2rem" w="500px">
          <Heading as="h2" fontSize="1.6rem" mb="2rem">Laboratório Maker</Heading>

          <TextInput
            placeholder="exemplo@email.com"
            label="E-mail"
            {...register('email')}
            error={errors?.email}
          />

          <TextInput
            placeholder="******"
            label="Senha"
            {...register('password')}
            error={errors?.password}
            mt="1rem"
            mb="4rem"
          />

          <HStack spacing="8">
            <Button flex="1" size="lg" variant="outline">Criar conta</Button>
            <Button flex="1" type="submit" size="lg">Acessar</Button>
          </HStack>
      </Flex>
    </Flex>
  )
}

export default Login;