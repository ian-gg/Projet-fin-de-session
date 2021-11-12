import { action, computed, makeAutoObservable } from 'mobx';

import { CentreDeSante, Patient } from '~models';
import { PatientService } from '~services';

interface PatientFilters {
  [index: string]: string | undefined;
  text: string | undefined;
}
const defaultFilters: PatientFilters = {
  text: undefined,
};

export default class PatientStore {
  patients: Patient[] = [];
  filters: PatientFilters = defaultFilters;

  constructor() {
    makeAutoObservable(this);

    this.load().then(() => {
      console.log(`Loaded ${this.patients.length} patients!`);
    }, (err) => console.error(err));
  }

  async load() {
    this.patients = await PatientService.getAll();
  }

  async loadForCentreDeSante(centre: CentreDeSante) {
    this.patients = await PatientService.forCentreDeSante(centre);
  }

  @computed
  get filteredPatients(): Patient[] {
    let filtered = this.patients || [];

    if (this.filters) {
      if (this.filters.text) {
        filtered = filtered.filter(e => e.nom.includes(this.filters.text!));
      }
    }

    return filtered;
  }

  @action
  setFilter(attribute: string, value: any) {
    this.filters[attribute] = value;
  }
};

export {
  defaultFilters,
};
export type { PatientFilters };

