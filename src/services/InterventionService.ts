import { getRepository } from 'typeorm';
import { Intervention, Patient } from '~models';

const repository = getRepository(Intervention);

export default {
  get(id: number): Promise<Intervention | undefined> {
    return repository.findOne(id);
  },

  getAll(patient: Patient): Promise<Intervention[]> {
    return repository.find({
      where: { patient_id: patient.id },
      select: ['id', 'diagnostic', 'date_debut', 'date_fin', 'commentaire'],
    });
  },
};
