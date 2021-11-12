import { DbManager } from '~db';
import { CentreDeSante } from '~models';

export default {
  async get(id: number): Promise<CentreDeSante | undefined> {
    return (await DbManager.repo(CentreDeSante)).findOne(id);
  },

  async getAll(): Promise<CentreDeSante[]> {
    return (await DbManager.repo(CentreDeSante)).find({ select: ['id', 'nom'] });
  },

  async create(centreDeSante: Object): Promise<CentreDeSante> {
    return (await DbManager.repo(CentreDeSante)).create(centreDeSante);
  },

  async save(centreDeSante: CentreDeSante): Promise<CentreDeSante> {
    return (await DbManager.repo(CentreDeSante)).save(centreDeSante);
  },

  async remove(centreDeSante: CentreDeSante): Promise<CentreDeSante> {
    return (await DbManager.repo(CentreDeSante)).remove(centreDeSante);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(CentreDeSante)).count();
  }
};
