import { useRouter } from "next/router";
import { ScheduleValues } from "types";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import { TextInput } from "./TextInput";

interface ScheduleFormProps {
  onSubmit: (values: ScheduleValues) => void;
}

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
});

const ScheduleForm = ({ onSubmit }: ScheduleFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleValues>({
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
        placeholder="nome do responsável pelo agendamento"
        label="Responsável"
        {...register('responsible')}
        error={errors?.responsible}
      />

      <TextInput
        placeholder="atividade a ser realizada"
        label="Atividade"
        {...register('activity')}
        error={errors?.activity}
      />

      <TextInput
        label="Data do agendamento"
        type='date'
        {...register('scheduleDate')}
        error={errors?.scheduleDate}
      />

      <TextInput
        label="Horário do agendamento"
        type='time'
        {...register('scheduleHour')}
        error={errors?.scheduleHour}
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
          Agendar
        </Button>
      </HStack>

    </Flex>
  )
}

export default ScheduleForm