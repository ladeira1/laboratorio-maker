import { api } from 'services/api';
import { ProductDetailsList } from 'types';

const list = async ({ page }: CategoryList) => {
  return api.get<{
    products: ProductDetailsList;
    nextPage: number | null;
    totalPages: number;
  }>(`/api/storage/categories?page=${page}&limit=${20}`);
};

const remove = async (id: string | number) => {
  await api.delete(`/api/storage/categories/delete/${id}`);
};

interface CategoryList {
  page: number | null;
}

export const categoryRequests = {
  list,
  remove,
};
