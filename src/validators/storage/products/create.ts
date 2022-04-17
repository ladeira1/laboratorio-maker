import { NextApiRequest } from 'next';
import { prisma } from 'services/prisma';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  amount: yup
    .number()
    .typeError('Você precisa informar um número')
    .integer('A quantidade informada precisa ser um número inteiro')
    .required('Campo obrigatório'),
});

export const createProductValidator = async (req: NextApiRequest) => {
  const { name, door, floor, categoryId, lockerId } = req.body;

  if (!(await schema.isValid(req.body))) {
    await schema
      .validate(req.body, {
        abortEarly: true,
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  const product = await prisma.product.findFirst({
    where: { name, categoryId },
  });

  if (product) throw new Error('Este produto já existe');

  const category = await prisma.category.findFirst({
    where: { id: categoryId },
  });

  if (!category) throw new Error('Categoria não encontrada');

  const locker = await prisma.locker.findFirst({ where: { id: lockerId } });

  if (!locker) throw new Error('Armário não encontrado');

  if (locker.numberOfDoors < door) {
    throw new Error('A porta informada não existe');
  }

  if (locker.numberOfFloors < floor) {
    throw new Error('O andar informado não existe');
  }
};
