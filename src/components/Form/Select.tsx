import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  FormControl,
  Text,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Tooltip,
  FormErrorMessage,
  Icon,
  Input,
  Box,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";
import { FiAlertCircle } from "react-icons/fi";

interface SelectProps extends ChakraSelectProps {
  label?: string;
  name: string;
  options?: { id: string | number; name: string }[];
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, options, label, my, mt, mb, error, ...rest },
  ref
) => {
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
      {!!label && (
        <Text color="white" fontSize="1rem" fontWeight="500" mb="0.5rem">
          {label}
        </Text>
      )}
      <ChakraSelect
        borderColor="gray.800"
        _hover={{
          borderColor: "red",
        }}
        _placeholder={{
          color: "gray.600",
          fontSize: "1rem",
          fontWeight: "400",
        }}
        _focus={{
          borderColor: "red",
          fontWeight: "600",
        }}
        size="lg"
        fontSize="1rem"
        aria-label={name}
        name={name}
        ref={ref}
        {...rest}
      >
        {options?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </ChakraSelect>

      {!!error ? (
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
};
export const Select = forwardRef(SelectBase);
