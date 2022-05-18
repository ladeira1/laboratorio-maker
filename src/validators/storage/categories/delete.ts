import { NextApiRequest } from 'next';
import { prisma } from 'services/prisma';
import * as yup from 'yup';

const deleteSchema = yup.object({
  pid: yup
    .number()
    .typeError('Categoria inválida')
    .integer('Categoria inválida')
    .required('Categoria inválida'),
});

export const deleteCategoryValidator = async (req: NextApiRequest) => {
  if (!(await deleteSchema.isValid(req.query))) {
    await deleteSchema
      .validate(req.query, {
        abortEarly: true,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  const category = await prisma.category.findUnique({
    where: { id: Number(req.query.pid) },
  });

  if (!category) throw new Error('Esta categoria não existe');
};
