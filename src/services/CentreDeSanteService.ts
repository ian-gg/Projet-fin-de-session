import { remove } from 'mobx';
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

  save(centreDeSante: CentreDeSante): Promise<CentreDeSante> {
    return repository.save(centreDeSante);
  },

  remove(centreDeSante: CentreDeSante): Promise<CentreDeSante> {
    return repository.remove(centreDeSante);
  },
};
