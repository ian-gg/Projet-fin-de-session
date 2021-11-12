import { Connection, ConnectionManager, ConnectionOptions, getConnectionManager } from 'typeorm';

import {
  CentreDeSante,
  Diagnostic,
  Fichier,
  Intervention,
  InterventionProcedure,
  Patient,
  Procedure,
} from '~models';

const dbOptions: ConnectionOptions = {
  name: 'default',
  type: 'react-native',
  database: 'patients.db',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  dropSchema: true,
  synchronize: true,
  entities: [
    CentreDeSante,
    Diagnostic,
    Fichier,
    Intervention,
    InterventionProcedure,
    Patient,
    Procedure,
  ]
};

export default class Database {
  connectionManager: ConnectionManager;
  defaultConnection: Connection;

  async setupConnection() {
    this.connectionManager = getConnectionManager();

    if (this.connectionManager.has(dbOptions.name as string)) {
      this.defaultConnection = this.connectionManager.get(dbOptions.name);
    } else {
      this.defaultConnection = this.connectionManager.create(dbOptions);
    }

    if (this.defaultConnection) {
      console.log('Database connection created!');

      if (!this.defaultConnection.isConnected) {
        await this.defaultConnection.connect();
        console.log('Database connected!');

        await this.defaultConnection.driver.afterConnect();

        // dev
        await seedDatabase();
        console.log('DEV: Database seeded!');
      }
    }

    console.log('Database setup finished!');
  }
}

import {
  CentreDeSanteService,
  DiagnosticService,
  PatientService,
  ProcedureService,
} from '~services';
async function seedDatabase() {
  let centre_de_sante = await CentreDeSanteService.create({
    nom: 'CHU Sainte-Justine',
  });
  const centre = await CentreDeSanteService.save(centre_de_sante);

  console.log(centre);

  let patient = await PatientService.create({
    centre_de_sante,
    num_dossier: '1234567',
    nom: 'Felix Bouchard',
    assurance_maladie: 'BOUF94011419',
    assurance_maladie_exp_m: 1,
    assurance_maladie_exp_a: 2026,
    date_naissance: new Date(1994, 1, 14),
    sexe: 'M',
    cellulaire: '514-123-4567',
  });
  patient = await PatientService.save(patient);

  console.log(patient);

  let diagnostic = await DiagnosticService.create({
    etiquette: 'AC',
    description: 'Arrêt cardiaque',
  });
  diagnostic = await DiagnosticService.save(diagnostic);

  let procedure = await ProcedureService.create({
    code: '001',
    description: 'Procedure 001',
  });
  procedure = await ProcedureService.save(procedure);
}
