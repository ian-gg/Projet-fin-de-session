import { DbManager } from '~db';
import { Procedure } from '~models';

export default {
  async get(id: number): Promise<Procedure | undefined> {
    return (await DbManager.repo(Procedure)).findOne(id);
  },

  async getAll(): Promise<Procedure[]> {
    return (await DbManager.repo(Procedure))
      .createQueryBuilder('procedure')
      .leftJoinAndSelect('procedure.intervention_procedures', 'intervention_procedures')
      .select([
        'procedure.id', 'procedure.code', 'procedure.description',
        'intervention_procedures.id'
      ])
      .getMany();
  },

  async create(procedure: Object): Promise<Procedure> {
    return (await DbManager.repo(Procedure)).create(procedure);
  },

  async save(procedure: Procedure): Promise<Procedure> {
    const repo = await DbManager.repo(Procedure);
    const saved = await repo.save(procedure);

    return DbManager.withLastSeqId(Procedure, saved);
  },

  async remove(procedure: Procedure): Promise<Procedure> {
    return (await DbManager.repo(Procedure)).remove(procedure);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Procedure)).count();
  }
};
