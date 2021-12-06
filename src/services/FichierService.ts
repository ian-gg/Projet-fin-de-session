import { DbManager } from '~db';
import { Fichier, Patient } from '~models';

export default {
  async get(id: number): Promise<Fichier | undefined> {
    return (await DbManager.repo(Fichier)).findOne(id);
  },

  async getAll(patient: Patient): Promise<Fichier[]> {
    return (await DbManager.repo(Fichier)).find({
      where: { patient_id: patient.id },
      select: ['id', 'lien_ressource'],
    });
  },

  async create(fichier: Object): Promise<Fichier> {
    return (await DbManager.repo(Fichier)).create(fichier);
  },

  async createAll(fichiers: Object[]): Promise<Fichier[]> {
    return (await DbManager.repo(Fichier)).create(fichiers);
  },

  async save(fichier: Fichier): Promise<Fichier> {
    const repo = await DbManager.repo(Fichier);
    const saved = await repo.save(fichier);

    return DbManager.withLastSeqId(Fichier, saved);
  },

  async saveAll(fichiers: Fichier[]): Promise<Fichier[]> {
    return (await DbManager.repo(Fichier)).save(fichiers);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Fichier)).count();
  },
};
