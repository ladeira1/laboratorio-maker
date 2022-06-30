import React from 'react';
import { Wrapper } from 'components/Wrapper';
import { LoanForm } from 'components/Form/LoanForm';
import { useStyledToast } from '../../../hooks/useStyledToast';
import { SubmitHandler } from 'react-hook-form';
import { LoanValues } from 'types';
import { loanRequests } from 'requests/loan';

const CreateLoan = () => {
  const { success, error } = useStyledToast();

  const handleSubmit: SubmitHandler<LoanValues> = async data => {
    try {
      await loanRequests.create(data);

      success({
        description: 'Empréstimo realizado com sucesso',
      });
    } catch (err) {
      error({
        error: err,
      });
    }
  };

  return (
    <Wrapper title="Realizar novo Empréstimo" titleAlign="center">
      <LoanForm onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default CreateLoan;
