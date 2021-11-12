import { DbManager } from '~db';
import { Fichier, Patient } from '~models';

export default {
  async get(id: number): Promise<Fichier | undefined> {
    return (await DbManager.repo(Fichier)).findOne(id);
  },

  async getAll(patient: Patient): Promise<Fichier[]> {
    return (await DbManager.repo(Fichier)).find({
      where: { patient_id: patient.id },
      select: ['id', 'lien_ressource']
    });
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Fichier)).count();
  }
};
