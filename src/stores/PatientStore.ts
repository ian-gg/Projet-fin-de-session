import { makeAutoObservable } from 'mobx';

import { CentreDeSante, Patient } from '~models';
import { PatientService } from '~services';

export default class PatientStore {
  patients: Patient[];

  constructor() {
    makeAutoObservable(this)
  }

  load() {
    PatientService.getAll().then((res) => this.patients = res);
  }

  loadForCentreDeSante(centre: CentreDeSante) {
    PatientService.forCentreDeSante(centre).then((res) => this.patients = res);
  }
};
