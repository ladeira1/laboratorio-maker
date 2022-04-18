import {
  Box,
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
} from '@chakra-ui/react';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  label?: string;
  name: string;
  error?: FieldError;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, my, mt, mb, error, ...rest },
  ref,
) => (
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
    {!!label && (
      <Text color="white" fontSize="1rem" fontWeight="500" mb="0.5rem">
        {label}
      </Text>
    )}
    <ChakraInput
      borderColor="gray.800"
      _hover={{
        borderColor: 'red',
      }}
      _placeholder={{
        color: 'gray.600',
        fontSize: '1rem',
        fontWeight: '400',
      }}
      _focus={{
        borderColor: 'red',
        fontWeight: '600',
      }}
      size="lg"
      fontSize="1rem"
      aria-label={name}
      name={name}
      ref={ref}
      {...rest}
    />

    {error ? (
      <FormErrorMessage mt="0.5rem" ml="0.2rem" zIndex="tooltip">
        <Text color="red" fontSize="0.8rem">
          {error.message}
        </Text>
      </FormErrorMessage>
    ) : (
      <Box h="2rem" />
    )}
  </FormControl>
);

export const TextInput = forwardRef(TextInputBase);
