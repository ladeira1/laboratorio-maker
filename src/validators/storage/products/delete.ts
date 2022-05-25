import { NextApiRequest } from 'next';
import { prisma } from 'services/prisma';
import * as yup from 'yup';

const deleteSchema = yup.object({
  pid: yup
    .number()
    .typeError('Produto inválido')
    .integer('Produto inválido')
    .required('Produto inválido'),
});

export const deleteProductValidator = async (req: NextApiRequest) => {
  if (!(await deleteSchema.isValid(req.query))) {
    await deleteSchema
      .validate(req.query, {
        abortEarly: true,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  const product = await prisma.product.findUnique({
    where: { id: Number(req.query.pid) },
  });

  if (!product) throw new Error('Este produto não existe');
};
