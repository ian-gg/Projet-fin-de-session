import { DbManager } from '~db';
import { CentreDeSante, Patient } from '~models';

export default {
  async get(id: number): Promise<Patient | undefined> {
    return (await DbManager.repo(Patient))
      .findOneOrFail({
        where: { id },
        relations: ['centre_de_sante'],
      });
  },

  async getAll(): Promise<Patient[]> {
    return (await DbManager.repo(Patient)).find({
      select: ['id', 'num_dossier', 'nom'],
    });
  },
  
  async forCentreDeSante(centre: CentreDeSante): Promise<Patient[]> {
    return (await DbManager.repo(Patient)).find({
      where: { centre_de_sante_id: centre.id },
      select: ['id', 'num_dossier', 'nom'],
    });
  },

  async create(patient: Object): Promise<Patient> {
    return (await DbManager.repo(Patient)).create(patient);
  },

  async createAll(patients: Object[]): Promise<Patient[]> {
    return (await DbManager.repo(Patient)).create(patients);
  },

  async save(patient: Patient): Promise<Patient> {
    const repo = await DbManager.repo(Patient);
    const saved = await repo.save(patient);

    return DbManager.withLastSeqId(Patient, saved);
  },

  async saveAll(patients: Patient[]): Promise<Patient[]> {
    return (await DbManager.repo(Patient)).save(patients);
  },

  async remove(patient: Patient): Promise<Patient> {
    return (await DbManager.repo(Patient)).remove(patient);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(Patient)).count();
  }
};
