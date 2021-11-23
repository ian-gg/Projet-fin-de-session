import { DbManager } from '~db';
import { CentreDeSante } from '~models';

export default {
  async get(id: number): Promise<CentreDeSante | undefined> {
    return (await DbManager.repo(CentreDeSante))
    .findOneOrFail({
      where: { id },
      relations: ['patients'],
    });
  },

  async getAll(): Promise<CentreDeSante[]> {
    return (await DbManager.repo(CentreDeSante)).find({ select: ['id', 'nom'] });
  },

  async create(centreDeSante: Object): Promise<CentreDeSante> {
    return (await DbManager.repo(CentreDeSante)).create(centreDeSante);
  },

  async save(centreDeSante: CentreDeSante): Promise<CentreDeSante> {
    const repo = await DbManager.repo(CentreDeSante);
    const saved = await repo.save(centreDeSante);

    return DbManager.withLastSeqId(CentreDeSante, saved);
  },

  async remove(centreDeSante: CentreDeSante): Promise<CentreDeSante> {
    return (await DbManager.repo(CentreDeSante)).remove(centreDeSante);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(CentreDeSante)).count();
  }
};
