import { Category, Loan, Locker, Product, Schedule } from '@prisma/client';

export type ProductValues = Omit<Product, 'id'>;
export type ProductDetails = Product & {
  category: Category;
  locker: Locker;
  loan: Loan;
  schedule: Schedule;
};

export type ProductDetailsList = ProductDetails[];

export type CategoryValues = Omit<Category, 'id'>;
export type CategoryList = Category[];

export type LoanValues = Omit<Loan, 'id'>;
export type ScheduleValues = Omit<Schedule, 'id'>;
