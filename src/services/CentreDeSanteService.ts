import { getRepository } from 'typeorm';
import { CentreDeSante } from '~models';

const repository = getRepository(CentreDeSante);

export default {
  get(id: number): Promise<CentreDeSante | undefined> {
    return repository.findOne(id);
  },

  getAll(): Promise<CentreDeSante[]> {
    return repository.find({ select: ['id', 'nom'] });
  },
};
