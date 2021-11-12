import { DbManager } from '~db';
import { Procedure } from '~models';

export default {
  async get(id: number): Promise<Procedure | undefined> {
    return (await DbManager.repo(Procedure)).findOne(id);
  },

  async getAll(): Promise<Procedure[]> {
    return (await DbManager.repo(Procedure)).find({ select: ['id', 'code', 'description'] });
  },

  async create(procedure: Object): Promise<Procedure> {
    return (await DbManager.repo(Procedure)).create(procedure);
  },

  async save(procedure: Procedure): Promise<Procedure> {
    return (await DbManager.repo(Procedure)).save(procedure);
  },

  async remove(procedure: Procedure): Promise<Procedure> {
    return (await DbManager.repo(Procedure)).remove(procedure);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Procedure)).count();
  }
};
