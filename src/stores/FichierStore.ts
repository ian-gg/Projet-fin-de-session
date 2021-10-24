import { makeAutoObservable } from 'mobx';

import { Fichier, Patient } from '~models';
import { FichierService } from '~services';

export default class FichierStore {
  fichiers: Fichier[];

  constructor() {
    makeAutoObservable(this)
  }

  loadPatient(patient: Patient) {
    FichierService.getAll(patient)
      .then((res: Fichier[]) => this.fichiers = res);
  }
};
