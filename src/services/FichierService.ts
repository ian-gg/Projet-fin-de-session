import { getRepository } from 'typeorm';
import { Fichier, Patient } from '~models';

const repository = getRepository(Fichier);

export default {
  get(id: number): Promise<Fichier | undefined> {
    return repository.findOne(id);
  },

  getAll(patient: Patient): Promise<Fichier[]> {
    return repository.find({
      where: { patient_id: patient.id },
      select: ['id', 'lien_ressource']
    });
  },
};
