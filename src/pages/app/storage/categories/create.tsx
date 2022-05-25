import { CategoryForm } from 'components/Form/CategoryForm';
import { Wrapper } from 'components/Wrapper';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { categoryRequests } from 'requests/category';
import { CategoryValues } from 'types';
import { useStyledToast } from '../../../../hooks/useStyledToast';

const CreateCategory = () => {
  const { success, error } = useStyledToast();

  const handleSubmit: SubmitHandler<CategoryValues> = async data => {
    try {
      await categoryRequests.create(data);

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
    <Wrapper title="Cadastrar categoria" titleAlign="center">
      <CategoryForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default CreateCategory;
