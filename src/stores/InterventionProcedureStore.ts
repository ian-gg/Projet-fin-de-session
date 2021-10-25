import { makeAutoObservable } from 'mobx';

import { Intervention, InterventionProcedure, Procedure } from '~models';
import { InterventionProcedureService } from '~services';

export default class InterventionProcedureStore {
  intervention_procedures: InterventionProcedure[];

  constructor() {
    makeAutoObservable(this)
  }

  loadForIntervention(intervention: Intervention) {
    InterventionProcedureService.forIntervention(intervention)
      .then((res) => this.intervention_procedures = res);
  }

  loadForProcedure(procedure: Procedure) {
    InterventionProcedureService.forProcedure(procedure)
      .then((res) => this.intervention_procedures = res);
  }
};
