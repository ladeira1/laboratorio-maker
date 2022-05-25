import { Category } from '@prisma/client';
import { CategoryForm } from 'components/Form/CategoryForm';
import { Wrapper } from 'components/Wrapper';
import { useStyledToast } from 'hooks/useStyledToast';
import { GetServerSideProps } from 'next';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { categoryRequests } from 'requests/category';
import { prisma } from 'services/prisma';
import superjson from 'superjson';
import { CategoryValues } from 'types';

interface UpdateCategoryProps {
  category: Category;
}

const UpdateCategory = ({ category }: UpdateCategoryProps) => {
  const { success, error } = useStyledToast();

  const handleSubmit: SubmitHandler<CategoryValues> = async data => {
    try {
      await categoryRequests.update({
        ...data,
        id: category.id,
      });

      success({
        description: 'Categoria atualizado com sucesso',
      });
    } catch (err) {
      error({
        error: err,
      });
    }
  };

  return (
    <Wrapper title="Atualizar categoria" titleAlign="center">
      <CategoryForm initialValues={category} onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { pid } = context.query;

  if (!pid) {
    return {
      redirect: {
        destination: '/app/storage/categories',
        permanent: false,
      },
    };
  }

  const category = await prisma.category.findUnique({
    where: { id: Number(pid) },
  });

  return {
    props: {
      category: superjson.serialize(category).json,
    },
  };
};

export default UpdateCategory;
