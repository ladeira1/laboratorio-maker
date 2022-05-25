import React from 'react';
import { Wrapper } from 'components/Wrapper';
import { LoanForm } from 'components/Form/LoanForm';

const CreateLoan = () => {
  return (
    <Wrapper title="Realizar novo Empréstimo" titleAlign="center">
      <LoanForm />
    </Wrapper>
  );
};

export default CreateLoan;
