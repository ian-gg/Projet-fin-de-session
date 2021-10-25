import { makeAutoObservable } from 'mobx';

import { Diagnostic } from '~models';
import { DiagnosticService } from '~services';

export default class DiagnosticStore {
  diagnostics: Diagnostic[];

  constructor() {
    makeAutoObservable(this)
  }

  load() {
    DiagnosticService.getAll().then((res) => this.diagnostics = res);
  }
};
