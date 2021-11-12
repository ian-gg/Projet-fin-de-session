import { DbManager } from '~db';
import { Intervention, Patient } from '~models';

export default {
  async get(id: number): Promise<Intervention | undefined> {
    return (await DbManager.repo(Intervention)).findOne(id);
  },

  async getAll(patient: Patient): Promise<Intervention[]> {
    return (await DbManager.repo(Intervention)).find({
      where: { patient_id: patient.id },
      select: ['id', 'diagnostic', 'date_debut', 'date_fin', 'commentaire'],
    });
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Intervention)).count();
  }
};
