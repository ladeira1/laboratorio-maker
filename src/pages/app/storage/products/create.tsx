import { Category, Locker } from '@prisma/client';
import { ProductForm } from 'components/Form/ProductForm';
import { Wrapper } from 'components/Wrapper';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { productRequests } from 'requests/product';
import { prisma } from 'services/prisma';
import superjson from 'superjson';
import { ProductValues } from 'types';
import { useStyledToast } from '../../../../hooks/useStyledToast';

interface CreateProductProps {
  categories: Category[];
  lockers: Locker[];
}

const CreateProduct = ({ categories, lockers }: CreateProductProps) => {
  const session = useSession();

  const { success, error } = useStyledToast();

  const handleSubmit: SubmitHandler<ProductValues> = async data => {
    try {
      await productRequests.create({
        ...data,
        createdBy: session.data?.user?.email as string,
      });

      success({
        description: 'Produto criado com sucesso',
      });
    } catch (err) {
      error({
        error: err,
      });
    }
  };

  return (
    <Wrapper title="Cadastrar novo produto" titleAlign="center">
      <ProductForm
        categories={categories}
        lockers={lockers}
        onSubmit={handleSubmit}
      />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const category = await prisma.category.findMany();
  const lockers = await prisma.locker.findMany();

  return {
    props: {
      categories: superjson.serialize(category).json,
      lockers: superjson.serialize(lockers).json,
    },
  };
};

export default CreateProduct;
