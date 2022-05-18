import { Category, Locker, Product } from '@prisma/client';

export type ProductValues = Omit<Product, 'id'>;
export type ProductDetails = Product & {
  category: Category;
  locker: Locker;
};

export type ProductDetailsList = ProductDetails[];

export type CategoryList = Category[];
