import { NextApiRequest } from 'next';
import { prisma } from 'services/prisma';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().typeError('Nome inválido'),
  amount: yup
    .number()
    .typeError('Você precisa informar um número')
    .integer('A quantidade informada precisa ser um número inteiro'),
  pid: yup
    .number()
    .typeError('Produto inválido')
    .integer('Produto inválido')
    .required('Produto inválido'),
});

export const updateProductValidator = async (req: NextApiRequest) => {
  const { door, floor, categoryId, lockerId } = req.body;

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

  const product = await prisma.product.findUnique({
    where: { id: Number(req.query.pid) },
  });

  if (!product) throw new Error('Este produto não existe');

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) throw new Error('Categoria não encontrada');

  const locker = await prisma.locker.findUnique({ where: { id: lockerId } });

  if (!locker) throw new Error('Armário não encontrado');

  if (locker.numberOfDoors < door) {
    throw new Error('A porta informada não existe');
  }

  if (locker.numberOfFloors < floor) {
    throw new Error('O andar informado não existe');
  }
};
