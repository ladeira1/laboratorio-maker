import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FormControl, Text, Input as ChakraInput, InputProps as ChakraInputProps, Tooltip, FormErrorMessage, Icon, Input, Box } from "@chakra-ui/react"
import { FieldError } from "react-hook-form";
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  label?: string;
  name: string;
  error?: FieldError;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, my, mt, mb, error, ...rest }, ref) => {
  return (
    <FormControl
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    minWidth="100%"
    width="100%"
    isInvalid={!!error}
    my={my}
    mt={mt}
    mb={mb}
  >
    {!!label && <Text color="white" fontSize="1rem" fontWeight="500" mb="0.5rem">{label}</Text>}
    <ChakraInput
      borderColor="gray.800"
      _hover={{
        borderColor: 'red'
      }}
      _placeholder={{
        color: 'gray.400',
        fontSize: '1rem',
        fontWeight: '400'
      }}
      _focus={{
        borderColor: 'red',
        fontWeight: '600'
      }}
      size="lg"
      fontSize="1rem"
      aria-label={name}
      name={name}
      ref={ref}
      {...rest}
    />

    {!!error ? (
      <FormErrorMessage mt="0.5rem" ml="0.2rem" zIndex="tooltip">
        <Text color="red" fontSize="0.8rem">{error.message}</Text>
      </FormErrorMessage>
    ) : <Box h="2rem" />}
  </FormControl>
  )
}
export const TextInput = forwardRef(TextInputBase);