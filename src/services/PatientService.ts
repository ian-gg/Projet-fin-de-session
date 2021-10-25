import { getRepository } from 'typeorm';
import { CentreDeSante, Patient } from '~models';

const repository = getRepository(Patient);

export default {
  get(id: number): Promise<Patient | undefined> {
    return repository.findOne(id);
  },

  getAll(): Promise<Patient[]> {
    return repository.find({
      select: ['id', 'num_dossier', 'nom'],
    });
  },
  
  forCentreDeSante(centre: CentreDeSante): Promise<Patient[]> {
    return repository.find({
      where: { centre_de_sante_id: centre.id },
      select: ['id', 'num_dossier', 'nom'],
    });
  }
};
