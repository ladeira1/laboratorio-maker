import { useToast, UseToastOptions } from "@chakra-ui/react";

interface Error {
  response: {
    data: { error: string };
  };
}

type UserErrorToastOptions = Omit<UseToastOptions, "description"> & {
  error: Error | unknown;
};

export const useStyledToast = () => {
  const defaultToast = useToast();

  const toast = ({
    description,
    status = "success",
    isClosable = true,
    duration = 3000,
    position = "top-right",
  }: UseToastOptions) => {
    defaultToast({
      description,
      status,
      isClosable,
      duration,
      position,
    });
  };

  const success = (options: UseToastOptions) => {
    toast({
      ...options,
      status: "success",
    });
  };

  const error = ({ error, ...rest }: UserErrorToastOptions) => {
    toast({
      ...rest,
      description: (error as Error).response.data.error,
      status: "warning",
    });
  };

  return { success, error };
};
