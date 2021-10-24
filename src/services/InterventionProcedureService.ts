import { getRepository } from 'typeorm';
import { Intervention, InterventionProcedure, Procedure } from '~models';

const repository = getRepository(InterventionProcedure);

export default {
  get(id: number): Promise<InterventionProcedure | undefined> {
    return repository.findOne(id);
  },

  forIntervention(intervention: Intervention): Promise<InterventionProcedure[]> {
    return repository.find({
      where: { intervention_id: intervention.id },
      select: ['id', 'date_debut', 'date_fin']
    });
  },

  forProcedure(procedure: Procedure): Promise<InterventionProcedure[]> {
    return repository.find({
      where: { procedure_id: procedure.id },
      select: ['id', 'date_debut', 'date_fin']
    });
  },
};
