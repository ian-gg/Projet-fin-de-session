import { makeAutoObservable } from 'mobx';

import { CentreDeSante } from '~models';
import { CentreDeSanteService } from '~services';

export default class CentreDeSanteStore {
  centres: CentreDeSante[];

  constructor() {
    makeAutoObservable(this)
  }

  load() {
    CentreDeSanteService.getAll().then((res) => this.centres = res);
  }
};
