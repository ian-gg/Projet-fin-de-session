import { getRepository } from 'typeorm';
import { Diagnostic } from '~models';

const repository = getRepository(Diagnostic);

export default {
  get(id: number): Promise<Diagnostic | undefined> {
    return repository.findOne(id);
  },

  getAll(): Promise<Diagnostic[]> {
    return repository.find({ select: ['id', 'etiquette', 'description'] });
  },
};
