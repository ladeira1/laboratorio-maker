import { Category, Loan, Locker, Product } from '@prisma/client';

export type ProductValues = Omit<Product, 'id'>;
export type ProductDetails = Product & {
  category: Category;
  loan: Loan;
  locker: Locker;
};

export type ProductDetailsList = ProductDetails[];

export type CategoryValues = Omit<Category, 'id'>;
export type CategoryList = Category[];

export type LoanValues = Omit<Loan, 'id'>;
