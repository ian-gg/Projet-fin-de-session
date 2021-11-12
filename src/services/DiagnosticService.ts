import { DbManager } from '~db';
import { Diagnostic } from '~models';

export default {
  async get(id: number): Promise<Diagnostic | undefined> {
    return (await DbManager.repo(Diagnostic)).findOne(id);
  },

  async getAll(): Promise<Diagnostic[]> {
    return (await DbManager.repo(Diagnostic)).find({ select: ['id', 'etiquette', 'description'] });
  },

  async create(diagnostic: Object): Promise<Diagnostic> {
    return (await DbManager.repo(Diagnostic)).create(diagnostic);
  },

  async save(diagnostic: Diagnostic): Promise<Diagnostic> {
    return (await DbManager.repo(Diagnostic)).save(diagnostic);
  },

  async remove(diagnostic: Diagnostic): Promise<Diagnostic> {
    return (await DbManager.repo(Diagnostic)).remove(diagnostic);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Diagnostic)).count();
  }
};
