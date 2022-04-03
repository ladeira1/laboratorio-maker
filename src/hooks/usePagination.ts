import { AxiosResponse } from "axios";
import { useState } from "react";

interface UsePaginationProps {
  request: () => Promise<AxiosResponse<Record<string, any>
//   {
//     products: ProductList;
//     nextPage: number | null;
//     totalPages: number;
// }
, any>>;
}

  export const usePagination = ({ request }: UsePaginationProps) => {
    const [page, setPage] = useState<number | null>(1);
    const [totalPages, setTotalPages] = useState<number>(2);
    const [isLoading, setIsLoading] = useState(false);

    const shouldFetchMoreData = page !== null && totalPages >= page && !isLoading

    const fetchMoreData = async () => {
      try{
        setIsLoading(true);
        const response = await request();
  
        setPage(response.data.nextPage);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);

        return response.data;
      } catch(err) {
        console.log(err)
      }
    }

    return {
      page,
      totalPages,
      isLoading,
      fetchMoreData,
      shouldFetchMoreData
    }
  }