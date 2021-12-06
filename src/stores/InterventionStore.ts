import { makeAutoObservable } from 'mobx';

import { Intervention, Patient } from '~models';
import { InterventionService } from '~services';

export default class InterventionStore {
  interventions: Intervention[];

  constructor() {
    makeAutoObservable(this);
  }

  load(patient: Patient) {
    InterventionService.getAll(patient).then(res => (this.interventions = res));
  }
}
