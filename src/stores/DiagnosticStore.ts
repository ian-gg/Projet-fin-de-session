import { action, makeAutoObservable } from 'mobx';

import { Diagnostic } from '~models';
import { DiagnosticService } from '~services';

export default class DiagnosticStore {
  diagnostics: Diagnostic[];

  constructor() {
    makeAutoObservable(this);

    this.load().then(() => {}, (err) => console.error(err));
  }

  async load() {
    this.setDiagnostics(await DiagnosticService.getAll());
    console.log(`Loaded ${this.diagnostics.length} diagnostics!`);
  }

  @action
  private setDiagnostics(diagnostics: Diagnostic[]) {
    this.diagnostics = diagnostics;
  }
};
