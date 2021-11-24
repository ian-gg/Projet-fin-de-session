import { DbManager } from '~db';
import { Diagnostic } from '~models';

export default {
  async get(id: number): Promise<Diagnostic | undefined> {
    return (await DbManager.repo(Diagnostic)).findOne(id);
  },

  async getAll(): Promise<Diagnostic[]> {
    return (await DbManager.repo(Diagnostic))
      .createQueryBuilder('diagnostic')
      .leftJoinAndSelect('diagnostic.interventions', 'interventions')
      .select([
        'diagnostic.id', 'diagnostic.etiquette', 'diagnostic.description',
        'interventions.id'
      ])
      .getMany();
  },

  async create(diagnostic: Object): Promise<Diagnostic> {
    return (await DbManager.repo(Diagnostic)).create(diagnostic);
  },

  async save(diagnostic: Diagnostic): Promise<Diagnostic> {
    const repo = await DbManager.repo(Diagnostic);
    const saved = await repo.save(diagnostic);

    return DbManager.withLastSeqId(Diagnostic, saved);
  },

  async remove(diagnostic: Diagnostic): Promise<Diagnostic> {
    return (await DbManager.repo(Diagnostic)).remove(diagnostic);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Diagnostic)).count();
  }
};
