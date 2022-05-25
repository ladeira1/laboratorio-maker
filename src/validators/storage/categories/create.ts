import { NextApiRequest } from 'next';
import { prisma } from 'services/prisma';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
});

export const createCategoryValidator = async (req: NextApiRequest) => {
  const { name } = req.body;

  if (!(await schema.isValid(req.body))) {
    await schema
      .validate(req.body, {
        abortEarly: true,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  const category = await prisma.category.findFirst({
    where: { name },
  });

  if (category) throw new Error('Esta categoria já existe');
};
