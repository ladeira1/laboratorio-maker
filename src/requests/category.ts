import { Category } from '@prisma/client';
import { api } from 'services/api';
import { CategoryValues, ProductDetailsList } from 'types';

const list = async ({ page }: CategoryList) => {
  return api.get<{
    products: ProductDetailsList;
    nextPage: number | null;
    totalPages: number;
  }>(`/api/storage/categories?page=${page}&limit=${20}`);
};

const create = async (data: CategoryValues) => {
  await api.post('/api/storage/categories/create', data);
};

const update = async (data: Category) => {
  await api.put(`/api/storage/categories/update/${data.id}`, data);
};

const remove = async (id: string | number) => {
  await api.delete(`/api/storage/categories/delete/${id}`);
};

interface CategoryList {
  page: number | null;
}

export const categoryRequests = {
  list,
  create,
  update,
  remove,
};
