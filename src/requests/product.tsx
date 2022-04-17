import { Product } from '@prisma/client';
import { api } from 'services/api';
import { ProductDetailsList, ProductValues } from 'types';

const list = async ({ page }: ProductList) => {
  return api.get<{
    products: ProductDetailsList;
    nextPage: number | null;
    totalPages: number;
  }>(`/api/storage/products?page=${page}&limit=${20}`);
};

const create = async (data: ProductValues) => {
  await api.post('/api/storage/products/create', data);
};

const update = async (data: Product) => {
  await api.put(`/api/storage/products/update/${data.id}`, data);
};

interface ProductList {
  page: number | null;
}

export const productRequests = {
  list,
  create,
  update,
};
