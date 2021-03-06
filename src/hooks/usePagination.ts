import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useStyledToast } from './useStyledToast';

interface UsePaginationProps {
  request: () => Promise<AxiosResponse<Record<string, any>, any>>;
}

export const usePagination = ({ request }: UsePaginationProps) => {
  const { error: errorToast } = useStyledToast();

  const [page, setPage] = useState<number | null>(1);
  const [totalPages, setTotalPages] = useState<number>(2);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const shouldFetchMoreData =
    !hasError && page !== null && totalPages >= page && !isLoading;

  const fetchMoreData = async () => {
    try {
      setHasError(false);
      setIsLoading(true);
      const response = await request();

      setPage(response.data.nextPage);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);

      return response.data;
    } catch (err) {
      setIsLoading(false);
      setHasError(true);
      errorToast({ error: err });
    }

    return undefined;
  };

  return {
    page,
    totalPages,
    isLoading,
    fetchMoreData,
    shouldFetchMoreData,
  };
};
