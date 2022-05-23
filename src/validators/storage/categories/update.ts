import { NextApiRequest } from 'next';
import { prisma } from 'services/prisma';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().typeError('Nome inválido'),
  description: yup.string().typeError('Descrição inválida'),
  pid: yup
    .number()
    .typeError('Produto inválido')
    .integer('Produto inválido')
    .required('Produto inválido'),
});

export const updateCategoryValidator = async (req: NextApiRequest) => {
  if (!(await schema.isValid({ ...req.body, ...req.query }))) {
    await schema
      .validate(
        { ...req.body, ...req.query },
        {
          abortEarly: true,
        },
      )
      .catch(err => {
        throw new Error(err);
      });
  }

  const category = await prisma.category.findUnique({
    where: { id: Number(req.query.pid) },
  });

  if (!category) throw new Error('Categoria não encontrada');
};
