import { action, computed, makeAutoObservable } from 'mobx';

import { CentreDeSante, Patient } from '~models';
import { PatientService } from '~services';

interface PatientFilters {
  [index: string]: string | undefined;
  text: string;
}
const defaultFilters: PatientFilters = {
  text: '',
};

export default class PatientStore {
  patients: Patient[] = [];
  filters: PatientFilters = defaultFilters;

  constructor() {
    makeAutoObservable(this);

    this.load().then(() => {}, (err) => console.error(err));
  }

  async load() {
    this.setPatients(await PatientService.getAll());
    console.log(`Loaded ${this.patients.length} patients!`);
  }

  async loadForCentreDeSante(centre: CentreDeSante) {
    this.setPatients(await PatientService.forCentreDeSante(centre));
  }

  @action
  private setPatients(patients: Patient[]) {
    this.patients = patients;
  }

  @computed
  get filteredPatients(): Patient[] {
    let filtered = this.patients || [];

    if (this.filters) {
      if (this.filters.text) {
        filtered = filtered.filter(e => e.nom.toLowerCase().includes(this.filters.text?.toLocaleLowerCase()!) ||  
                                        e.num_dossier.includes(this.filters.text!)
                                  );
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

