import { action, makeAutoObservable } from 'mobx';

import { Procedure } from '~models';
import { ProcedureService } from '~services';

export default class ProcedureStore {
  procedures: Procedure[];

  constructor() {
    makeAutoObservable(this);

    this.load().then(
      () => {},
      err => console.error(err),
    );
  }

  async load() {
    this.setProcedures(await ProcedureService.getAll());
    console.log(`Loaded ${this.procedures.length} procedures!`);
  }

  @action
  private setProcedures(procedures: Procedure[]) {
    this.procedures = procedures;
  }
}
