import { action, computed, makeAutoObservable } from 'mobx';

import { CentreDeSante } from '~models';
import { CentreDeSanteService } from '~services';

export default class CentreDeSanteStore {
  centres: CentreDeSante[];

  constructor() {
    makeAutoObservable(this);

    this.load().then(
      () => {},
      err => console.error(err),
    );
  }

  async load() {
    this.setCentres(await CentreDeSanteService.getAll());
    console.log(`Loaded ${this.centres.length} centres de santé!`);
  }

  @action
  private setCentres(centres: CentreDeSante[]) {
    this.centres = centres;
  }

  @computed
  get dropDownData(): any[] {
    let options = this.centres || [];
    return options.map(c => ({ label: c.nom, value: c.id }));
  }
}
