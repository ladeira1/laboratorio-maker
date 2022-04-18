import { Category, Locker, Product } from '@prisma/client';
import { ProductForm } from 'components/Form/ProductForm';
import { Wrapper } from 'components/Wrapper';
import { useStyledToast } from 'hooks/useStyledToast';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { productRequests } from 'requests/product';
import { prisma } from 'services/prisma';
import superjson from 'superjson';
import { ProductValues } from 'types';

interface UpdateProductProps {
  product: Product;
  categories: Category[];
  lockers: Locker[];
}

const UpdateProduct = ({
  product,
  categories,
  lockers,
}: UpdateProductProps) => {
  const session = useSession();

  const { success, error } = useStyledToast();

  const handleSubmit: SubmitHandler<ProductValues> = async data => {
    try {
      await productRequests.update({
        ...data,
        id: product.id,
        updatedBy: session.data?.user?.email as string,
      });

      success({
        description: 'Produto atualizado com sucesso',
      });
    } catch (err) {
      error({
        error: err,
      });
    }
  };

  return (
    <Wrapper title="Atualizar produto" titleAlign="center">
      <ProductForm
        categories={categories}
        lockers={lockers}
        initialValues={product}
        onSubmit={handleSubmit}
      />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { pid } = context.query;

  if (!pid) {
    return {
      redirect: {
        destination: '/app/storage/products',
        permanent: false,
      },
    };
  }

  const category = await prisma.category.findMany();
  const lockers = await prisma.locker.findMany();
  const product = await prisma.product.findUnique({
    where: { id: Number(pid) },
  });

  return {
    props: {
      categories: superjson.serialize(category).json,
      lockers: superjson.serialize(lockers).json,
      product: superjson.serialize(product).json,
    },
  };
};

export default UpdateProduct;
