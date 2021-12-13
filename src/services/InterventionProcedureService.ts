import { DbManager } from '~db';
import { Intervention, InterventionProcedure, Procedure } from '~models';

export default {
  async get(id: number): Promise<InterventionProcedure | undefined> {
    return (await DbManager.repo(InterventionProcedure)).findOne(id);
  },

  async forIntervention(
    intervention: Intervention,
  ): Promise<InterventionProcedure[]> {
    return (await DbManager.repo(InterventionProcedure)).find({
      where: { intervention_id: intervention.id },
      select: ['id', 'date_debut', 'date_fin', 'procedure'],
    });
  },

  async forProcedure(procedure: Procedure): Promise<InterventionProcedure[]> {
    return (await DbManager.repo(InterventionProcedure)).find({
      where: { procedure_id: procedure.id },
      select: ['id', 'date_debut', 'date_fin', 'intervention'],
    });
  },

  async create(interventionProcedure: Object): Promise<InterventionProcedure> {
    return (await DbManager.repo(InterventionProcedure)).create(
      interventionProcedure,
    );
  },

  async save(
    interventionProcedure: InterventionProcedure,
  ): Promise<InterventionProcedure> {
    const repo = await DbManager.repo(InterventionProcedure);
    const saved = await repo.save(interventionProcedure);

    return DbManager.withLastSeqId(InterventionProcedure, saved);
  },

  async count(): Promise<number> {
    return (await DbManager.repo(InterventionProcedure)).count();
  },
};
